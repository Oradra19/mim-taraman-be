const db = require("../config/db");

const ChatbotPrompt = {
  getAll() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM chatbot_prompts", (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  getPublic() {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT role, content FROM chatbot_prompts WHERE is_active = 1 ORDER BY id ASC",
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  create(data) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO chatbot_prompts SET ?", data, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  },

  update(id, data) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE chatbot_prompts SET ? WHERE id = ?",
        [data, id],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },

  deactivate(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE chatbot_prompts SET is_active = 0 WHERE id = ?",
        [id],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },
};

module.exports = ChatbotPrompt;
