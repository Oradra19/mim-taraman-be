const db = require("../config/db");

const ChatbotPrompt = {
  getAll() {
    return db.promise().query(
      "SELECT * FROM chatbot_prompts ORDER BY id DESC"
    );
  },

  getPublic() {
    return db.promise().query(
      `SELECT role, content 
       FROM chatbot_prompts 
       WHERE is_active = 1 
       ORDER BY id ASC`
    );
  },

  create(data) {
    return db.promise().query(
      "INSERT INTO chatbot_prompts SET ?",
      [data]
    );
  },

  update(id, data) {
    return db.promise().query(
      "UPDATE chatbot_prompts SET ? WHERE id = ?",
      [data, id]
    );
  },

  // HARD DELETE
  delete(id) {
    return db.promise().query(
      "DELETE FROM chatbot_prompts WHERE id = ?",
      [id]
    );
  },
};

module.exports = ChatbotPrompt;
