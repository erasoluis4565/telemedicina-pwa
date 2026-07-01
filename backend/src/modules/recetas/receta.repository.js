const Receta = require("./receta.model");

const obtenerTodas = async () => {

  return await Receta.find()
    .populate("pacienteId", "nombre apellido email")
    .populate({
      path: "medicoId",
      populate: {
        path: "usuarioId",
        select: "nombre apellido email",
      },
    })
    .populate("citaId");

};

const obtenerPorPaciente = async (pacienteId) => {

  return await Receta.find({
    pacienteId,
  })
    .populate("pacienteId", "nombre apellido email")
    .populate({
      path: "medicoId",
      populate: {
        path: "usuarioId",
        select: "nombre apellido email",
      },
    })
    .populate("citaId")
    .sort({
      createdAt: -1,
    });

};

const obtenerPorId = async (id) => {

  return await Receta.findById(id)
    .populate("pacienteId", "nombre apellido email")
    .populate({
      path: "medicoId",
      populate: {
        path: "usuarioId",
        select: "nombre apellido email",
      },
    })
    .populate("citaId");

};

const crear = async (data) => {
  return await Receta.create(data);
};

const actualizar = async (id, data) => {

  return await Receta.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

};

const eliminar = async (id) => {
  return await Receta.findByIdAndDelete(id);
};

const obtenerPorCita = async (citaId) => {
  return await Receta.findOne({ citaId });
};

module.exports = {
  obtenerTodas,
  obtenerPorPaciente,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
  obtenerPorCita,
};