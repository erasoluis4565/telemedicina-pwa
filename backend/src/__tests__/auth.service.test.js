process.env.JWT_SECRET = "test-secret";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authService = require("../modules/auth/auth.service");
const usuarioRepository = require("../modules/usuarios/usuario.repository");

jest.mock("../modules/usuarios/usuario.repository");

describe("Auth Service", () => {

  beforeEach(() => {

    jest.clearAllMocks();

  });

  describe("Registrar usuario", () => {

    test("Debe registrar un nuevo usuario correctamente", async () => {

      usuarioRepository.obtenerPorEmail.mockResolvedValue(null);

      usuarioRepository.crear.mockResolvedValue({
        _id: "123",
        nombre: "Luis",
        apellido: "Perez",
        email: "luis@test.com",
      });

      const resultado = await authService.registrar({
        nombre: "Luis",
        apellido: "Perez",
        email: "luis@test.com",
        telefono: "0999999999",
        fechaNacimiento: "2000-01-01",
        password: "123456",
      });

      expect(resultado.nombre).toBe("Luis");

      expect(usuarioRepository.crear).toHaveBeenCalledTimes(1);

    });

    test("Debe lanzar error si el correo ya existe", async () => {

      usuarioRepository.obtenerPorEmail.mockResolvedValue({
        email: "luis@test.com",
      });

      await expect(

        authService.registrar({

          nombre: "Luis",

          apellido: "Perez",

          email: "luis@test.com",

          telefono: "099999999",

          fechaNacimiento: "2000-01-01",

          password: "123456",

        })

      ).rejects.toThrow("El correo ya está registrado.");

    });

    test("Debe iniciar sesión correctamente", async () => {

      const passwordHash = await bcrypt.hash("123456", 10);

      usuarioRepository.obtenerPorEmail.mockResolvedValue({

        _id: "1",

        email: "luis@test.com",

        rol: "PACIENTE",

        passwordHash,

      });

      const resultado = await authService.login({

        email: "luis@test.com",

        password: "123456",

      });

      expect(resultado.token).toBeDefined();

      expect(resultado.usuario.email).toBe("luis@test.com");

    });

    test("Debe fallar si el usuario no existe", async () => {

      usuarioRepository.obtenerPorEmail.mockResolvedValue(null);

      await expect(

        authService.login({

          email: "no@test.com",

          password: "123456",

        })

      ).rejects.toThrow("Credenciales incorrectas.");

    });

    test("Debe fallar si la contraseña es incorrecta", async () => {

      const passwordHash = await bcrypt.hash("123456", 10);

      usuarioRepository.obtenerPorEmail.mockResolvedValue({

        email: "luis@test.com",

        passwordHash,

        rol: "PACIENTE",

      });

      await expect(

        authService.login({

          email: "luis@test.com",

          password: "654321",

        })

      ).rejects.toThrow("Credenciales incorrectas");

    });

  });

});