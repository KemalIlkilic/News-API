require("dotenv").config();
const connectDB = require("./db/connect");
const Articles = require("./models/articles");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connected to db");
    await Articles.deleteMany();
    await Articles.create(jsonProducts);
    console.log("success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
