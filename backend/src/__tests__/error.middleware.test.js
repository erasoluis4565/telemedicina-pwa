const errorHandler = require("../middlewares/error.middleware");

describe("Error Middleware", () => {

  let req;
  let res;
  let next;

  beforeEach(() => {

    req = {};

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();

    jest.spyOn(console, "error").mockImplementation(() => {});

  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Debe devolver el mensaje del error", () => {

    const error = new Error("Algo salió mal");

    errorHandler(
      error,
      req,
      res,
      next
    );

    expect(console.error)
      .toHaveBeenCalledWith(error);

    expect(res.status)
      .toHaveBeenCalledWith(500);

    expect(res.json)
      .toHaveBeenCalledWith({
        mensaje: "Algo salió mal",
      });

  });

  test("Debe devolver mensaje por defecto", () => {

    const error = {};

    errorHandler(
      error,
      req,
      res,
      next
    );

    expect(res.status)
      .toHaveBeenCalledWith(500);

    expect(res.json)
      .toHaveBeenCalledWith({
        mensaje: "Error interno del servidor.",
      });

  });

});