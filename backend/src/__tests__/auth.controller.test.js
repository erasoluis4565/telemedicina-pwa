const authController = require("../modules/auth/auth.controller");
const authService = require("../modules/auth/auth.service");

jest.mock("../modules/auth/auth.service");

describe("Auth Controller", () => {

  let req;
  let res;
  let next;

  beforeEach(() => {

    req = {
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();

    jest.clearAllMocks();

  });

  describe("registrar", () => {

    test("Debe registrar un usuario correctamente", async () => {

      req.body = {
        nombre: "Luis",
      };

      authService.registrar.mockResolvedValue({
        toObject: () => ({
          _id: "1",
          nombre: "Luis",
          email: "test@test.com",
          passwordHash: "hash",
        }),
      });

      await authController.registrar(
        req,
        res,
        next
      );

      expect(authService.registrar)
        .toHaveBeenCalledWith(req.body);

      expect(res.status)
        .toHaveBeenCalledWith(201);

      expect(res.json)
        .toHaveBeenCalledWith({
          mensaje: "Usuario registrado correctamente.",
          data: {
            _id: "1",
            nombre: "Luis",
            email: "test@test.com",
          },
        });

    });

    test("Debe enviar el error al middleware", async () => {

      const error = new Error("Error");

      authService.registrar.mockRejectedValue(error);

      await authController.registrar(
        req,
        res,
        next
      );

      expect(next)
        .toHaveBeenCalledWith(error);

    });

  });

  describe("login", () => {

    test("Debe iniciar sesión correctamente", async () => {

      req.body = {
        email: "test@test.com",
        password: "123456",
      };

      authService.login.mockResolvedValue({
        token: "abc123",

        usuario: {
          toObject: () => ({
            _id: "1",
            nombre: "Luis",
            email: "test@test.com",
            passwordHash: "hash",
          }),
        },

      });

      await authController.login(
        req,
        res,
        next
      );

      expect(authService.login)
        .toHaveBeenCalledWith(req.body);

      expect(res.json)
        .toHaveBeenCalledWith({
          mensaje: "Inicio de sesión correcto.",
          token: "abc123",
          usuario: {
            _id: "1",
            nombre: "Luis",
            email: "test@test.com",
          },
        });

    });

    test("Debe enviar errores al middleware", async () => {

      const error = new Error("Login incorrecto");

      authService.login.mockRejectedValue(error);

      await authController.login(
        req,
        res,
        next
      );

      expect(next)
        .toHaveBeenCalledWith(error);

    });

  });

});