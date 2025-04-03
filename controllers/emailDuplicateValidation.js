const { body } = require("express-validator");
const db = require("../db/queries");

const validateEmail = [
  body("email")
    .custom(async (value) => {
      const user = await db.checkExistingEmail(value);
      if (user) {
        throw new Error("Email address already in use.");
      }
      return true;
    })
    .withMessage("Email address already in use."),
];

module.exports = { validateEmail };
