const verificarToken = require("../middlewares/auth.middleware");
const jwt = require("jsonwebtoken");

jest.mock("jsonwebtoken");

describe("Auth Middleware", () => {

  let req;
  let res;
  let next;

  beforeEach(() => {

    req = {
      headers: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();

    jest.clearAllMocks();

  });

  test("Debe devolver 401 si no existe token", () => {

    verificarToken(req, res, next);

    expect(res.status)
      .toHaveBeenCalledWith(401);

    expect(res.json)
      .toHaveBeenCalledWith({
        mensaje: "Token no proporcionado.",
      });

  });

  test("Debe permitir el acceso con un token válido", () => {

    process.env.JWT_SECRET = "test-secret";

    req.headers.authorization =
      "Bearer token123";

    jwt.verify.mockReturnValue({
      id: "1",
      rol: "ADMIN",
    });

    verificarToken(req, res, next);

    expect(jwt.verify)
      .toHaveBeenCalledWith(
        "token123",
        "test-secret"
      );

    expect(req.usuario).toEqual({
      id: "1",
      rol: "ADMIN",
    });

    expect(next)
      .toHaveBeenCalled();

  });

  test("Debe devolver 401 cuando el token es inválido", () => {

    process.env.JWT_SECRET = "test-secret";

    req.headers.authorization =
      "Bearer token123";

    jwt.verify.mockImplementation(() => {
      throw new Error("Token inválido");
    });

    verificarToken(req, res, next);

    expect(res.status)
      .toHaveBeenCalledWith(401);

    expect(res.json)
      .toHaveBeenCalledWith({
        mensaje: "Token inválido o expirado.",
      });

  });

});