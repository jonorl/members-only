const pool = require("./pool");

async function serialise(email) {
  const rows = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows;
}

async function deserialise(id) {
  const rows = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
  return rows;
}

async function getAllUsernames() {
  const { rows } = await pool.query("SELECT * FROM board");
  return rows;
}

async function insertMessage(email, title, text) {
  await pool.query(
    "INSERT INTO board (email, title, text) VALUES ($1, $2, $3)",
    [email, title, text]
  );
}

async function insertNewUser(firstName, lastName, email, password) {
  const result = await pool.query(
    "insert into users (first_name, last_name, email, password_hash) values ($1, $2, $3, $4) RETURNING *",
    [firstName, lastName, email, password]
  );
  return result.rows[0];
}

async function checkExistingEmail(email) {
  const rows = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return rows;
}

async function updateRole (email, role) {
const update = await pool.query("UPDATE users SET role = $2 WHERE email = $1", [email, role]);
return update;
}

module.exports = {
  serialise,
  deserialise,
  getAllUsernames,
  insertMessage,
  insertNewUser,
  checkExistingEmail,
  updateRole,
};
