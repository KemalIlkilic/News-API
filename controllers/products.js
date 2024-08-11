const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  // Lazy Evaulation, "don't do the work until you absolutely have to."
  /*
  When you call Product.find(queryObject), instead of immediately going to the database and fetching results,
  Mongoose (the ODM for MongoDB in Node.js) returns a Query object.
  This object represents the query you want to perform, but it hasn't been executed yet.
  Think of it like writing down instructions for a task, but not actually doing the task yet.
  The Query object holds these "instructions" for the database query.
  */
  let query = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    query = query.sort(sortList);
  } else {
    query = query.sort("createdAt");
  }
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    query = query.select(fieldsList);
  }
  const products = await query;

  //const products = await Product.find(queryObject)
  //.sort(sort ? sort.split(",").join(" ") : "createdAt");

  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
