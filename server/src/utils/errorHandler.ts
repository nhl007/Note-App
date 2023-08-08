export default class errorHandler extends Error {
  status: number;
  constructor(message: string, status: number) {
    super();
    this.message = message;
    this.status = status;
    Error.captureStackTrace(this, this.constructor);
  }
}
