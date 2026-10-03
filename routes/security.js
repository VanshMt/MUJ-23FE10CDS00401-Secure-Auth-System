const router = require("express").Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authmiddleware");
const { analyzeSecurityEvents } = require("../nlp/securityAnalyzer");

router.post("/analyze", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("securityEvents");
    if (!user) return res.status(404).json({ msg: "User not found" });
    const events = user.securityEvents.slice(-50);
    if (events.length === 0) return res.status(400).json({ msg: "No security events are available to analyze" });

    const { aiAnalysis, processedData } = await analyzeSecurityEvents(events);
    const savedAnalysis = { ...aiAnalysis, analyzedAt: new Date(), eventCount: processedData.totalEvents };
    await User.updateOne({ _id: user._id }, { $set: { aiSecurityAnalysis: savedAnalysis } });
    return res.json({ analysis: savedAnalysis });
  } catch (error) {
    console.error("On-demand security analysis failed:", error.message);
    return res.status(502).json({ msg: "Security analysis is temporarily unavailable" });
  }
});

module.exports = router;
