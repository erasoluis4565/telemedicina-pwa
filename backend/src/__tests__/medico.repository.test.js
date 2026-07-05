const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const Usuario = require("../modules/usuarios/usuario.model");
const Medico = require("../modules/medicos/medico.model");
const repository = require("../modules/medicos/medico.repository");

let mongoServer;

beforeAll(async () => {

    mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(
        mongoServer.getUri()
    );

});

afterEach(async () => {

    await Usuario.deleteMany();
    await Medico.deleteMany();

});

afterAll(async () => {

    await mongoose.disconnect();
    await mongoServer.stop();

});

describe("Medico Repository", () => {

    it("Debe crear un médico", async () => {

        const usuario = await Usuario.create({
            nombre: "Luis",
            apellido: "Perez",
            email: "luis@test.com",
            telefono: "0999999999",
            fechaNacimiento: new Date("2000-01-01"),
            passwordHash: "123456",
            rol: "MEDICO"
        });

        const medico = await repository.crear({
            usuarioId: usuario._id,
            especialidad: "Cardiología",
            numeroLicencia: "MED-001"
        });

        expect(medico._id).toBeDefined();
        expect(medico.especialidad).toBe("Cardiología");

    });

    it("Debe obtener todos los médicos", async () => {

        const usuario = await Usuario.create({
            nombre: "Ana",
            apellido: "Lopez",
            email: "ana@test.com",
            telefono: "0999999999",
            fechaNacimiento: new Date("2000-01-01"),
            passwordHash: "123456",
            rol: "MEDICO"
        });

        await repository.crear({
            usuarioId: usuario._id,
            especialidad: "Pediatría",
            numeroLicencia: "MED-002"
        });

        const medicos =
            await repository.obtenerTodos();

        expect(medicos.length).toBe(1);

    });

    it("Debe obtener un médico por id", async () => {

        const usuario = await Usuario.create({
            nombre: "Carlos",
            apellido: "Perez",
            email: "carlos@test.com",
            telefono: "0999999999",
            fechaNacimiento: new Date("2000-01-01"),
            passwordHash: "123456",
            rol: "MEDICO"
        });

        const creado =
            await repository.crear({
                usuarioId: usuario._id,
                especialidad: "Neurología",
                numeroLicencia: "MED-003"
            });

        const medico =
            await repository.obtenerPorId(
                creado._id
            );

        expect(medico.numeroLicencia)
            .toBe("MED-003");

    });

    it("Debe actualizar un médico", async () => {

        const usuario = await Usuario.create({
            nombre: "Pedro",
            apellido: "Perez",
            email: "pedro@test.com",
            telefono: "0999999999",
            fechaNacimiento: new Date("2000-01-01"),
            passwordHash: "123456",
            rol: "MEDICO"
        });

        const creado =
            await repository.crear({
                usuarioId: usuario._id,
                especialidad: "General",
                numeroLicencia: "MED-004"
            });

        const actualizado =
            await repository.actualizar(
                creado._id,
                {
                    especialidad: "Dermatología"
                }
            );

        expect(actualizado.especialidad)
            .toBe("Dermatología");

    });

    it("Debe eliminar un médico", async () => {

        const usuario = await Usuario.create({
            nombre: "Mario",
            apellido: "Perez",
            email: "mario@test.com",
            telefono: "0999999999",
            fechaNacimiento: new Date("2000-01-01"),
            passwordHash: "123456",
            rol: "MEDICO"
        });

        const creado =
            await repository.crear({
                usuarioId: usuario._id,
                especialidad: "Traumatología",
                numeroLicencia: "MED-005"
            });

        await repository.eliminar(
            creado._id
        );

        const medico =
            await repository.obtenerPorId(
                creado._id
            );

        expect(medico).toBeNull();

    });

    it("Debe obtener un médico por usuarioId", async () => {

        const usuario = await Usuario.create({
            nombre: "Jose",
            apellido: "Perez",
            email: "jose@test.com",
            telefono: "0999999999",
            fechaNacimiento: new Date("2000-01-01"),
            passwordHash: "123456",
            rol: "MEDICO"
        });

        await repository.crear({
            usuarioId: usuario._id,
            especialidad: "Oncología",
            numeroLicencia: "MED-006"
        });

        const medico =
            await repository.obtenerPorUsuarioId(
                usuario._id
            );

        expect(medico).not.toBeNull();
        expect(medico.numeroLicencia)
            .toBe("MED-006");

    });

});