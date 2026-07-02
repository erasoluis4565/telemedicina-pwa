const recetaService = require("../modules/recetas/receta.service");

const recetaRepository = require("../modules/recetas/receta.repository");
const citaRepository = require("../modules/citas/cita.repository");
const medicoRepository = require("../modules/medicos/medico.repository");

jest.mock("../modules/recetas/receta.repository");
jest.mock("../modules/citas/cita.repository");
jest.mock("../modules/medicos/medico.repository");

describe("Receta Service", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Crear receta", () => {

    test("Debe crear una receta correctamente", async () => {

      citaRepository.obtenerPorId.mockResolvedValue({
        _id: "cita1",
        pacienteId: "paciente1",
        medicoId: {
          _id: "medico1"
        },
        estado: "COMPLETADA",
      });

      medicoRepository.obtenerPorUsuarioId.mockResolvedValue({
        _id: "medico1",
      });

      recetaRepository.obtenerPorCita.mockResolvedValue(null);

      recetaRepository.crear.mockResolvedValue({
        _id: "receta1",
      });

      const resultado = await recetaService.crear(

        {
          citaId: "cita1",
          diagnostico: "Gripe",

          medicamentos: [],

          recomendaciones: "Reposo",

        },

        {
          id: "usuario1",
        }

      );

      expect(resultado._id).toBe("receta1");

    });

    test("Debe fallar si la cita no existe", async () => {

      citaRepository.obtenerPorId.mockResolvedValue(null);

      await expect(

        recetaService.crear(

          { citaId: "1" },

          { id: "usuario1" }

        )

      ).rejects.toThrow(
        "La cita no existe."
      );

    });

    test("Debe fallar si el usuario no es médico", async () => {

      citaRepository.obtenerPorId.mockResolvedValue({
        medicoId: {
          _id: "medico1",
        },
      });

      medicoRepository.obtenerPorUsuarioId.mockResolvedValue(null);

      await expect(

        recetaService.crear(

          { citaId: "1" },

          { id: "usuario1" }

        )

      ).rejects.toThrow(
        "El usuario autenticado no es un médico."
      );

    });

    test("Debe fallar si la cita pertenece a otro médico", async () => {

      citaRepository.obtenerPorId.mockResolvedValue({

        medicoId: {

          _id: {

            toString: () => "medicoA",

          },

        },

      });

      medicoRepository.obtenerPorUsuarioId.mockResolvedValue({

        _id: {

          toString: () => "medicoB",

        },

      });

      await expect(

        recetaService.crear(

          { citaId: "1" },

          { id: "usuario1" }

        )

      ).rejects.toThrow(
        "No puede generar recetas para citas de otro médico."
      );

    });

    test("Debe fallar si la cita no está completada", async () => {

      citaRepository.obtenerPorId.mockResolvedValue({

        medicoId: {
          _id: {
            toString: () => "medico1",
          },
        },

        estado: "PENDIENTE",

      });

      medicoRepository.obtenerPorUsuarioId.mockResolvedValue({

        _id: {
          toString: () => "medico1",
        },

      });

      await expect(

        recetaService.crear(

          { citaId: "1" },

          { id: "usuario1" }

        )

      ).rejects.toThrow(
        "Solo se pueden generar recetas para citas completadas."
      );

    });

    test("Debe fallar si ya existe una receta", async () => {

      citaRepository.obtenerPorId.mockResolvedValue({

        _id: "1",

        pacienteId: "paciente",

        medicoId: {

          _id: {

            toString: () => "medico1",

          },

        },

        estado: "COMPLETADA",

      });

      medicoRepository.obtenerPorUsuarioId.mockResolvedValue({

        _id: {

          toString: () => "medico1",

        },

      });

      recetaRepository.obtenerPorCita.mockResolvedValue({

        _id: "receta",

      });

      await expect(

        recetaService.crear(

          { citaId: "1" },

          { id: "usuario1" }

        )

      ).rejects.toThrow(
        "La cita ya tiene una receta."
      );

    });

  });

  describe("Consultas", () => {

    test("Debe listar recetas", async () => {

      recetaRepository.obtenerTodas.mockResolvedValue([
        {},
        {},
      ]);

      const resultado =
        await recetaService.listar();

      expect(resultado).toHaveLength(2);

    });

    test("Debe listar recetas del paciente", async () => {

      recetaRepository.obtenerPorPaciente.mockResolvedValue([
        {},
      ]);

      const resultado =
        await recetaService.listarMisRecetas("1");

      expect(resultado).toHaveLength(1);

    });

    test("Debe obtener receta por id", async () => {

      recetaRepository.obtenerPorId.mockResolvedValue({
        _id: "1",
      });

      const resultado =
        await recetaService.obtenerPorId("1");

      expect(resultado._id).toBe("1");

    });

    test("Debe actualizar receta", async () => {

      recetaRepository.actualizar.mockResolvedValue({
        estado: "FINALIZADA",
      });

      const resultado =
        await recetaService.actualizar(
          "1",
          { estado: "FINALIZADA" }
        );

      expect(resultado.estado)
        .toBe("FINALIZADA");

    });

    test("Debe eliminar receta", async () => {

      recetaRepository.eliminar.mockResolvedValue({
        _id: "1",
      });

      const resultado =
        await recetaService.eliminar("1");

      expect(resultado._id).toBe("1");

    });

  });

});