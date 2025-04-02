// Load Router

const { Router } = require("express");
const mainController = require("../controllers/mainController");
const { validateUser } = require("../controllers/formValidation");

const mainRouter = Router();

mainRouter.get("/", mainController.getIndex);

mainRouter.get("/login", mainController.getLogin);

mainRouter.get("/sign-up", mainController.getSignUp);

mainRouter.get("/new-message", mainController.getNewMessage)

mainRouter.get("/logout", mainController.getLogout)

mainRouter.post("/sign-up", validateUser, mainController.postSignUp);

mainRouter.post("/login", mainController.postLogin);

mainRouter.post("/new-message", mainController.postNewMessage)

// Always export back to app.js at the end

module.exports = mainRouter;
