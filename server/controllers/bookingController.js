const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const Room = require('../models/Room');

// @desc    Create new booking (user)
// @route   POST /api/bookings
// @access  Private
exports.createBooking = asyncHandler(async (req, res) => {
  const { roomId, checkInDate, checkOutDate } = req.body;
  const room = await Room.findById(roomId);
  if (!room) {
    res.status(404);
    throw new Error('Room not found');
  }
  // Simple price calc
  const nights = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
  const totalPrice = nights * room.pricePerNight;
  const booking = await Booking.create({
    user: req.user._id,
    room: roomId,
    checkInDate,
    checkOutDate,
    totalPrice,
    status: 'pending',
  });
  res.status(201).json({ booking });
});

// @desc    Get bookings for logged in user
// @route   GET /api/bookings/my
// @access  Private
exports.getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('room');
  res.json({ bookings });
});

// @desc    Get all bookings (admin)
// @route   GET /api/bookings
// @access  Private/Admin
exports.getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find().populate('room user');
  res.json({ bookings });
});

// @desc    Cancel a booking (user can cancel own, admin any)
// @route   POST /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }
  // Only owner or admin can cancel
  if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to cancel this booking');
  }
  booking.status = 'cancelled';
  await booking.save();
  res.json({ booking });
});

// @desc    Update booking status (admin)
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
exports.updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body; // expected 'confirmed' etc.
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }
  res.json({ booking });
});

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
  updateBookingStatus,
};
