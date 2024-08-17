const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: String, required: true },
    Image: {
      type: String,
      required: true,
      default: "MoviesThumbnail/download.jpeg",
    },
    audio: { type: String, required: true },
    path: { type: String, required: true, unique: true },
    size: { type: Number, required: true },
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

const movieModel = model("movie", movieSchema);

module.exports = movieModel;
