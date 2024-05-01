const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/auth.js");
const storyRoutes = require("./routes/story.js");
const bookmarkRoutes = require("./routes/bookmark.js");

const cors = require("cors");

// creating a express server
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

// health API
app.get("/health", (req, res) => {
  res.json({
    success: "true",
    service: "SwipTory backend server",
    status: "server is successfully running",
    date: new Date(),
  });
});

// Middlewares
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/story", storyRoutes);
app.use("/api/v1/bookmark", bookmarkRoutes);

// listen to port and connecting to DB
app.listen(process.env.PORT, (error) => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(
      console.log(`server is running on http://localhost:${process.env.PORT}`)
    )
    .catch((err) => console.log(err));
});
