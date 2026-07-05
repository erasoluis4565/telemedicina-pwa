const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const Usuario = require("../modules/usuarios/usuario.model");
const Medico = require("../modules/medicos/medico.model");
const Cita = require("../modules/citas/cita.model");

const repository = require("../modules/citas/cita.repository");

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(
        mongoServer.getUri()
    );
});

afterEach(async () => {
    await Cita.deleteMany();
    await Medico.deleteMany();
    await Usuario.deleteMany();
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe("Cita Repository", () => {

    let paciente;
    let usuarioMedico;
    let medico;

    beforeEach(async () => {

        paciente = await Usuario.create({
            nombre: "Paciente",
            apellido: "Uno",
            email: "paciente@test.com",
            telefono: "0999999999",
            fechaNacimiento: new Date("2000-01-01"),
            passwordHash: "123",
            rol: "PACIENTE"
        });

        usuarioMedico = await Usuario.create({
            nombre: "Doctor",
            apellido: "House",
            email: "doctor@test.com",
            telefono: "0999999998",
            fechaNacimiento: new Date("1980-01-01"),
            passwordHash: "123",
            rol: "MEDICO"
        });

        medico = await Medico.create({
            usuarioId: usuarioMedico._id,
            especialidad: "Cardiología",
            numeroLicencia: "MED001"
        });

    });

    it("Debe crear una cita", async () => {

        const cita = await repository.crear({
            pacienteId: paciente._id,
            medicoId: medico._id,
            fecha: new Date(),
            hora: "10:00",
            motivo: "Dolor de pecho"
        });

        expect(cita._id).toBeDefined();

    });

    it("Debe obtener todas las citas", async () => {

        await repository.crear({
            pacienteId: paciente._id,
            medicoId: medico._id,
            fecha: new Date(),
            hora: "10:00",
            motivo: "Consulta"
        });

        const citas =
            await repository.obtenerTodas();

        expect(citas.length).toBe(1);

    });

    it("Debe obtener una cita por id", async () => {

        const creada =
            await repository.crear({
                pacienteId: paciente._id,
                medicoId: medico._id,
                fecha: new Date(),
                hora: "11:00",
                motivo: "Control"
            });

        const cita =
            await repository.obtenerPorId(
                creada._id
            );

        expect(cita._id.toString())
            .toBe(creada._id.toString());

    });

    it("Debe actualizar una cita", async () => {

        const creada =
            await repository.crear({
                pacienteId: paciente._id,
                medicoId: medico._id,
                fecha: new Date(),
                hora: "11:00",
                motivo: "Control"
            });

        const actualizada =
            await repository.actualizar(
                creada._id,
                {
                    estado: "COMPLETADA"
                }
            );

        expect(actualizada.estado)
            .toBe("COMPLETADA");

    });

    it("Debe eliminar una cita", async () => {

        const creada =
            await repository.crear({
                pacienteId: paciente._id,
                medicoId: medico._id,
                fecha: new Date(),
                hora: "11:00",
                motivo: "Control"
            });

        await repository.eliminar(
            creada._id
        );

        const cita =
            await repository.obtenerPorId(
                creada._id
            );

        expect(cita).toBeNull();

    });

    it("Debe obtener citas por paciente", async () => {

        await repository.crear({
            pacienteId: paciente._id,
            medicoId: medico._id,
            fecha: new Date(),
            hora: "12:00",
            motivo: "Consulta"
        });

        const citas =
            await repository.obtenerPorPaciente(
                paciente._id
            );

        expect(citas.length)
            .toBe(1);

    });

    it("Debe buscar una cita duplicada", async () => {

        const fecha = new Date("2026-08-01");

        await repository.crear({
            pacienteId: paciente._id,
            medicoId: medico._id,
            fecha,
            hora: "09:00",
            motivo: "Consulta",
            estado: "PENDIENTE"
        });

        const cita =
            await repository.buscarCitaDuplicada(
                medico._id,
                fecha,
                "09:00"
            );

        expect(cita).not.toBeNull();
        expect(cita.hora).toBe("09:00");

    });

    it("Debe obtener horarios ocupados de un médico", async () => {

        const fecha = new Date("2026-08-02");

        await repository.crear({
            pacienteId: paciente._id,
            medicoId: medico._id,
            fecha,
            hora: "10:00",
            motivo: "Consulta",
            estado: "CONFIRMADA"
        });

        await repository.crear({
            pacienteId: paciente._id,
            medicoId: medico._id,
            fecha,
            hora: "11:00",
            motivo: "Control",
            estado: "COMPLETADA"
        });

        const horarios =
            await repository.obtenerHorariosOcupados(
                medico._id,
                fecha
            );

        expect(horarios.length).toBe(2);
        expect(horarios[0].hora).toBeDefined();

    });

});