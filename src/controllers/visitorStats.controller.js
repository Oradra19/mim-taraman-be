const VisitorStats = require("../models/visitorStats.model");

exports.countVisitor = async (req, res) => {
  try {
    await VisitorStats.incrementDaily();
    await VisitorStats.incrementWeekly();
    await VisitorStats.incrementMonthly();

    res.json({
      success: true,
      message: "Visitor counted",
    });
  } catch (error) {
    console.error("Count visitor error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getVisitorStats = async (req, res) => {
  try {
    const daily = await VisitorStats.getDaily();
    const weekly = await VisitorStats.getWeekly();
    const monthly = await VisitorStats.getMonthly();

    res.json({
      success: true,
      daily,
      weekly,
      monthly,
    });
  } catch (error) {
    console.error("Get visitor stats error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
