const express = require("express");
const router = express.Router();
const Story = require("../models/story.models");
const verifyJwt = require("../middlewares/authMiddleware");

router.post("/create", verifyJwt, async (req, res) => {
  try {
    const { slides } = req.body;
    const userId = req.body.userId;

    const story = await Story.create({
      slides: slides,
      owner: userId,
    });

    const allStories = await Story.find({});

    const foodStory = allStories.filter(
      (story) => story.slides[0].category === "food"
    );
    const healthStory = allStories.filter(
      (story) => story.slides[0].category === "health"
    );
    const travelStory = allStories.filter(
      (story) => story.slides[0].category === "travel"
    );
    const moviesStory = allStories.filter(
      (story) => story.slides[0].category === "movies"
    );
    const educationStory = allStories.filter(
      (story) => story.slides[0].category === "education"
    );

    return res.status(200).json({
      message: "Story Successfully Posted",
      allStories,
      foodStory,
      healthStory,
      travelStory,
      moviesStory,
      educationStory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const { category } = req.query;

    // console.log(category);

    if (category != "all") {
      const allStories = await Story.find({});

      if (category === "food") {
        const foodStory = allStories.filter(
          (story) => story.slides[0].category === "food"
        );

        res.status(200).json({
          foodStory,
        });
      } else if (category === "health") {
        const healthStory = allStories.filter(
          (story) => story.slides[0].category === "health"
        );

        res.status(200).json({
          healthStory,
        });
      } else if (category === "travel") {
        const travelStory = allStories.filter(
          (story) => story.slides[0].category === "travel"
        );

        res.status(200).json({
          travelStory,
        });
      } else if (category === "education") {
        const educationStory = allStories.filter(
          (story) => story.slides[0].category === "education"
        );

        res.status(200).json({
          educationStory,
        });
      } else if (category === "movies") {
        const moviesStory = allStories.filter(
          (story) => story.slides[0].category === "movies"
        );

        res.status(200).json({
          moviesStory,
        });
      }
    } else {
      const allStories = await Story.find({});
      // console.log(allStories);

      // Top Food Stories
      const foodStory = allStories.filter(
        (story) => story.slides[0].category === "food"
      );
      const healthStory = allStories.filter(
        (story) => story.slides[0].category === "health"
      );
      const travelStory = allStories.filter(
        (story) => story.slides[0].category === "travel"
      );
      const moviesStory = allStories.filter(
        (story) => story.slides[0].category === "movies"
      );
      const educationStory = allStories.filter(
        (story) => story.slides[0].category === "education"
      );

      // console.log(healthStory);
      // since no filters. So, we will send each and every data
      return res.status(200).json({
        message: "all stories found",
        allStories,
        foodStory,
        healthStory,
        travelStory,
        moviesStory,
        educationStory,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// get My Stories
router.get("/mystories", verifyJwt, async (req, res) => {
  try {
    const userId = req.body.userId;
    const myStories = await Story.find({ owner: userId });

    res.status(200).json({
      myStories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:_id", async (req, res) => {
  try {
    const _id = req.params._id;
    const storyDetail = await Story.findById({ _id: _id });
    res.status(200).json({
      storyDetail,
      successMessage: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/edit/:_id", async (req, res) => {
  try {
    const _id = req.params._id;
    const { slides } = req.body;

    await Story.updateOne({ _id: _id }, { $set: { slides: slides } });

    const allStories = await Story.find({});

    const foodStory = allStories.filter(
      (story) => story.slides[0].category === "food"
    );
    const healthStory = allStories.filter(
      (story) => story.slides[0].category === "health"
    );
    const travelStory = allStories.filter(
      (story) => story.slides[0].category === "travel"
    );
    const moviesStory = allStories.filter(
      (story) => story.slides[0].category === "movies"
    );
    const educationStory = allStories.filter(
      (story) => story.slides[0].category === "education"
    );

    res.status(200).json({
      message: "story updated successfully",
      allStories,
      foodStory,
      healthStory,
      travelStory,
      moviesStory,
      educationStory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// like story APIs
router.get("/likedornot/:_id", verifyJwt, async (req, res) => {
  try {
    const id = req.body.userId;
    const storyId = req.params._id;

    const story = await Story.findOne({ _id: storyId });
    const isLiked = story?.likedArray.includes(id);

    return res.status(200).json({
      message: "Success",
      newLikesCount: story?.likedArray,
      isLiked,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/like/:_id", verifyJwt, async (req, res) => {
  try {
    //
    const id = req.body.userId;

    const storyId = req.params._id;

    const story = await Story.findOne({ _id: storyId });

    let arr = story?.likedArray;

    if (arr.includes(id)) {
      arr = arr.filter((number) => number !== id);
    } else {
      arr.push(id);
    }

    await Story.updateOne({ _id: storyId }, { $set: { likedArray: arr } });
    const updatedStory = await Story.findOne({ _id: storyId });
    const isLiked = updatedStory?.likedArray.includes(id);

    return res.status(200).json({
      message: "Success",
      newLikesCount: updatedStory?.likedArray,
      isLiked,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
