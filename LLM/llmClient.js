// const OpenAI = require("openai");

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// async function analyzeSecurityEvent(prompt) {
//   try {
//     const response = await client.responses.create({
//       model: "gpt-5-mini",
//       input: prompt,
//     });

//     return response.output_text;
//   } catch (error) {
//     console.error("LLM analysis error:", error.message);
//     throw new Error("Unable to analyze security event");
//   }
// }

// module.exports = {
//   analyzeSecurityEvent,
// };

require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function analyzeSecurityEvent(prompt) {
  try {
    // Previous request/response debug logs are intentionally disabled:
    // console.log("Sending request to Gemini...");
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    // console.log("Gemini response received");
    return response.text;
  } catch (error) {
    console.error("LLM analysis failed:", error.message);
    throw new Error("Unable to analyze security event");
  }
}

module.exports = {
  analyzeSecurityEvent,
};
