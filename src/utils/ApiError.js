class ApiError extends Error {
  constructor(
    statuscode,
    message = "something went wrong",
    errors = [],
    stacks
  ) {
    (super(message),
      (this.statuscode = statuscode),
      (this.data = null),
      (this.errors = errors),
      (this.message = message),
      (this.sucess = false));

    if (stacks) {
      this.stack = stacks;
    } else {
      Error.captureStackTrace(this.this.constructor);
    }
  }
}
export { ApiError };
