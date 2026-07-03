const asyncHandler = (handler) => {
  (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch((Err) => next(Err));
  };
};

export { asyncHandler };
 