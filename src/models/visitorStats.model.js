const db = require("../config/db");

const VisitorStats = {
  incrementDaily() {
    return new Promise((resolve, reject) => {
      const today = new Date().toISOString().split("T")[0];

      db.query(
        `INSERT INTO visitors_daily (date, count)
         VALUES (?, 1)
         ON DUPLICATE KEY UPDATE count = count + 1`,
        [today],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },

  incrementWeekly() {
    return new Promise((resolve, reject) => {
      const date = new Date();
      const year = date.getFullYear();
      const week = getWeekNumber(date);

      db.query(
        `INSERT INTO visitors_weekly (year, week, count)
         VALUES (?, ?, 1)
         ON DUPLICATE KEY UPDATE count = count + 1`,
        [year, week],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },

  incrementMonthly() {
    return new Promise((resolve, reject) => {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      db.query(
        `INSERT INTO visitors_monthly (year, month, count)
         VALUES (?, ?, 1)
         ON DUPLICATE KEY UPDATE count = count + 1`,
        [year, month],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },

  getDaily(limit = 30) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM visitors_daily ORDER BY date DESC LIMIT ?`,
        [limit],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  getWeekly(limit = 12) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM visitors_weekly ORDER BY year DESC, week DESC LIMIT ?`,
        [limit],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  getMonthly(limit = 12) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM visitors_monthly ORDER BY year DESC, month DESC LIMIT ?`,
        [limit],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },
};

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

module.exports = VisitorStats;
