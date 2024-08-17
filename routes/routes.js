const express = require("express");
const router = express.Router();
const adminRoutes = require("./adminRoutes");
const yearRoute = require("./yearRoutes");
const langRoute = require("./langRoutes");
const {
  renderHome,
  renderPersonalMovie,
  handleDownloadMovie,
  handleSearchMovie,
} = require("../controllers/handlers");
// const { render } = require("ejs");

router.get("/home", renderHome);
router.get("/home/:id", renderPersonalMovie);
router.get("/download-movie/:name", handleDownloadMovie);
router.get("/search-movie", handleSearchMovie);
router.use("/admin", adminRoutes);
router.use("/year", yearRoute);
router.use("/language", langRoute);

module.exports = router;
