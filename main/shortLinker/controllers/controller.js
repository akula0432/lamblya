const ShortUrl = require("../models/shortUrl.js");
const shortId = require("shortid");

class dataController {
  async getData(req, res) {
    try {
      const { url } = req.body;
      console.log(req.body);
      const data = new ShortUrl({ url });
      await data.save();
      return res.json({ message: "Success" });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new dataController();
