const citaService = require("../modules/citas/cita.service");
const citaRepository = require("../modules/citas/cita.repository");

jest.mock("../modules/citas/cita.repository");

describe("Cita Service", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Crear cita", () => {

    test("Debe crear una cita correctamente", async () => {

      citaRepository.buscarCitaDuplicada.mockResolvedValue(null);

      citaRepository.crear.mockResolvedValue({
        _id: "1",
        motivo: "Consulta General",
      });

      const resultado = await citaService.crear({
        medicoId: "medico1",
        fecha: "2026-07-10",
        hora: "09:00",
        motivo: "Consulta General",
      });

      expect(resultado.motivo).toBe("Consulta General");

      expect(citaRepository.crear).toHaveBeenCalled();

    });

    test("Debe lanzar error si el horario ya está ocupado", async () => {

      citaRepository.buscarCitaDuplicada.mockResolvedValue({
        _id: "1",
      });

      await expect(

        citaService.crear({
          medicoId: "medico1",
          fecha: "2026-07-10",
          hora: "09:00",
        })

      ).rejects.toThrow(
        "El médico ya tiene una cita en ese horario."
      );

    });

  });

  describe("Consultas", () => {

    test("Debe listar todas las citas", async () => {

      citaRepository.obtenerTodas.mockResolvedValue([
        { motivo: "Consulta 1" },
        { motivo: "Consulta 2" },
      ]);

      const resultado = await citaService.listar();

      expect(resultado).toHaveLength(2);

    });

    test("Debe listar las citas del paciente", async () => {

      citaRepository.obtenerPorPaciente.mockResolvedValue([
        { motivo: "Consulta" },
      ]);

      const resultado =
        await citaService.listarMisCitas("usuario1");

      expect(resultado).toHaveLength(1);

    });

    test("Debe obtener una cita por id", async () => {

      citaRepository.obtenerPorId.mockResolvedValue({
        _id: "1",
      });

      const resultado =
        await citaService.obtenerPorId("1");

      expect(resultado._id).toBe("1");

    });

  });

  describe("Actualizar y eliminar", () => {

    test("Debe actualizar una cita", async () => {

      citaRepository.actualizar.mockResolvedValue({
        estado: "CONFIRMADA",
      });

      const resultado =
        await citaService.actualizar(
          "1",
          { estado: "CONFIRMADA" }
        );

      expect(resultado.estado)
        .toBe("CONFIRMADA");

    });

    test("Debe eliminar una cita", async () => {

      citaRepository.eliminar.mockResolvedValue({
        _id: "1",
      });

      const resultado =
        await citaService.eliminar("1");

      expect(resultado._id).toBe("1");

    });

  });

  describe("Horarios disponibles", () => {

    test("Debe devolver únicamente los horarios libres", async () => {

      citaRepository.obtenerHorariosOcupados.mockResolvedValue([
        { hora: "09:00" },
        { hora: "11:00" },
      ]);

      const horarios =
        await citaService.obtenerHorariosDisponibles(
          "medico1",
          "2026-07-10"
        );

      expect(horarios).toEqual([
        "10:00",
        "14:00",
        "15:00",
        "16:00"
      ]);

    });

  });

});