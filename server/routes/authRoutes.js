const express = require('express');
const { register, login, getMe, updateProfile, changePassword, getAllUsers, toggleUserStatus } = require('../controllers/authController');
const { protect, adminOnly } = require('../middleware/auth');
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validate');

const router = express.Router();

// Validation rules
const registerRules = [
  body('name').notEmpty().withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars')
];

const loginRules = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').exists().withMessage('Password required')
];

router.post('/register', registerRules, validateRequest, register);
router.post('/login', loginRules, validateRequest, login);
router.get('/me', protect, getMe);
router.put('/profile', protect, body('name').notEmpty(), validateRequest, updateProfile);
router.put('/change-password', protect, body('currentPassword').exists(), body('newPassword').isLength({ min: 6 }), validateRequest, changePassword);

// Admin routes
router.get('/users', protect, adminOnly, getAllUsers);
router.patch('/users/:id/status', protect, adminOnly, toggleUserStatus);

module.exports = router;
