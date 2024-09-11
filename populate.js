require("dotenv").config();
const connectDB = require("./db/connect");
const News = require("./models/news");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connected to db");
    await News.deleteMany();
    await News.create(jsonProducts);
    console.log("success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
