const usuarioController = require("../modules/usuarios/usuario.controller");
const usuarioService = require("../modules/usuarios/usuario.service");

jest.mock("../modules/usuarios/usuario.service");

describe("Usuario Controller", () => {

  let req;
  let res;
  let next;

  beforeEach(() => {

    req = {
      body: {},
      params: {},
      usuario: {
        id: "usuario1",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();

    jest.clearAllMocks();

  });

  describe("crear", () => {

    test("Debe crear un usuario", async () => {

      usuarioService.crear.mockResolvedValue({
        id: "1",
      });

      await usuarioController.crear(req, res, next);

      expect(res.status)
        .toHaveBeenCalledWith(201);

      expect(res.json)
        .toHaveBeenCalledWith({
          mensaje: "Usuario creado correctamente.",
          data: {
            id: "1",
          },
        });

    });

    test("Debe enviar errores al middleware", async () => {

      const error = new Error("Error");

      usuarioService.crear.mockRejectedValue(error);

      await usuarioController.crear(req, res, next);

      expect(next)
        .toHaveBeenCalledWith(error);

    });

  });

  describe("listar", () => {

    test("Debe listar usuarios", async () => {

      usuarioService.listar.mockResolvedValue([
        { nombre: "Luis" },
      ]);

      await usuarioController.listar(req, res, next);

      expect(res.json)
        .toHaveBeenCalledWith({
          data: [
            { nombre: "Luis" },
          ],
        });

    });

  });

  describe("obtenerPorId", () => {

    test("Debe devolver un usuario", async () => {

      req.params.id = "1";

      usuarioService.obtenerPorId.mockResolvedValue({
        nombre: "Luis",
      });

      await usuarioController.obtenerPorId(
        req,
        res,
        next
      );

      expect(res.json)
        .toHaveBeenCalledWith({
          data: {
            nombre: "Luis",
          },
        });

    });

    test("Debe responder 404", async () => {

      usuarioService.obtenerPorId.mockResolvedValue(null);

      await usuarioController.obtenerPorId(
        req,
        res,
        next
      );

      expect(res.status)
        .toHaveBeenCalledWith(404);

    });

  });

  describe("perfil", () => {

    test("Debe devolver el perfil", async () => {

      usuarioService.obtenerPerfil.mockResolvedValue({

        toObject: () => ({
          nombre: "Luis",
          email: "test@test.com",
          passwordHash: "hash",
        }),

      });

      await usuarioController.perfil(
        req,
        res,
        next
      );

      expect(res.json)
        .toHaveBeenCalledWith({
          data: {
            nombre: "Luis",
            email: "test@test.com",
          },
        });

    });

    test("Debe devolver 404", async () => {

      usuarioService.obtenerPerfil.mockResolvedValue(null);

      await usuarioController.perfil(
        req,
        res,
        next
      );

      expect(res.status)
        .toHaveBeenCalledWith(404);

    });

  });

  describe("actualizarPerfil", () => {

    test("Debe actualizar el perfil", async () => {

      usuarioService.actualizarPerfil.mockResolvedValue({
        nombre: "Luis",
      });

      await usuarioController.actualizarPerfil(
        req,
        res,
        next
      );

      expect(res.json)
        .toHaveBeenCalledWith({
          mensaje: "Perfil actualizado correctamente.",
          data: {
            nombre: "Luis",
          },
        });

    });

  });

  describe("cambiarPassword", () => {

    test("Debe cambiar la contraseña", async () => {

      usuarioService.cambiarPassword.mockResolvedValue();

      await usuarioController.cambiarPassword(
        req,
        res,
        next
      );

      expect(res.json)
        .toHaveBeenCalledWith({
          mensaje:
            "Contraseña actualizada correctamente.",
        });

    });

  });

});