const Usuario = require("./usuario.model");

const crear = async (data) => {
  return await Usuario.create(data);
};

const obtenerTodos = async () => {
  return await Usuario.find();
};

const obtenerPorId = async (id) => {
  return await Usuario.findById(id);
};

const obtenerPorEmail = async (email) => {
  return await Usuario.findOne({ email });
};

const actualizar = async (id, data) => {
  return await Usuario.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

const eliminar = async (id) => {
  return await Usuario.findByIdAndDelete(id);
};

module.exports = {
  crear,
  obtenerTodos,
  obtenerPorId,
  obtenerPorEmail,
  actualizar,
  eliminar,
};