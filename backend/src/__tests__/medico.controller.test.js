const medicoController = require("../modules/medicos/medico.controller");
const medicoService = require("../modules/medicos/medico.service");

jest.mock("../modules/medicos/medico.service");

describe("Medico Controller", () => {

  let req;
  let res;
  let next;

  beforeEach(() => {

    req = {
      body: {},
      params: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();

    jest.clearAllMocks();

  });

  describe("crear", () => {

    test("Debe crear un médico", async () => {

      medicoService.crear.mockResolvedValue({
        _id: "1",
      });

      await medicoController.crear(req, res, next);

      expect(medicoService.crear)
        .toHaveBeenCalledWith(req.body);

      expect(res.status)
        .toHaveBeenCalledWith(201);

      expect(res.json)
        .toHaveBeenCalledWith({
          mensaje: "Médico creado correctamente.",
          data: {
            _id: "1",
          },
        });

    });

    test("Debe enviar errores al middleware", async () => {

      const error = new Error("Error");

      medicoService.crear.mockRejectedValue(error);

      await medicoController.crear(req, res, next);

      expect(next)
        .toHaveBeenCalledWith(error);

    });

  });

  describe("listar", () => {

    test("Debe listar médicos", async () => {

      medicoService.listar.mockResolvedValue([
        { _id: "1" },
      ]);

      await medicoController.listar(req, res, next);

      expect(res.json)
        .toHaveBeenCalledWith({
          data: [
            { _id: "1" },
          ],
        });

    });

  });

  describe("obtenerPorId", () => {

    test("Debe devolver un médico", async () => {

      req.params.id = "1";

      medicoService.obtenerPorId.mockResolvedValue({
        _id: "1",
      });

      await medicoController.obtenerPorId(req, res, next);

      expect(res.json)
        .toHaveBeenCalledWith({
          data: {
            _id: "1",
          },
        });

    });

    test("Debe devolver 404", async () => {

      medicoService.obtenerPorId.mockResolvedValue(null);

      await medicoController.obtenerPorId(req, res, next);

      expect(res.status)
        .toHaveBeenCalledWith(404);

      expect(res.json)
        .toHaveBeenCalledWith({
          mensaje: "Médico no encontrado.",
        });

    });

  });

  describe("actualizar", () => {

    test("Debe actualizar un médico", async () => {

      medicoService.actualizar.mockResolvedValue({
        _id: "1",
      });

      await medicoController.actualizar(req, res, next);

      expect(medicoService.actualizar)
        .toHaveBeenCalled();

      expect(res.json)
        .toHaveBeenCalledWith({
          mensaje: "Médico actualizado correctamente.",
          data: {
            _id: "1",
          },
        });

    });

  });

  describe("eliminar", () => {

    test("Debe eliminar un médico", async () => {

      medicoService.eliminar.mockResolvedValue();

      await medicoController.eliminar(req, res, next);

      expect(medicoService.eliminar)
        .toHaveBeenCalled();

      expect(res.json)
        .toHaveBeenCalledWith({
          mensaje: "Médico eliminado correctamente.",
        });

    });

  });

});