// controllers/mainController.js

const db = require("../db/queries");

// Passport and hashing libs for user authentication
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Optional, load express to format dates
const moment = require('moment');

// Passport config

passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

async function getIndex(req, res) {
      const board = await db.getAllUsernames();
      const modifiedBoard = board.map(obj => ({ ...obj, formattedDate: moment(obj.message_created_at).format("DD/MM/YY"), formattedTime: moment(obj.message_created_at).format("h:mm:ssa"),}));
      res.render("../views/index", { title: "Mini Messageboard", board: modifiedBoard });
}

module.exports = {
  getIndex,
};
