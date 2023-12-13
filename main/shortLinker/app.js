require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/router.js");
const dataController = require("./controllers/controller.js");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/link", router);

const start = async () => {
  try {
    app.listen(process.env.PORT || 7000, () => {
      console.log("Server is running...");
    });
    await mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {}
};

start();
