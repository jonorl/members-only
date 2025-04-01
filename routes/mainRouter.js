// Load Router

const { Router } = require("express");
const mainController = require("../controllers/mainController");

const mainRouter = Router();

mainRouter.get("/", mainController.getIndex);

mainRouter.get("/login", mainController.getLogin);

mainRouter.get("/sign-up", mainController.getSignUp);

mainRouter.get("/new-message", mainController.getNewMessage)

mainRouter.post("/sign-up", mainController.postSignUp);

mainRouter.post("/login", mainController.postLogin);

// Always export back to app.js at the end

module.exports = mainRouter;
