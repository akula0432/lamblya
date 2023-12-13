const shortId = require("shortid");
const mongoose = require("mongoose");

const shortUrl = new mongoose.Schema({
  url: {
    type: String,
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate,
  },
});

module.exports = mongoose.model("ShortLinks", shortUrl);
