const recetaRepository = require("./receta.repository");
const citaRepository = require("../citas/cita.repository");
const medicoRepository = require("../medicos/medico.repository");

const crear = async (data, usuarioLogueado) => {

  // Verificar que exista la cita
  const cita = await citaRepository.obtenerPorId(
    data.citaId
  );

  if (!cita) {
    throw new Error(
      "La cita no existe."
    );
  }

  // Buscar el médico asociado al usuario autenticado
const medico = await medicoRepository.obtenerPorUsuarioId(
  usuarioLogueado.id
);

console.log("=========== CITA ===========");
console.log(cita);

console.log("=========== MEDICO ===========");
console.log(medico);

if (!medico) {
  throw new Error(
    "El usuario autenticado no es un médico."
  );
}

// Verificar que la cita pertenece a ese médico
if (
  !cita.medicoId ||
  cita.medicoId._id.toString() !== medico._id.toString()
) {
  throw new Error(
    "No puede generar recetas para citas de otro médico."
  );
}

  // Verificar que la cita esté completada
  if (cita.estado !== "COMPLETADA") {
    throw new Error(
      "Solo se pueden generar recetas para citas completadas."
    );
  }

  // Verificar que no exista otra receta para la misma cita
  const existe = await recetaRepository.obtenerPorCita(
    data.citaId
  );

  if (existe) {
    throw new Error(
      "La cita ya tiene una receta."
    );
  }

  // Construir la receta usando los datos de la cita
  const receta = {
    citaId: cita._id,
    pacienteId: cita.pacienteId,
    medicoId: cita.medicoId,
    diagnostico: data.diagnostico,
    medicamentos: data.medicamentos,
    recomendaciones: data.recomendaciones,
  };

  return await recetaRepository.crear(receta);

};

const listar = async () => {
  return await recetaRepository.obtenerTodas();
};

const listarMisRecetas = async (usuarioId) => {

  return await recetaRepository.obtenerPorPaciente(
    usuarioId
  );

};

const obtenerPorId = async (id) => {
  return await recetaRepository.obtenerPorId(id);
};

const actualizar = async (id, data) => {
  return await recetaRepository.actualizar(
    id,
    data
  );
};

const eliminar = async (id) => {
  return await recetaRepository.eliminar(id);
};

module.exports = {
  crear,
  listar,
  listarMisRecetas,
  obtenerPorId,
  actualizar,
  eliminar,
};