const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const emailErr = "must be a valid email address";

const validateUser = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body("email").isEmail().withMessage(`Email ${emailErr}`),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(
      '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&"])([A-Za-z\\d@$!%*#?&"]{8,})$'
    )
    .withMessage(
      "Password must contain a minimum of eight characters, at least one letter, one number and one special character."
    ),
  body("passwordConfirmation")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(
      '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&"])([A-Za-z\\d@$!%*#?&"]{8,})$'
    )
    .withMessage(
      "Password must contain a minimum of eight characters, at least one letter, one number and one special character."
    ),
];

module.exports = { validateUser };
