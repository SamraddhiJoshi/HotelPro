const asyncHandler = require('express-async-handler');
const Review = require('../models/Review');

// @desc    Add review for a room (user)
// @route   POST /api/reviews
// @access  Private
exports.addReview = asyncHandler(async (req, res) => {
  const { roomId, rating, comment } = req.body;
  const review = await Review.create({
    user: req.user._id,
    room: roomId,
    rating,
    comment,
  });
  res.status(201).json({ review });
});

// @desc    Get reviews for a room (public)
// @route   GET /api/reviews/room/:roomId
// @access  Public
exports.getRoomReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ room: req.params.roomId }).populate('user', 'name');
  res.json({ reviews });
});

module.exports = {
  addReview,
  getRoomReviews,
};
