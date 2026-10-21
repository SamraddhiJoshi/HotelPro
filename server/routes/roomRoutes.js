const express = require('express');
const { getRooms, getRoomById, createRoom, updateRoom, deleteRoom, getRoomStats } = require('../controllers/roomController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getRooms);
router.get('/:id', getRoomById);
router.get('/stats', protect, adminOnly, getRoomStats);

// Admin routes
router.post('/', protect, adminOnly, createRoom);
router.put('/:id', protect, adminOnly, updateRoom);
router.delete('/:id', protect, adminOnly, deleteRoom);

module.exports = router;
