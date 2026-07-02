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

const actualizarPerfil = async (
  usuarioId,
  data
) => {

  const datosActualizar = {

    nombre: data.nombre,

    apellido: data.apellido,

    telefono: data.telefono,

  };

  return await repository.actualizar(
    usuarioId,
    datosActualizar
  );

};

const cambiarPassword = async (
  usuarioId,
  data
) => {

  const usuario =
    await repository.obtenerPorId(usuarioId);

  if (!usuario) {
    throw new Error("Usuario no encontrado.");
  }

  const coincide =
    await bcrypt.compare(
      data.passwordActual,
      usuario.passwordHash
    );

  if (!coincide) {
    throw new Error("La contraseña actual es incorrecta.");
  }

  const passwordHash =
    await bcrypt.hash(
      data.passwordNueva,
      10
    );

  return await repository.actualizar(
    usuarioId,
    {
      passwordHash,
    }
  );

};

module.exports = {
  crear,
  listar,
  obtenerPorId,
  obtenerPerfil,
  actualizarPerfil,
  cambiarPassword,
};