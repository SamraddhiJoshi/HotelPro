const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);
  res.status(201).json({ token, user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
});

// @desc    Login user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.comparePassword(password))) {
    const token = generateToken(user._id);
    res.json({ token, user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res) => {
  const user = req.user; // set by protect middleware
  res.json({ user });
});

// @desc    Update profile (name only for simplicity)
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const updated = await User.findByIdAndUpdate(req.user._id, { name }, { new: true }).select('-password');
  res.json({ user: updated });
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
exports.changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);
  const match = await user.comparePassword(currentPassword);
  if (!match) {
    res.status(400);
    throw new Error('Current password is incorrect');
  }
  user.password = newPassword;
  await user.save();
  res.json({ message: 'Password updated' });
});

// @desc    Get all users (admin)
// @route   GET /api/auth/users
// @access  Private/Admin
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.json({ users });
});

// @desc    Toggle user active status (admin)
// @route   PATCH /api/auth/users/:id/status
// @access  Private/Admin
exports.toggleUserStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  user.isActive = !user.isActive;
  await user.save();
  res.json({ user });
});
