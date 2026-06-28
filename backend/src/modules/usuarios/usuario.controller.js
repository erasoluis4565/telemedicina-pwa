const service = require("./usuario.service");

const crear = async (req, res, next) => {
  try {
    const usuario = await service.crear(req.body);

    res.status(201).json({
      mensaje: "Usuario creado correctamente.",
      data: usuario,
    });
  } catch (error) {
    next(error);
  }
};

const listar = async (req, res, next) => {
  try {
    const usuarios = await service.listar();

    res.json({
      data: usuarios,
    });
  } catch (error) {
    next(error);
  }
};

const obtenerPorId = async (req, res, next) => {
  try {
    const usuario = await service.obtenerPorId(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado.",
      });
    }

    res.json({
      data: usuario,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  crear,
  listar,
  obtenerPorId,
};