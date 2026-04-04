export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
<<<<<<< HEAD
    message: string,
    public readonly code: string = "HTTP_ERROR",
    public readonly details?: unknown
=======
    message: string
>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
  ) {
    super(message);
    this.name = "HttpError";
  }
}
<<<<<<< HEAD
=======

>>>>>>> 19a8392d8b9fce35da33f576904dc6c15d161402
