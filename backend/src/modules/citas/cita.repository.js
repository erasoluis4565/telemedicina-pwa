const Cita = require("./cita.model");

const obtenerTodas = async () => {
  return await Cita.find()
    .populate("pacienteId", "nombre apellido correo")
    .populate({
      path: "medicoId",
      populate: {
        path: "usuarioId",
        select: "nombre apellido correo",
      },
    });
};

const obtenerPorId = async (id) => {
  return await Cita.findById(id)
    .populate("pacienteId", "nombre apellido email")
    .populate({
      path: "medicoId",
      populate: {
        path: "usuarioId",
        select: "nombre apellido email",
      },
    });
};

const crear = async (data) => {
  return await Cita.create(data);
};

const actualizar = async (id, data) => {
  return await Cita.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

const eliminar = async (id) => {
  return await Cita.findByIdAndDelete(id);
};

const buscarCitaDuplicada = async (
  medicoId,
  fecha,
  hora
) => {
  return await Cita.findOne({
    medicoId,
    fecha,
    hora,
    estado: {
      $in: ["PENDIENTE", "CONFIRMADA"],
    },
  });
};

module.exports = {
  obtenerTodas,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
  buscarCitaDuplicada,
};