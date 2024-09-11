const News = require("../models/news");

const getAllNewsStatic = async (req, res) => {
  const news = await News.find({});
  res.status(200).json({ news, nbHits: products.length });
};

const getAllNews = async (req, res) => {
  const { category } = req.query;
  const queryObject = {};

  if (category) {
    queryObject.category = category;
  }

  const news = await News.find(queryObject);

  res.status(200).json({ news, nbHits: news.length });
};

const changeLike = async (req, res) => {
  const { isLiked } = req.body; // Getting the isLiked value from the request body
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      { isLiked },
      { new: true }
    );
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    return res.json(news); // Return the updated article
  } catch (error) {
    console.error("Error updating isLiked:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllNewsStatic, getAllNews, changeLike };
