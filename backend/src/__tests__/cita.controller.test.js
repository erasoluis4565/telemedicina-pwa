const citaController = require("../modules/citas/cita.controller");
const citaService = require("../modules/citas/cita.service");

jest.mock("../modules/citas/cita.service");

describe("Cita Controller", () => {

  let req;
  let res;
  let next;

  beforeEach(() => {

    req = {
      body: {},
      params: {},
      query: {},
      usuario: {
        id: "paciente1",
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

    test("Debe crear una cita", async () => {

      citaService.crear.mockResolvedValue({
        _id: "1",
      });

      await citaController.crear(req, res, next);

      expect(citaService.crear)
        .toHaveBeenCalledWith({
          ...req.body,
          pacienteId: "paciente1",
        });

      expect(res.status)
        .toHaveBeenCalledWith(201);

      expect(res.json)
        .toHaveBeenCalledWith({
          mensaje: "Cita creada correctamente.",
          data: {
            _id: "1",
          },
        });

    });

    test("Debe enviar errores al middleware", async () => {

      const error = new Error("Error");

      citaService.crear.mockRejectedValue(error);

      await citaController.crear(req, res, next);

      expect(next)
        .toHaveBeenCalledWith(error);

    });

  });

  describe("listar", () => {

    test("Debe listar citas", async () => {

      citaService.listar.mockResolvedValue([
        { _id: "1" },
      ]);

      await citaController.listar(req, res, next);

      expect(res.json)
        .toHaveBeenCalledWith({
          data: [
            { _id: "1" },
          ],
        });

    });

  });

  describe("misCitas", () => {

    test("Debe listar mis citas", async () => {

      citaService.listarMisCitas.mockResolvedValue([
        { _id: "1" },
      ]);

      await citaController.misCitas(req, res, next);

      expect(citaService.listarMisCitas)
        .toHaveBeenCalledWith("paciente1");

      expect(res.json)
        .toHaveBeenCalledWith({
          data: [
            { _id: "1" },
          ],
        });

    });

  });

  describe("obtenerPorId", () => {

    test("Debe devolver una cita", async () => {

      req.params.id = "1";

      citaService.obtenerPorId.mockResolvedValue({
        _id: "1",
      });

      await citaController.obtenerPorId(
        req,
        res,
        next
      );

      expect(res.json)
        .toHaveBeenCalledWith({
          data: {
            _id: "1",
          },
        });

    });

    test("Debe devolver 404", async () => {

      citaService.obtenerPorId.mockResolvedValue(null);

      await citaController.obtenerPorId(
        req,
        res,
        next
      );

      expect(res.status)
        .toHaveBeenCalledWith(404);

      expect(res.json)
        .toHaveBeenCalledWith({
          mensaje: "Cita no encontrada.",
        });

    });

  });

  describe("actualizar", () => {

    test("Debe actualizar una cita", async () => {

      citaService.actualizar.mockResolvedValue({
        _id: "1",
      });

      await citaController.actualizar(
        req,
        res,
        next
      );

      expect(res.json)
        .toHaveBeenCalledWith({
          mensaje: "Cita actualizada correctamente.",
          data: {
            _id: "1",
          },
        });

    });

  });

  describe("eliminar", () => {

    test("Debe eliminar una cita", async () => {

      citaService.eliminar.mockResolvedValue();

      await citaController.eliminar(
        req,
        res,
        next
      );

      expect(res.json)
        .toHaveBeenCalledWith({
          mensaje: "Cita eliminada correctamente.",
        });

    });

  });

  describe("obtenerHorariosDisponibles", () => {

    test("Debe devolver horarios disponibles", async () => {

      req.query = {
        medicoId: "medico1",
        fecha: "2026-07-05",
      };

      citaService.obtenerHorariosDisponibles.mockResolvedValue([
        "09:00",
        "10:00",
      ]);

      await citaController.obtenerHorariosDisponibles(
        req,
        res,
        next
      );

      expect(citaService.obtenerHorariosDisponibles)
        .toHaveBeenCalledWith(
          "medico1",
          "2026-07-05"
        );

      expect(res.json)
        .toHaveBeenCalledWith({
          data: [
            "09:00",
            "10:00",
          ],
        });

    });

  });

});