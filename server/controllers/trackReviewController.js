const TrackReview = require('../models/trackReviewModel');

module.exports = {

    findAllTrackReviews: (req, res) => {
        TrackReview.find()
            .then((allTrackReviews) => {
                res.status(200).json({ trackReviews: allTrackReviews })
            })
            .catch((err) => {
                res.status(400).json(err)
            });
    },

    createTrackReview: (req, res) => {
        TrackReview.create(req.body)
            .then((newTrackReview) => {
                res.status(201).json({ trackReview: newTrackReview })
            })
            .catch((err) => {
                res.status(400).json(err)
            });
    },

    findOneTrackReview: (req, res) => {
        TrackReview.findOne({ _id: req.params.id })
            .then(oneTrackReview => {
                res.status(200).json({ trackReview: oneTrackReview })
            })
            .catch((err) => {
                res.status(400).json(err)
            });
    },

    updateTrackReview: (req, res) => {
        TrackReview.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then(updatedTrackReview => {
                res.status(201).json({ trackReview: updatedTrackReview })
            })
            .catch((err) => {
                res.status(400).json(err)
            });
    },

    deleteTrackReview: (req, res) => {
        TrackReview.deleteOne({ _id: req.params.id })
            .then(() => {
                res.status(204).send()
            })
            .catch((err) => {
                res.status(400).json(err)
            });
    }
}