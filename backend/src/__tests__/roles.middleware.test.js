const verificarRol = require("../middlewares/roles.middleware");

describe("Roles Middleware", () => {

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

    jest.clearAllMocks();

  });

  test("Debe devolver 401 si no existe usuario autenticado", () => {

    const middleware = verificarRol("ADMIN");

    middleware(req, res, next);

    expect(res.status)
      .toHaveBeenCalledWith(401);

    expect(res.json)
      .toHaveBeenCalledWith({
        mensaje: "Usuario no autenticado."
      });

  });

  test("Debe devolver 403 cuando el usuario no tiene permisos", () => {

    req.usuario = {
      rol: "PACIENTE"
    };

    const middleware = verificarRol("ADMIN");

    middleware(req, res, next);

    expect(res.status)
      .toHaveBeenCalledWith(403);

    expect(res.json)
      .toHaveBeenCalledWith({
        mensaje: "No tienes permisos para realizar esta acción."
      });

  });

  test("Debe permitir continuar cuando el rol es válido", () => {

    req.usuario = {
      rol: "ADMIN"
    };

    const middleware = verificarRol(
      "ADMIN",
      "MEDICO"
    );

    middleware(req, res, next);

    expect(next)
      .toHaveBeenCalled();

  });

});