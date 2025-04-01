// Load .env with path, API keys and other secrets
require("dotenv").config();

// Load Express and path
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const app = express();
const path = require("node:path");

// Load Routers
const mainRouter = require("./routes/mainRouter");

// Add this code to make it possible to render .ejs files
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Express session config
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

// Add this code to make it possible to load css
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Add this code to parse data to POST requests
app.use(express.urlencoded({ extended: true }));

// Set port to whatever is on .env otherwise use 3000
const PORT = process.env.PORT || 3000;

app.use("/", mainRouter);

// Message in the console to confirm that the server launched correctly
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
