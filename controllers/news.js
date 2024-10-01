const News = require("../models/news");
const axios = require("axios");
const cheerio = require("cheerio");
const { auth } = require("../../frontend/src/firebase");

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
  //occ-0-3727-2705.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABYyoATJlD9tmdib5FNnTmug2FQ5DtHMaRKqixs_fo81oYrgt-xK4d0QX-pMzNQbCEKTR3gprV6WeZbk1ITcFE3bIzJfySQO8Dz-x.webp?r=0cf

  https: res.status(200).json({ news, nbHits: news.length });
};
const getUrlContent = async (req, res) => {
  const { url } = req.params;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract only the body content
    const bodyContent = $("body").html();

    if (bodyContent) {
      res.send(bodyContent);
    } else {
      res.status(404).json({ message: "No body content found" });
    }
  } catch (error) {
    console.error("Error fetching URL:", error);
    res.status(500).json({ message: "Error fetching URL content" });
  }
};
const fetchContent = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract only the body content
    const bodyContent = $("body").html();

    if (bodyContent) {
      return bodyContent;
    } else {
      return "No body content found";
    }
  } catch (error) {
    console.error("Error fetching URL:", error);
    return "Error fetching URL content";
  }
};

const updateNews = async (req, res) => {
  const { id: articleId } = req.params;
  const news = await News.findOneAndUpdate({ _id: articleId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!news) {
    return next(createCustomError(`No task with id: ${articleId}`, 404));
  }
  res.status(200).json({ news });
};

const addNewsBatch = async (req, res) => {
  const articles = req.body; // Assuming the articles are sent in the request body as an array

  if (!Array.isArray(articles)) {
    return res
      .status(400)
      .json({ message: "Input should be an array of articles" });
  }

  const newsPromises = articles.map(async (article) => {
    const bodyContent = await fetchContent(article.url);

    const newsData = {
      author: article.author,
      title: article.title,
      description: article.description,
      urlToImage: article.urlToImage,
      url: article.url,
      body: bodyContent, // Add the fetched body content here
    };

    return newsData;
  });

  try {
    const newsDataArray = await Promise.all(newsPromises);
    res.status(200).json({ newsData: newsDataArray });
  } catch (error) {
    console.error("Error processing news batch:", error);
    res.status(500).json({ message: "Error processing news batch" });
  }
};

module.exports = {
  getAllNewsStatic,
  getAllNews,
  getUrlContent,
  updateNews,
  addNewsBatch,
};
