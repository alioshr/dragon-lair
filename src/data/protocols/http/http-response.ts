export enum HttpStatusCode {
  ok = 200,
  created = 201,
  badRequest = 400,
  notFound = 404,
  serverError = 500
}

export type HttpResponse<BodyType = any> = {
  statusCode: HttpStatusCode
  body?: BodyType
}
