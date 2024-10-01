const express = require("express");
const router = express.Router();

const {
  getAllNewsStatic,
  getAllNews,
  getUrlContent,
  updateNews,
  addNewsBatch,
  createArticle,
} = require("../controllers/news");

router.route("/").get(getAllNews).post(createArticle);
router.route("/static").get(getAllNewsStatic);
router.route("/url/:url").get(getUrlContent);
router.route("/:id").patch(updateNews);
router.route("/batch").post(addNewsBatch);
//router.route("/:id/like").put(changeLike);

module.exports = router;
