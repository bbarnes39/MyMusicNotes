const TrackReviewController = require('../controllers/trackReviewController');

module.exports = (app) => {
    app.get('/home', TrackReviewController.findAllTrackReviews);
    app.post('/songs/newreview', TrackReviewController.createTrackReview);
    app.get('/songs/:id', TrackReviewController.findOneTrackReview);
    app.put('/songs/:id/editreview', TrackReviewController.updateTrackReview);
    app.delete('/songs/:id/delete', TrackReviewController.deleteTrackReview);
}
