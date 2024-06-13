import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-error';

class BadRequestError extends CustomAPIError {
  statusCode: Number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
