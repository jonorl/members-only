const pool = require("./pool");

async function getAllUsernames() {
  const { rows } = await pool.query("SELECT * FROM board");
  return rows;
}

async function insertMessage(username, text) {
  await pool.query("INSERT INTO board (username, text) VALUES ($1, $2)", [username, text]);
}

module.exports = {
  getAllUsernames,
  insertMessage,
  };