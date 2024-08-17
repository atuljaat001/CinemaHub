const movieModel = require("../model/movie");

async function addMovieToDB(req, res) {
  try {
    const { name, description, rating, audio, path, size, year } = req.body; // Ensure you're grabbing the right fields
    // console.log(req.file); // Debugging: Check if values are correct

    const image = req.file
      ? `MoviesThumbnail/${req.file.filename}`
      : "MoviesThumbnail/download.jpeg";
    // Add the movie to the database

    // const image=`MoviesThumbnail/${req.file.filename}`
    const movie = await movieModel.create({
      name,
      description,
      rating,
      Image: image,
      audio,
      path,
      size,
      year,
    });

    if (!movie) {
      return res.status(400).send("Error: Can't add movie to the database");
    }

    // Redirect to home or another page after successful addition
    res.redirect("/home");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
}

async function renderHome(req, res) {
  const allMovies = await movieModel.find({});
  if (!allMovies) {
    console.log("Can't fetch all movies from the db");
  }
  res.render("home", { movies: allMovies });
}

async function renderPersonalMovie(req, res) {
  const movieId = req.params.id;

  if (!movieId) {
    res.send("Movie id is not found");
  }

  const movie = await movieModel.findOne({ _id: movieId });
  if (!movie) {
    res.send("Movie is not found");
  }
  res.render("personal-movie", { movie: movie });
}

async function handleDownloadMovie(req, res) {
  try {
    const name = req.params.name;
    const movie = await movieModel.findOne({ name: name });

    if (!movie) {
      return res.status(404).send("Movie not found");
    }

    const filePath = movie.path;

    res.download(filePath, (err) => {
      if (err) {
        console.error("Error during file download:", err);
        res.status(500).send("Error downloading the file");
      } else {
        console.log("Download started for:", name);
      }
    });
  } catch (error) {
    console.error("Error handling download:", error);
    res.status(500).send("Server error");
  }
}

async function handleSearchMovie(req, res) {
  try {
    // Extract the search query from the request body
    const name = req.query.query; // Default to an empty string if the query is undefined

    // Convert the query to a string to ensure it's safe for regex use
    const query = name.toString();

    // Perform the search using regex for case-insensitive matching
    const movies = await movieModel.find({
      name: { $regex: query, $options: "i" },
    });

    // Log the result for debugging purposes

    res.render("search-result", { movies: movies });
    // Send the search results back to the client
    // res.status(200).json({ movies });
  } catch (error) {
    // Handle any errors that occur during the search process
    console.error("Error during movie search:", error);
    res.status(500).send("An error occurred during the movie search.");
  }
}

async function handleRenderMovies(req, res) {
  const movies = await movieModel.find({});
  res.render("all-movies", { movies: movies });
}

async function handleDeleteMovie(req, res) {
  const movieId = req.params.id;
  const movie = await movieModel.findOneAndDelete({ _id: movieId });
  res.redirect("/home");
}

async function renderMovieOnYear(req, res) {
  const year = req.params.year;
  console.log(year);
  const movies = await movieModel.find({ year: year });
  res.render("year-based-movies", { movies: movies });
}

async function renderMovieOnLanguage(req, res) {
  const language = req.params.lang;
  const movies = await movieModel.find({
    audio: { $regex: `^${language}$`, $options: "i" },
  });

  res.render("language-based-movie", { movies: movies });
}

module.exports = {
  addMovieToDB,
  renderHome,
  renderPersonalMovie,
  handleDownloadMovie,
  handleSearchMovie,
  handleRenderMovies,
  handleDeleteMovie,
  renderMovieOnYear,
  renderMovieOnLanguage,
};
