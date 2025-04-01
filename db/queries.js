const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function insertCategory(name) {
    await pool.query("INSERT INTO categories (name) VALUES ($1)", [name]);
}

async function getAllConsoles() {
  const { rows } = await pool.query("SELECT * FROM consoles");
  return rows;
}

async function insertConsole(name, releaseYr, stock, categoryId) {
  await pool.query("INSERT INTO consoles (name, release_yr, stock, category_id) VALUES ($1, $2, $3, $4)", [name, releaseYr, stock, categoryId]);
}

async function delConsole(id) {
  await pool.query("DELETE FROM consoles WHERE id = $1", [id]);
}

async function delCategory(id) {
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
}

async function checkItemsInCategory(categoryId) {
  const result = await pool.query('SELECT COUNT(*) FROM consoles WHERE category_id = $1', [categoryId]);
  return parseInt(result.rows[0].count);
}

module.exports = {
  getAllCategories,
  getAllConsoles,
  insertCategory,
  insertConsole,
  delConsole,
  delCategory,
  checkItemsInCategory,
  };