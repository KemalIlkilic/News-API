const express = require("express");
const router = express.Router();

const {
  getAllNewsStatic,
  getAllNews,
  changeLike,
} = require("../controllers/news");

router.route("/").get(getAllNews);
router.route("/static").get(getAllNewsStatic);
router.route("/:id/like").put(changeLike);

module.exports = router;
