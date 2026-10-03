// require("dotenv").config();

// const { analyzeSecurityEvent } = require("./llm/llmClient");

// async function test() {
//   try {
//     const result = await analyzeSecurityEvent(
//       "Analyze this security event: There were 5 failed login attempts from the same IP address within 2 minutes, followed by an account lock. Give a one-sentence security assessment."
//     );

//     console.log("\nLLM RESPONSE:\n");
//     console.log(result);
//   } catch (error) {
//     console.error("TEST FAILED:", error.message);
//   }
// }

// test();
// const { GoogleGenAI } = require("@google/genai");

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// async function analyzeSecurityEvent(prompt) {
//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-2.5-flash-lite",
//       contents: prompt,
//     });

//     return response.text;
//   } catch (error) {
//     console.error("LLM analysis error:", error.message);
//     throw new Error("Unable to analyze security event");
//   }
// }

// module.exports = {
//   analyzeSecurityEvent,
// };

// require("dotenv").config();

// const { GoogleGenAI } = require("@google/genai");

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// async function analyzeSecurityEvent(prompt) {
//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-2.5-flash-lite",
//       contents: prompt,
//     });

//     return response.text;
//   } catch (error) {
//     console.error("LLM analysis error:", error.message);
//     throw new Error("Unable to analyze security event");
//   }
// }

// module.exports = {
//   analyzeSecurityEvent,
// };

require("dotenv").config();

console.log("1. ENV LOADED:", !!process.env.GEMINI_API_KEY);

const { analyzeSecurityEvent } = require("./LLM/llmClient");

console.log("2. LLM CLIENT LOADED");

async function test() {
  console.log("3. TEST STARTED");

  try {
    const result = await analyzeSecurityEvent(
      "Analyze this security event: There were 5 failed login attempts from the same IP address within 2 minutes, followed by an account lock. Give a one-sentence security assessment."
    );

    console.log("4. API RESPONSE RECEIVED");
    console.log("\nLLM RESPONSE:\n");
    console.log(result);
  } catch (error) {
    console.error("5. TEST FAILED:", error);
    console.error("Message:", error.message);
  }
}

test();