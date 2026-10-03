require("dotenv").config();

const { analyzeSecurityEvents } = require("./nlp/securityAnalyzer");

async function test() {
  try {
    const events = [
      "Failed login from IP 192.168.1.20",
      "Failed login from IP 192.168.1.20",
      "Failed login from IP 192.168.1.20",
      "Failed login from IP 192.168.1.20",
      "Failed login from IP 192.168.1.20",
      "New device detected",
      "Account locked"
    ];

    console.log("Sending security events to NLP analyzer...\n");

    const result = await analyzeSecurityEvents(events);

    console.log("PROCESSED NLP DATA:");
    console.log(JSON.stringify(result.processedData, null, 2));

    console.log("\nAI SECURITY ANALYSIS:");
    console.log(result.aiAnalysis);

  } catch (error) {
    console.error("NLP TEST FAILED:");
    console.error(error);
  }
}

test();