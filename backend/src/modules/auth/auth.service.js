const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usuarioRepository = require("../usuarios/usuario.repository");

const registrar = async (data) => {

  const existe = await usuarioRepository.obtenerPorEmail(data.email);

  if (existe) {
    throw new Error("El correo ya está registrado.");
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const usuario = await usuarioRepository.crear({
    nombre: data.nombre,
    apellido: data.apellido,
    email: data.email,
    telefono: data.telefono,
    fechaNacimiento: data.fechaNacimiento,
    passwordHash,
    rol: "PACIENTE",
  });

  return usuario;
};

const login = async ({ email, password }) => {

  const usuario = await usuarioRepository.obtenerPorEmail(email);

  if (!usuario) {
    throw new Error("Credenciales incorrectas.");
  }

  const coincide = await bcrypt.compare(
    password,
    usuario.passwordHash
  );

  if (!coincide) {
    throw new Error("Credenciales incorrectas.");
  }

  const token = jwt.sign(
    {
      id: usuario._id,
      rol: usuario.rol,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return {
    usuario,
    token,
  };
};

module.exports = {
  registrar,
  login,
};