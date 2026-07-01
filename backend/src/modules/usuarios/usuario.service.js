const bcrypt = require("bcrypt");
const repository = require("./usuario.repository");

const crear = async (data) => {

  const existe = await repository.obtenerPorEmail(data.email);

  if (existe) {
    throw new Error("El correo ya está registrado.");
  }

  // Encriptar la contraseña
  const passwordHash = await bcrypt.hash(
    data.password,
    10
  );

  // Crear el objeto que se guardará
  const nuevoUsuario = {
    nombre: data.nombre,
    apellido: data.apellido,
    email: data.email,
    telefono: data.telefono,
    fechaNacimiento: data.fechaNacimiento,
    passwordHash,
    rol: data.rol || "PACIENTE",
  };

  return await repository.crear(nuevoUsuario);
};

const listar = async () => {
  return await repository.obtenerTodos();
};

const obtenerPorId = async (id) => {
  return await repository.obtenerPorId(id);
};

const obtenerPerfil = async (usuarioId) => {

  return await repository.obtenerPorId(usuarioId);

};

module.exports = {
  crear,
  listar,
  obtenerPorId,
  obtenerPerfil,
};