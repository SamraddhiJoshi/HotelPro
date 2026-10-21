const express = require('express');
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
  updateBookingStatus,
} = require('../controllers/bookingController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.get('/', protect, adminOnly, getAllBookings);
router.post('/:id/cancel', protect, cancelBooking);
router.put('/:id/status', protect, adminOnly, updateBookingStatus);

module.exports = router;
