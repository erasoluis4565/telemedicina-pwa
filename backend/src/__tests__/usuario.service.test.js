const bcrypt = require("bcrypt");

const usuarioService = require("../modules/usuarios/usuario.service");
const usuarioRepository = require("../modules/usuarios/usuario.repository");

jest.mock("../modules/usuarios/usuario.repository");
jest.mock("bcrypt");

describe("Usuario Service", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Crear usuario", () => {

    test("Debe crear un usuario correctamente", async () => {

      usuarioRepository.obtenerPorEmail.mockResolvedValue(null);

      bcrypt.hash.mockResolvedValue("passwordEncriptado");

      usuarioRepository.crear.mockResolvedValue({
        _id: "1",
        nombre: "Luis",
        apellido: "Perez",
        email: "luis@test.com",
      });

      const resultado = await usuarioService.crear({
        nombre: "Luis",
        apellido: "Perez",
        email: "luis@test.com",
        telefono: "0999999999",
        fechaNacimiento: "2000-01-01",
        password: "123456",
      });

      expect(resultado.nombre).toBe("Luis");

      expect(usuarioRepository.crear).toHaveBeenCalled();

    });

    test("Debe lanzar error si el correo ya existe", async () => {

      usuarioRepository.obtenerPorEmail.mockResolvedValue({
        email: "luis@test.com",
      });

      await expect(

        usuarioService.crear({

          email: "luis@test.com",

        })

      ).rejects.toThrow(
        "El correo ya está registrado."
      );

    });

  });

  describe("Obtener usuarios", () => {

    test("Debe listar usuarios", async () => {

      usuarioRepository.obtenerTodos.mockResolvedValue([
        { nombre: "Luis" },
        { nombre: "Ana" },
      ]);

      const resultado =
        await usuarioService.listar();

      expect(resultado).toHaveLength(2);

    });

    test("Debe obtener usuario por id", async () => {

      usuarioRepository.obtenerPorId.mockResolvedValue({
        _id: "1",
        nombre: "Luis",
      });

      const resultado =
        await usuarioService.obtenerPorId("1");

      expect(resultado.nombre).toBe("Luis");

    });

    test("Debe obtener perfil", async () => {

      usuarioRepository.obtenerPorId.mockResolvedValue({
        _id: "1",
        nombre: "Luis",
      });

      const resultado =
        await usuarioService.obtenerPerfil("1");

      expect(resultado.nombre).toBe("Luis");

    });

  });

});