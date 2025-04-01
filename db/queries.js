const pool = require("./pool");

async function serialise(email) {
  const rows = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows;
}

async function deserialise(id) {
  const rows = await pool.query("SELECT * FROM users WHERE user_id = $1", [
    id,
  ]);
  return rows;
}

async function getAllUsernames() {
  const { rows } = await pool.query("SELECT * FROM board");
  return rows;
}

async function insertMessage() {
  const { rows } = await pool.query("SELECT * FROM board");
  return rows;
}

async function insertNewUser(firstName, lastName, email, password) {
  await pool.query(
    "insert into users (first_name, last_name, email, password_hash) values ($1, $2, $3, $4)",
    [firstName, lastName, email, password]
  );
}

module.exports = {
  serialise,
  deserialise,
  getAllUsernames,
  insertMessage,
  insertNewUser,
};
