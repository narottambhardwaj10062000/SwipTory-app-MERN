const mongoose = require('mongoose');

// each slide schema
const slideSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});

const storySchema = new mongoose.Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    
    likedArray: {
        type: Array,
    },
    slides: [slideSchema],
});

module.exports = mongoose.model("Story", storySchema);