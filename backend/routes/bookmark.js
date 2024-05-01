const express = require("express");
const router = express.Router();
const Story = require("../models/story.models");
const Bookmark = require("../models/bookmark.models");
const verifyJwt = require("../middlewares/authMiddleware");

// adding bookmark API
router.post("/create/:storyId", verifyJwt, async (req, res) => {
  try {
    const userId = req.body.userId;
    const storyId = req.params.storyId;

    // if bookmark is not present => add the bookmark
    const bookmark = await Bookmark.findOne({
      owner: userId,
      refStoryId: storyId,
    });

    if (bookmark === null) {
      const story = await Story.findOne({ _id: storyId });

      const newBookmark = await Bookmark.create({
        owner: userId,
        refStoryId: storyId,
        likedArray: story?.likedArray,
        slides: story?.slides,
      });

      const bookmarkStories = await Bookmark.find({
        owner: userId,
        // refStoryId: storyId,
      });

      return res.status(200).json({
        message: "Bookmark added",
        isBookmarked: true,
        bookmarkStories,
      });
    }

    //if bookmark is already present => remove the bookmark
    if (bookmark) {
      await Bookmark.deleteOne({ owner: userId, refStoryId: storyId });

      const bookmarkStories = await Bookmark.find({
        owner: userId,
        // refStoryId: storyId,
      });

      return res.status(200).json({
        message: "Bookmark removed",
        isBookmarked: false,
        bookmarkStories,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// check if bookmarked API
router.get("/check/:storyId", verifyJwt, async (req, res) => {
  try {
    const userId = req.body.userId;
    const storyId = req.params.storyId;

    const bookmark = await Bookmark.findOne({
      owner: userId,
      refStoryId: storyId,
    });

    if (!bookmark) {
      return res.status(200).json({
        isBookmarked: false,
      });
    }

    if (bookmark) {
      return res.status(200).json({
        isBookmarked: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// get all bookmarked stories
router.get("/get/all", verifyJwt, async (req, res) => {
  try {
    const bookmarkedStories = await Bookmark.find({ owner: req.body.userId });

    res.status(200).json({
      bookmarkedStories,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }

})

module.exports = router;
