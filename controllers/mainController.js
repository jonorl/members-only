// controllers/mainController.js

const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Optional, load express to format dates
const moment = require("moment");

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
    user: req.user,
  });
}

async function getLogin(req, res) {
  res.render("../views/login", { user: req.user});
}

async function getSignUp(req, res) {
  res.render("../views/sign-up");
}

async function getNewMessage(req, res) {
  console.log(req.user)
  res.render("../views/new-message", {
    title: "New Message",
    user: req.user,
  });
}

async function getLogout(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

async function postSignUp(req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await db.insertNewUser(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      hashedPassword
    );

    // Automatically log the user in
    req.login(newUser, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
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
    req.user.email,
    req.body.title,
    req.body.message
  );
  res.redirect("/");
}

module.exports = {
  getIndex,
  getLogin,
  getSignUp,
  getLogout,
  getNewMessage,
  postSignUp,
  postLogin,
  postNewMessage,
};
