const fs = require("fs");
const path = require("path");
const { analyzeSecurityEvent } = require("../LLM/llmClient");

// Load the prompt template
const promptPath = path.join(
  __dirname,
  "..",
  "prompts",
  "threat-analysis.txt"
);

const promptTemplate = fs.readFileSync(promptPath, "utf8");

/* Previous preprocessing accepted only strings; retained for reference.
function preprocessEvents(events) {
  if (!Array.isArray(events)) throw new Error("Security events must be provided as an array");
  const normalizedEvents = events
    .filter(event => typeof event === "string" && event.trim())
    .map(event => event.trim().toLowerCase());
  const failedLogins = normalizedEvents.filter(event => event.includes("failed login") || event.includes("login failed")).length;
  const successfulLogins = normalizedEvents.filter(event => event.includes("successful login") || event.includes("login success")).length;
  const newDeviceEvents = normalizedEvents.filter(event => event.includes("new device")).length;
  const newLocationEvents = normalizedEvents.filter(event => event.includes("new location")).length;
  const accountLocked = normalizedEvents.some(event => event.includes("account locked"));
  return { totalEvents: normalizedEvents.length, failedLogins, successfulLogins, newDeviceEvents, newLocationEvents, accountLocked, events: normalizedEvents };
}
*/

/**
 * Replaces the string-only version above so stored event objects can be analyzed too.
 * Converts raw security events into structured NLP information.
 */
function preprocessEvents(events) {
  if (!Array.isArray(events)) {
    throw new Error("Security events must be provided as an array");
  }

  const normalizedEvents = events.map((event) => {
    if (typeof event === "string") return event.trim();
    if (!event || typeof event !== "object") return "";
    const parts = [event.type, event.description];
    if (event.ip) parts.push(`IP: ${event.ip}`);
    if (event.device) parts.push(`Device: ${event.device}`);
    if (event.location?.region || event.location?.country) {
      parts.push(`Location: ${[event.location.region, event.location.country].filter(Boolean).join(", ")}`);
    }
    if (event.timestamp) parts.push(`Timestamp: ${new Date(event.timestamp).toISOString()}`);
    return parts.filter(Boolean).join(" | ");
  }).filter(Boolean);

  const normalizedForMatching = normalizedEvents.map(event => event.toLowerCase());

  const failedLogins = normalizedForMatching.filter(event =>
    event.includes("failed login") ||
    event.includes("login failed")
  ).length;

  const successfulLogins = normalizedForMatching.filter(event =>
    event.includes("successful login") ||
    event.includes("login success")
  ).length;

  const newDeviceEvents = normalizedForMatching.filter(event =>
    event.includes("new device")
  ).length;

  const newLocationEvents = normalizedForMatching.filter(event =>
    event.includes("new location")
  ).length;

  const accountLocked = normalizedForMatching.some(event =>
    event.includes("account locked")
  );

  return {
    totalEvents: normalizedEvents.length,
    failedLogins,
    successfulLogins,
    newDeviceEvents,
    newLocationEvents,
    accountLocked,
    events: normalizedEvents
  };
}

/**
 * Sends processed security events to the LLM for analysis.
 */
async function analyzeSecurityEvents(events) {
  const processedData = preprocessEvents(events);

  const prompt = promptTemplate.replace(
    "{{EVENTS}}",
    JSON.stringify(processedData, null, 2)
  );

  // Previous behavior returned unparsed Gemini text; retained disabled for reference:
  // const result = await analyzeSecurityEvent(prompt);
  // return { processedData, aiAnalysis: result };
  const rawResult = await analyzeSecurityEvent(prompt);
  let aiAnalysis;
  try {
    const json = rawResult.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
    aiAnalysis = JSON.parse(json);
  } catch (error) {
    throw new Error("Threat analysis returned malformed JSON");
  }

  const severities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
  if (!aiAnalysis || typeof aiAnalysis !== "object" ||
      typeof aiAnalysis.threatType !== "string" ||
      !severities.includes(String(aiAnalysis.severity).toUpperCase()) ||
      typeof aiAnalysis.summary !== "string" ||
      !Array.isArray(aiAnalysis.evidence) ||
      !Array.isArray(aiAnalysis.recommendations)) {
    throw new Error("Threat analysis response did not match the required structure");
  }
  aiAnalysis.severity = aiAnalysis.severity.toUpperCase();
  aiAnalysis.evidence = aiAnalysis.evidence.filter(item => typeof item === "string");
  aiAnalysis.recommendations = aiAnalysis.recommendations.filter(item => typeof item === "string");

  return {
    processedData,
    aiAnalysis
  };
}

module.exports = {
  preprocessEvents,
  analyzeSecurityEvents
};
