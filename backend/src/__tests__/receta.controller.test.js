const recetaController = require("../modules/recetas/receta.controller");
const recetaService = require("../modules/recetas/receta.service");

jest.mock("../modules/recetas/receta.service");

describe("Receta Controller", () => {

  let req;
  let res;
  let next;

  beforeEach(() => {

    req = {
      body: {},
      params: {},
      usuario: {
        id: "medico1",
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

    test("Debe crear una receta", async () => {

      recetaService.crear.mockResolvedValue({
        _id: "1",
      });

      await recetaController.crear(req, res, next);

      expect(recetaService.crear)
        .toHaveBeenCalledWith(
          req.body,
          req.usuario
        );

      expect(res.status)
        .toHaveBeenCalledWith(201);

      expect(res.json)
        .toHaveBeenCalledWith({
          mensaje: "Receta creada correctamente.",
          data: {
            _id: "1",
          },
        });

    });

    test("Debe enviar errores al middleware", async () => {

      const error = new Error("Error");

      recetaService.crear.mockRejectedValue(error);

      await recetaController.crear(req, res, next);

      expect(next)
        .toHaveBeenCalledWith(error);

    });

  });

  describe("listar", () => {

    test("Debe listar recetas", async () => {

      recetaService.listar.mockResolvedValue([
        { _id: "1" },
      ]);

      await recetaController.listar(req, res, next);

      expect(res.json)
        .toHaveBeenCalledWith({
          data: [
            { _id: "1" },
          ],
        });

    });

  });

  describe("misRecetas", () => {

    test("Debe listar mis recetas", async () => {

      recetaService.listarMisRecetas.mockResolvedValue([
        { _id: "1" },
      ]);

      await recetaController.misRecetas(req, res, next);

      expect(recetaService.listarMisRecetas)
        .toHaveBeenCalledWith("medico1");

      expect(res.json)
        .toHaveBeenCalledWith({
          data: [
            { _id: "1" },
          ],
        });

    });

  });

  describe("obtenerPorId", () => {

    test("Debe devolver una receta", async () => {

      req.params.id = "1";

      recetaService.obtenerPorId.mockResolvedValue({
        _id: "1",
      });

      await recetaController.obtenerPorId(req, res, next);

      expect(res.json)
        .toHaveBeenCalledWith({
          data: {
            _id: "1",
          },
        });

    });

    test("Debe devolver 404", async () => {

      recetaService.obtenerPorId.mockResolvedValue(null);

      await recetaController.obtenerPorId(req, res, next);

      expect(res.status)
        .toHaveBeenCalledWith(404);

      expect(res.json)
        .toHaveBeenCalledWith({
          mensaje: "Receta no encontrada.",
        });

    });

  });

  describe("actualizar", () => {

    test("Debe actualizar una receta", async () => {

      recetaService.actualizar.mockResolvedValue({
        _id: "1",
      });

      await recetaController.actualizar(req, res, next);

      expect(recetaService.actualizar)
        .toHaveBeenCalled();

      expect(res.json)
        .toHaveBeenCalledWith({
          mensaje: "Receta actualizada correctamente.",
          data: {
            _id: "1",
          },
        });

    });

  });

  describe("eliminar", () => {

    test("Debe eliminar una receta", async () => {

      recetaService.eliminar.mockResolvedValue();

      await recetaController.eliminar(req, res, next);

      expect(recetaService.eliminar)
        .toHaveBeenCalled();

      expect(res.json)
        .toHaveBeenCalledWith({
          mensaje: "Receta eliminada correctamente.",
        });

    });

  });

});