export class BadRequestResponse {
  //@example 400
  statusCode: number;

  message?: string;

  //@example "Bad Request"
  error?: string;
}

export class NotFoundResponse {
  //@example 404
  statusCode: number;

  message?: string;

  //@example "Not Found"
  error?: string;
}

export class UnauthorizedResponse {
  //@example 401
  status: number;

  //@example Unauthorize
  message: string;
}

export class InternalServerErrorResponse {
  //@example 500
  statusCode: number;

  message?: string;

  //@example "Internal Server Error"
  error?: string;
}
