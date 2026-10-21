const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  paymentMethod: { type: String, required: true },
  transactionId: { type: String },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['completed', 'failed'], default: 'completed' },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
