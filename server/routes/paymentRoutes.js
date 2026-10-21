const express = require('express');
const { processPayment, getPaymentByBooking } = require('../controllers/paymentController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.post('/process', protect, processPayment);
router.get('/:bookingId', protect, adminOnly, getPaymentByBooking);

module.exports = router;
