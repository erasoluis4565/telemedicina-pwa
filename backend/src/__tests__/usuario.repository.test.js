const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const Usuario = require("../modules/usuarios/usuario.model");
const repository = require("../modules/usuarios/usuario.repository");

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(
        mongoServer.getUri()
    );
});

afterEach(async () => {
    await Usuario.deleteMany();
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe("Usuario Repository", () => {

    it("Debe crear un usuario", async () => {

        const usuario = await repository.crear({
            nombre: "Luis",
            apellido: "Perez",
            email: "luis@test.com",
            telefono: "0999999999",
            fechaNacimiento: new Date("2000-01-01"),
            passwordHash: "123456",
            rol: "PACIENTE"
        });

        expect(usuario._id).toBeDefined();
        expect(usuario.email).toBe("luis@test.com");

    });

    it("Debe obtener todos los usuarios", async () => {

        await repository.crear({
            nombre: "Luis",
            apellido: "Perez",
            email: "luis@test.com",
            telefono: "0999999999",
            fechaNacimiento: new Date("2000-01-01"),
            passwordHash: "123456",
            rol: "PACIENTE"
        });

        const usuarios =
            await repository.obtenerTodos();

        expect(usuarios.length).toBe(1);

    });

    it("Debe obtener un usuario por id", async () => {

        const creado =
            await repository.crear({
                nombre: "Ana",
                apellido: "Lopez",
                email: "ana@test.com",
                telefono: "0999999999",
                fechaNacimiento: new Date("2000-01-01"),
                passwordHash: "123",
                rol: "PACIENTE"
            });

        const usuario =
            await repository.obtenerPorId(
                creado._id
            );

        expect(usuario.email)
            .toBe("ana@test.com");

    });

    it("Debe actualizar un usuario", async () => {

        const creado =
            await repository.crear({
                nombre: "Pedro",
                apellido: "Lopez",
                email: "pedro@test.com",
                telefono: "0999999999",
                fechaNacimiento: new Date("2000-01-01"),
                passwordHash: "123",
                rol: "PACIENTE"
            });

        const actualizado =
            await repository.actualizar(
                creado._id,
                {
                    nombre: "Carlos"
                }
            );

        expect(actualizado.nombre)
            .toBe("Carlos");

    });

    it("Debe eliminar un usuario", async () => {

        const creado =
            await repository.crear({
                nombre: "Mario",
                apellido: "Perez",
                email: "mario@test.com",
                telefono: "0999999999",
                fechaNacimiento: new Date("2000-01-01"),
                passwordHash: "123",
                rol: "PACIENTE"
            });

        await repository.eliminar(
            creado._id
        );

        const usuario =
            await repository.obtenerPorId(
                creado._id
            );

        expect(usuario).toBeNull();

    });

    it("Debe buscar un usuario por email", async () => {

        await repository.crear({
            nombre: "Jose",
            apellido: "Perez",
            email: "correo@test.com",
            telefono: "0999999999",
            fechaNacimiento: new Date("2000-01-01"),
            passwordHash: "123",
            rol: "PACIENTE"
        });

        const usuario =
            await repository.obtenerPorEmail(
                "correo@test.com"
            );

        expect(usuario).not.toBeNull();
        expect(usuario.email)
            .toBe("correo@test.com");

    });

});