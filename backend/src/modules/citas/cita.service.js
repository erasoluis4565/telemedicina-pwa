const repository = require("./cita.repository");

const crear = async (data) => {

  const existe = await repository.buscarCitaDuplicada(
    data.medicoId,
    data.fecha,
    data.hora
  );

  if (existe) {
    throw new Error(
      "El médico ya tiene una cita en ese horario."
    );
  }

  return await repository.crear(data);

};

const listar = async () => {
  return await repository.obtenerTodas();
};

const obtenerPorId = async (id) => {
  return await repository.obtenerPorId(id);
};

const actualizar = async (id, data) => {
  return await repository.actualizar(id, data);
};

const eliminar = async (id) => {
  return await repository.eliminar(id);
};

module.exports = {
  crear,
  listar,
  obtenerPorId,
  actualizar,
  eliminar,
};