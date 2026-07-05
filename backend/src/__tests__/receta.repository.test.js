const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const Usuario = require("../modules/usuarios/usuario.model");
const Medico = require("../modules/medicos/medico.model");
const Cita = require("../modules/citas/cita.model");
const Receta = require("../modules/recetas/receta.model");

const repository = require("../modules/recetas/receta.repository");

let mongoServer;

let paciente;
let usuarioMedico;
let medico;
let cita;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(
    mongoServer.getUri()
  );
});

afterEach(async () => {
  await Receta.deleteMany();
  await Cita.deleteMany();
  await Medico.deleteMany();
  await Usuario.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

const crearDatosBase = async () => {

  paciente = await Usuario.create({
    nombre: "Luis",
    apellido: "Perez",
    email: "paciente@test.com",
    telefono: "099999999",
    fechaNacimiento: new Date("2000-01-01"),
    passwordHash: "123",
    rol: "PACIENTE"
  });

  usuarioMedico = await Usuario.create({
    nombre: "Juan",
    apellido: "Medico",
    email: "medico@test.com",
    telefono: "099999999",
    fechaNacimiento: new Date("1990-01-01"),
    passwordHash: "123",
    rol: "MEDICO"
  });

  medico = await Medico.create({
    usuarioId: usuarioMedico._id,
    especialidad: "Cardiología",
    numeroLicencia: "ABC123"
  });

  cita = await Cita.create({
    pacienteId: paciente._id,
    medicoId: medico._id,
    fecha: new Date(),
    hora: "10:00",
    motivo: "Control",
    estado: "COMPLETADA"
  });

};

describe("Receta Repository", () => {

  beforeEach(async () => {
    await crearDatosBase();
  });

  it("Debe crear una receta", async () => {

    const receta = await repository.crear({
      pacienteId: paciente._id,
      medicoId: medico._id,
      citaId: cita._id,
      diagnostico: "Gripe",
      medicamentos: [
        {
          nombre: "Paracetamol",
          dosis: "500mg",
          frecuencia: "8 horas",
          duracion: "5 días"
        }
      ]
    });

    expect(receta._id).toBeDefined();

  });

  it("Debe obtener todas las recetas", async () => {

    await repository.crear({
      pacienteId: paciente._id,
      medicoId: medico._id,
      citaId: cita._id,
      diagnostico: "Prueba"
    });

    const recetas =
      await repository.obtenerTodas();

    expect(recetas.length).toBe(1);

  });

  it("Debe obtener recetas por paciente", async () => {

    await repository.crear({
      pacienteId: paciente._id,
      medicoId: medico._id,
      citaId: cita._id,
      diagnostico: "Control"
    });

    const recetas =
      await repository.obtenerPorPaciente(
        paciente._id
      );

    expect(recetas.length).toBe(1);

  });

  it("Debe obtener receta por id", async () => {

    const creada =
      await repository.crear({
        pacienteId: paciente._id,
        medicoId: medico._id,
        citaId: cita._id,
        diagnostico: "Dolor"
      });

    const receta =
      await repository.obtenerPorId(
        creada._id
      );

    expect(receta.diagnostico)
      .toBe("Dolor");

  });

  it("Debe actualizar una receta", async () => {

    const creada =
      await repository.crear({
        pacienteId: paciente._id,
        medicoId: medico._id,
        citaId: cita._id,
        diagnostico: "Inicial"
      });

    const actualizada =
      await repository.actualizar(
        creada._id,
        {
          diagnostico: "Actualizado"
        }
      );

    expect(actualizada.diagnostico)
      .toBe("Actualizado");

  });

  it("Debe eliminar una receta", async () => {

    const creada =
      await repository.crear({
        pacienteId: paciente._id,
        medicoId: medico._id,
        citaId: cita._id,
        diagnostico: "Eliminar"
      });

    await repository.eliminar(
      creada._id
    );

    const receta =
      await repository.obtenerPorId(
        creada._id
      );

    expect(receta).toBeNull();

  });

  it("Debe buscar una receta por cita", async () => {

    await repository.crear({
      pacienteId: paciente._id,
      medicoId: medico._id,
      citaId: cita._id,
      diagnostico: "Consulta"
    });

    const receta =
      await repository.obtenerPorCita(
        cita._id
      );

    expect(receta).not.toBeNull();
    expect(receta.citaId.toString())
      .toBe(cita._id.toString());

  });

});