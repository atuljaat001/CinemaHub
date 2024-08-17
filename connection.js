const mongoose = require("mongoose");
function connectMongoDB(url) {
  mongoose.connect(url).then(() => {
    return console.log("mongodb is successfully connected");
  });
}

module.exports = { connectMongoDB };
