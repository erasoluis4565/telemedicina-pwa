const service = require("./receta.service");

const crear = async (req, res, next) => {
  try {

    const receta = await service.crear(
      req.body,
      req.usuario
    );

    res.status(201).json({
      mensaje: "Receta creada correctamente.",
      data: receta,
    });

  } catch (error) {
    next(error);
  }
};

const listar = async (req, res, next) => {
  try {

    const recetas = await service.listar();

    res.json({
      data: recetas,
    });

  } catch (error) {
    next(error);
  }
};

const misRecetas = async (req, res, next) => {

  try {

    const recetas = await service.listarMisRecetas(
      req.usuario.id
    );

    res.json({
      data: recetas,
    });

  } catch (error) {
    next(error);
  }

};

const obtenerPorId = async (req, res, next) => {
  try {

    const receta = await service.obtenerPorId(req.params.id);

    if (!receta) {
      return res.status(404).json({
        mensaje: "Receta no encontrada.",
      });
    }

    res.json({
      data: receta,
    });

  } catch (error) {
    next(error);
  }
};

const actualizar = async (req, res, next) => {
  try {

    const receta = await service.actualizar(
      req.params.id,
      req.body
    );

    res.json({
      mensaje: "Receta actualizada correctamente.",
      data: receta,
    });

  } catch (error) {
    next(error);
  }
};

const eliminar = async (req, res, next) => {
  try {

    await service.eliminar(req.params.id);

    res.json({
      mensaje: "Receta eliminada correctamente.",
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  crear,
  listar,
  misRecetas,
  obtenerPorId,
  actualizar,
  eliminar,
};