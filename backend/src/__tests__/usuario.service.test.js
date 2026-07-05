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

  describe("Actualizar perfil", () => {

    test("Debe actualizar el perfil correctamente", async () => {

      usuarioRepository.actualizar.mockResolvedValue({
        nombre: "Carlos",
        apellido: "Perez",
        telefono: "0999999999"
      });

      const resultado =
        await usuarioService.actualizarPerfil(
          "1",
          {
            nombre: "Carlos",
            apellido: "Perez",
            telefono: "0999999999"
          }
        );

      expect(usuarioRepository.actualizar)
        .toHaveBeenCalledWith(
          "1",
          {
            nombre: "Carlos",
            apellido: "Perez",
            telefono: "0999999999"
          }
        );

      expect(resultado.nombre).toBe("Carlos");

    });

  });

  describe("Cambiar contraseña", () => {

    test("Debe cambiar la contraseña correctamente", async () => {

      usuarioRepository.obtenerPorId.mockResolvedValue({
        passwordHash: "hashViejo"
      });

      bcrypt.compare.mockResolvedValue(true);

      bcrypt.hash.mockResolvedValue("hashNuevo");

      usuarioRepository.actualizar.mockResolvedValue({});

      await usuarioService.cambiarPassword(
        "1",
        {
          passwordActual: "123456",
          passwordNueva: "654321"
        }
      );

      expect(usuarioRepository.actualizar)
        .toHaveBeenCalledWith(
          "1",
          {
            passwordHash: "hashNuevo"
          }
        );

    });

    test("Debe lanzar error si el usuario no existe", async () => {

      usuarioRepository.obtenerPorId.mockResolvedValue(null);

      await expect(
        usuarioService.cambiarPassword(
          "1",
          {
            passwordActual: "123",
            passwordNueva: "456"
          }
        )
      ).rejects.toThrow(
        "Usuario no encontrado."
      );

    });

    test("Debe lanzar error si la contraseña actual es incorrecta", async () => {

      usuarioRepository.obtenerPorId.mockResolvedValue({
        passwordHash: "hashViejo"
      });

      bcrypt.compare.mockResolvedValue(false);

      await expect(
        usuarioService.cambiarPassword(
          "1",
          {
            passwordActual: "incorrecta",
            passwordNueva: "nueva"
          }
        )
      ).rejects.toThrow(
        "La contraseña actual es incorrecta."
      );

    });

  });

});