const repository = require("./medico.repository");

const crear = async (data) => {
  return await repository.crear(data);
};

const listar = async () => {
  return await repository.obtenerTodos();
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