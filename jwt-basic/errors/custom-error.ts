class CustomAPIError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    // Invoke the constructor of parent class
    super(message);
    this.statusCode = statusCode;
  }
}

function createCustomError(msg: string, statusCode: number) {
  return new CustomAPIError(msg, statusCode);
}

export { CustomAPIError, createCustomError };
