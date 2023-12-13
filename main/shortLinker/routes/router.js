const Router = require("express");
const router = new Router();
const dataController = require("../controllers/controller.js");

router.post("/", dataController.getData);

module.exports = router;
