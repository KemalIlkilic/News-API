const express = require("express");
const router = express.Router();

const {
  getAllNewsStatic,
  getAllNews,
  getUrlContent,
  updateNews,
  addNewsBatch,
} = require("../controllers/news");

router.route("/").get(getAllNews);
router.route("/static").get(getAllNewsStatic);
router.route("/url/:url").get(getUrlContent);
router.route("/:id").patch(updateNews);
router.route("/batch").post(addNewsBatch);
//router.route("/:id/like").put(changeLike);

module.exports = router;
