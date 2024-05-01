const express = require("express");
const router = express.Router();
const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verifyJwt = require("../middlewares/authMiddleware");

//register API
router.post("/register", async (req, res) => {
  try {
    // getting data
    const { userName, password } = req.body;

    //validation
    if (!userName || !password) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    const isExistingUser = await User.findOne({ username: userName });

      //if user already exists
      if (isExistingUser) {
        return res.status(409).json({
          message: "user already exists",
        });
      }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: userName,
      password: hashedpassword,
    });

    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      name: user.name,
      message: "User registerd successfully",
      token: token,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//login API

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    const userDetail = await User.findOne({ username: userName });

    if (!userDetail) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const matchedPassword = await bcrypt.compare(password, userDetail.password);

    if (!matchedPassword) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const token = await jwt.sign(
      { userId: userDetail._id },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      name: userDetail.username,
      message: "User Logged In Successfully",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// checking proteted route

router.get("/protected", verifyJwt, async (req, res) => {
  const user = await User.findOne({ _id: req.body.userId });

  res.status(200).send({ message: "Authorized User", name: user.username });
});

module.exports = router;
