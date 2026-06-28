const service = require("./medico.service");

const crear = async (req, res, next) => {
  try {
    const medico = await service.crear(req.body);

    res.status(201).json({
      mensaje: "Médico creado correctamente.",
      data: medico,
    });

  } catch (error) {
    next(error);
  }
};

const listar = async (req, res, next) => {
  try {
    const medicos = await service.listar();

    res.json({
      data: medicos,
    });

  } catch (error) {
    next(error);
  }
};

const obtenerPorId = async (req, res, next) => {
  try {
    const medico = await service.obtenerPorId(req.params.id);

    if (!medico) {
      return res.status(404).json({
        mensaje: "Médico no encontrado.",
      });
    }

    res.json({
      data: medico,
    });

  } catch (error) {
    next(error);
  }
};

const actualizar = async (req, res, next) => {
  try {
    const medico = await service.actualizar(
      req.params.id,
      req.body
    );

    res.json({
      mensaje: "Médico actualizado correctamente.",
      data: medico,
    });

  } catch (error) {
    next(error);
  }
};

const eliminar = async (req, res, next) => {
  try {
    await service.eliminar(req.params.id);

    res.json({
      mensaje: "Médico eliminado correctamente.",
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  crear,
  listar,
  obtenerPorId,
  actualizar,
  eliminar,
};