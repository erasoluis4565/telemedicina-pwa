const Medico = require("./medico.model");

const obtenerTodos = async () => {
  return await Medico.find()
    .populate("usuarioId", "nombre apellido email");
};

const obtenerPorId = async (id) => {
  return await Medico.findById(id)
    .populate("usuarioId", "nombre apellido email");
};

const crear = async (data) => {
  return await Medico.create(data);
};

const actualizar = async (id, data) => {
  return await Medico.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

const eliminar = async (id) => {
  return await Medico.findByIdAndDelete(id);
};

const obtenerPorUsuarioId = async (usuarioId) => {
  return await Medico.findOne({ usuarioId });
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
  obtenerPorUsuarioId,
};