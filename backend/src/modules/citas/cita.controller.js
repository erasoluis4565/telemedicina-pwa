const service = require("./cita.service");

const crear = async (req, res, next) => {
  try {

    const datos = {
      ...req.body,
      pacienteId: req.usuario.id,
    };

    const cita = await service.crear(datos);

    res.status(201).json({
      mensaje: "Cita creada correctamente.",
      data: cita,
    });

  } catch (error) {
    next(error);
  }
};

const listar = async (req, res, next) => {
  try {

    const citas = await service.listar();

    res.json({
      data: citas,
    });

  } catch (error) {
    next(error);
  }
};

const misCitas = async (req, res, next) => {

  try {

    const citas = await service.listarMisCitas(
      req.usuario.id
    );

    res.json({
      data: citas,
    });

  } catch (error) {
    next(error);
  }

};

const obtenerPorId = async (req, res, next) => {

  try {

    const cita = await service.obtenerPorId(req.params.id);

    if (!cita) {

      return res.status(404).json({
        mensaje: "Cita no encontrada.",
      });

    }

    res.json({
      data: cita,
    });

  } catch (error) {
    next(error);
  }

};

const actualizar = async (req, res, next) => {

  try {

    const cita = await service.actualizar(
      req.params.id,
      req.body
    );

    res.json({
      mensaje: "Cita actualizada correctamente.",
      data: cita,
    });

  } catch (error) {
    next(error);
  }

};

const eliminar = async (req, res, next) => {

  try {

    await service.eliminar(req.params.id);

    res.json({
      mensaje: "Cita eliminada correctamente.",
    });

  } catch (error) {
    next(error);
  }

};

const obtenerHorariosDisponibles = async (
  req,
  res,
  next
) => {

  try {

    const {
      medicoId,
      fecha,
    } = req.query;

    const horarios =
      await service.obtenerHorariosDisponibles(
        medicoId,
        fecha
      );

    res.json({
      data: horarios,
    });

  } catch (error) {

    next(error);

  }

};

module.exports = {
  crear,
  listar,
  misCitas,
  obtenerPorId,
  actualizar,
  eliminar,
  obtenerHorariosDisponibles,
};