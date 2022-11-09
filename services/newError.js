const newError = (message = "Internal server error", status = 500) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = newError;
