const express = require("express");
const adminRouter = express.Router();
const {
  addMovieToDB,
  handleRenderMovies,
  handleDeleteMovie,
} = require("../controllers/handlers");
const upload = require("../multer");

adminRouter.get("/add-movie", (req, res) => {
  res.render("admin/add-movie");
});

adminRouter.get("/movies", handleRenderMovies);
adminRouter.get("/delete/:id", handleDeleteMovie);

adminRouter.post("/add-movie", upload.single("movieImage"), addMovieToDB);

module.exports = adminRouter;
