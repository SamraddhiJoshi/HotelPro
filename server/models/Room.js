const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  pricePerNight: { type: Number, required: true },
  capacity: { type: Number, default: 1 },
  roomType: { type: String },
  images: [{ type: String }],
  amenities: [{ type: String }],
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
