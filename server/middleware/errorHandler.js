module.exports = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Server Error',
    // Optionally include stack in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
