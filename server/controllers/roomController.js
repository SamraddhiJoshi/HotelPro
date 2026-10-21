const asyncHandler = require('express-async-handler');
const Room = require('../models/Room');

// @desc    Get all rooms (public)
// @route   GET /api/rooms
// @access  Public
exports.getRooms = asyncHandler(async (req, res) => {
  const { search, type, minPrice, maxPrice } = req.query;
  const filter = {};
  if (search) {
    filter.title = { $regex: search, $options: 'i' };
  }
  if (type) {
    filter.roomType = type;
  }
  if (minPrice || maxPrice) {
    filter.pricePerNight = {};
    if (minPrice) filter.pricePerNight.$gte = Number(minPrice);
    if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice);
  }
  const rooms = await Room.find(filter);
  res.json({ rooms });
});

// @desc    Get single room by ID
// @route   GET /api/rooms/:id
// @access  Public
exports.getRoomById = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);
  if (!room) {
    res.status(404);
    throw new Error('Room not found');
  }
  res.json(room);
});

// @desc    Create new room (admin)
// @route   POST /api/rooms
// @access  Private/Admin
exports.createRoom = asyncHandler(async (req, res) => {
  const room = await Room.create(req.body);
  res.status(201).json(room);
});

// @desc    Update room (admin)
// @route   PUT /api/rooms/:id
// @access  Private/Admin
exports.updateRoom = asyncHandler(async (req, res) => {
  const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!room) {
    res.status(404);
    throw new Error('Room not found');
  }
  res.json(room);
});

// @desc    Delete room (admin)
// @route   DELETE /api/rooms/:id
// @access  Private/Admin
exports.deleteRoom = asyncHandler(async (req, res) => {
  const room = await Room.findByIdAndDelete(req.params.id);
  if (!room) {
    res.status(404);
    throw new Error('Room not found');
  }
  res.json({ message: 'Room deleted' });
});

// @desc    Get room stats (admin/staff)
// @route   GET /api/rooms/stats
// @access  Private/Admin or staff (role check can be added later)
exports.getRoomStats = asyncHandler(async (req, res) => {
  const total = await Room.countDocuments();
  const available = await Room.countDocuments({ isAvailable: true });
  const occupied = await Room.countDocuments({ isAvailable: false });
  const byType = await Room.aggregate([
    { $group: { _id: '$roomType', count: { $sum: 1 }, avgPrice: { $avg: '$pricePerNight' } } }
  ]);
  res.json({ total, available, occupied, byType });
});

module.exports = {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomStats,
};
