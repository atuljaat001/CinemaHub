const express = require("express");
const langRoute = express.Router();
const { renderMovieOnLanguage } = require("../controllers/handlers");
langRoute.get("/:lang", renderMovieOnLanguage);

module.exports = langRoute;
