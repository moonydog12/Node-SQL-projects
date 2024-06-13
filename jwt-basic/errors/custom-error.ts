class CustomAPIError extends Error {
  statusCode: Number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}

export default CustomAPIError;
