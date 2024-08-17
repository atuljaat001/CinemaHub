const express = require("express");
const yearRoute = express.Router();
const { renderMovieOnYear } = require("../controllers/handlers");
yearRoute.get("/:year", renderMovieOnYear);

module.exports = yearRoute;
