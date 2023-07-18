const mongoose = require('mongoose');

const TrackReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title required.'],
        minLength: [1, 'Title must be at least 1 character.']
    },
    artist: {
        type: String,
        required: [true, 'Artist required.'],
        minLength: [1, 'Artist must be at least 1 character.']
    },
    album: {
        type: String,
        required: [true, 'Album required.'],
        minLength: [1, 'Album must be at least 1 character.']
    },
    genre: {
        type: String,
        required: [true, 'Genre required.'],
        minLength: [1, 'Genre must be at least 1 character.']
    },
    score: {
        type: Number,
        required: [true, 'Score required.'],
        min: [1, 'Please pick a number between 1-10.'],
        max: [10, 'Please pick a number between 1-10.']
    },
    content: {
        type: String,
        required: [true, 'Review required.'],
        minLength: [1, 'Review must be at least 1 character.']
    }
}, { timestamps: true });

const TrackReview = mongoose.model('TrackReview', TrackReviewSchema);
module.exports = TrackReview;
