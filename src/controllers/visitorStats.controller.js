const VisitorStats = require("../models/visitorStats.model");

// COUNT VISITOR
exports.countVisitor = async (req, res) => {
  try {
    await VisitorStats.incrementDaily();
    await VisitorStats.incrementWeekly();
    await VisitorStats.incrementMonthly();

    res.json({ message: "Visitor counted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET VISITOR STATS
exports.getVisitorStats = async (req, res) => {
  try {
    const [daily] = await VisitorStats.getDaily();
    const [weekly] = await VisitorStats.getWeekly();
    const [monthly] = await VisitorStats.getMonthly();

    res.json({
      daily,
      weekly,
      monthly,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
