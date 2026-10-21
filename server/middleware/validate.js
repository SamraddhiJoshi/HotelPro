const { validationResult } = require('express-validator');

// Middleware to handle validation results
exports.validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Example validation rules can be exported from each controller file
