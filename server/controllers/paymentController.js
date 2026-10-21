const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

// @desc    Process payment (mock implementation)
// @route   POST /api/payments/process
// @access  Private
exports.processPayment = asyncHandler(async (req, res) => {
  const { bookingId, paymentMethod, amount } = req.body;
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }
  // In real world, integrate with payment gateway. Here mock success.
  const payment = await Payment.create({
    booking: bookingId,
    user: req.user._id,
    paymentMethod,
    amount,
    transactionId: `TXN-${Date.now()}`,
    status: 'completed',
  });
  // Update booking status to confirmed
  booking.status = 'confirmed';
  await booking.save();
  res.status(201).json({ payment, booking });
});

// @desc    Get payment details by booking ID (admin)
// @route   GET /api/payments/:bookingId
// @access  Private/Admin
exports.getPaymentByBooking = asyncHandler(async (req, res) => {
  const payment = await Payment.findOne({ booking: req.params.bookingId }).populate('user booking');
  if (!payment) {
    res.status(404);
    throw new Error('Payment not found');
  }
  res.json({ payment });
});

module.exports = {
  processPayment,
  getPaymentByBooking,
};
