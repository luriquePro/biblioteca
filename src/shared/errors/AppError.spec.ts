import { AppError, BadRequestError, NotFoundError, UnauthorizedError } from "./AppError";

describe("AppError", () => {
  test("should create an instance of AppError", () => {
    const error = new AppError("Test");
    expect(error).toBeInstanceOf(AppError);
  });

  test("should create an instance of AppError with default status code", () => {
    const error = new AppError("Test");
    expect(error.statusCode).toBe(500);
  });

  test("should create an instance of AppError with custom status code", () => {
    const error = new AppError("Test", 404);
    expect(error.statusCode).toBe(404);
  });
});

describe("BadRequestError", () => {
  test("should create an instance of BadRequestError", () => {
    const error = new BadRequestError("Test");
    expect(error).toBeInstanceOf(BadRequestError);
  });

  test("should create an instance of BadRequestError with status code 400", () => {
    const error = new BadRequestError("Test");
    expect(error.statusCode).toBe(400);
  });
});

describe("NotFoundError", () => {
  test("should create an instance of NotFoundError", () => {
    const error = new NotFoundError("Test");
    expect(error).toBeInstanceOf(NotFoundError);
  });

  test("should create an instance of NotFoundError with status code 404", () => {
    const error = new NotFoundError("Test");
    expect(error.statusCode).toBe(404);
  });
});

describe("UnauthorizedError", () => {
  test("should create an instance of UnauthorizedError", () => {
    const error = new UnauthorizedError("Test");
    expect(error).toBeInstanceOf(UnauthorizedError);
  });

  test("should create an instance of UnauthorizedError with status code 401", () => {
    const error = new UnauthorizedError("Test");
    expect(error.statusCode).toBe(401);
  });
});
