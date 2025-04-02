// controllers/mainController.js

const db = require("../db/queries");
const express = require("express");

// Passport and hashing libs for user authentication
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Optional, load express to format dates
const moment = require("moment");

// Passport config

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await db.serialise(username);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password_hash);
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

passport.serializeUser((user, done) => {
  done(null, { id: user.user_id, email: user.email });
});

passport.deserializeUser(async (data, done) => {
  try {
    const { rows } = await db.deserialise(data.id);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

async function getIndex(req, res) {
  const board = await db.getAllUsernames();
  const modifiedBoard = board.map((obj) => ({
    ...obj,
    formattedDate: moment(obj.message_created_at).format("DD/MM/YY"),
    formattedTime: moment(obj.message_created_at).format("h:mm:ssa"),
  }));
  res.render("../views/index", {
    title: "Mini Messageboard",
    board: modifiedBoard,
  });
}

async function getLogin(req, res) {
  res.render("../views/login", { user: req.session.passport });
}

async function getSignUp(req, res) {
  res.render("../views/sign-up");
}

async function getNewMessage(req, res) {
  res.render("../views/new-message", {
    title: "New Message",
    user: req.session.passport,
  });
}

async function postSignUp(req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.insertNewUser(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      hashedPassword
    );
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function postLogin(req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/login",
    failureRedirect: "/sign-up",
  })(req, res, next);
}

async function postNewMessage(req, res) {
  await db.insertMessage(
    req.session.passport.user.email,
    req.body.title,
    req.body.message
  );
  res.redirect("/")
}

module.exports = {
  getIndex,
  getLogin,
  getSignUp,
  getNewMessage,
  postSignUp,
  postLogin,
  postNewMessage,
};
