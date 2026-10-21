const express = require('express');
const { addReview, getRoomReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, addReview);
router.get('/room/:roomId', getRoomReviews);

module.exports = router;
