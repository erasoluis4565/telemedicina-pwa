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

const listarMisCitas = async (usuarioId) => {

  return await repository.obtenerPorPaciente(
    usuarioId
  );

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

const obtenerHorariosDisponibles = async (
  medicoId,
  fecha
) => {

  const horariosBase = [
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00"
  ];

  const horariosOcupados =
    await repository.obtenerHorariosOcupados(
      medicoId,
      fecha
    );

  const horasOcupadas =
    horariosOcupados.map(
      (cita) => cita.hora
    );

  return horariosBase.filter(
    (hora) => !horasOcupadas.includes(hora)
  );

};

module.exports = {
  crear,
  listar,
  listarMisCitas,
  obtenerPorId,
  actualizar,
  eliminar,
  obtenerHorariosDisponibles,
};