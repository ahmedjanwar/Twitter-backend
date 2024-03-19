const db = require("./db");

class Tweet {
  static async create(content, authorId) {
    try {
      const result = await db.pool.query(
        "INSERT INTO tweets (content, authorId) VALUES (?, ?)",
        [content, authorId]
      );
      return result.insertId; // Return the ID of the newly created tweet
    } catch (error) {
      throw error;
    }
  }

  static async delete(tweetId) {
    try {
      const result = await db.pool.query(
        "DELETE FROM tweets WHERE id = ?",
        [tweetId]
      );
      return result.affectedRows > 0; // Return true if a tweet was deleted
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Tweet;
