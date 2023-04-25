const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const mangaRoutes = require("./routes/manga");
const chapterRoutes = require("./routes/chapter");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// app.js


app.use("/api", mangaRoutes);
app.use("/api", chapterRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => console.log("Connected to MongoDB Cloud"));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
