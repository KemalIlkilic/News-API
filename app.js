require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const connectDB = require("./db/connect");
const newsRouter = require("./routes/news");

const errorMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send("<h1>Store API</h1><a href='/api/v1/products'>products</a>");
});

app.use("/api/v1/news", newsRouter);

// news route

app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    console.log("MONGO_URI:", process.env.MONGO_URI);
    // connect db
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
