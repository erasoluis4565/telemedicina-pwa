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

const perfil = async (req, res, next) => {

  try {

    const usuario = await service.obtenerPerfil(
      req.usuario.id
    );

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado.",
      });
    }

    const { passwordHash, ...usuarioSinPassword } =
      usuario.toObject();

    res.json({
      data: usuarioSinPassword,
    });

  } catch (error) {
    next(error);
  }

};

const actualizarPerfil = async (req, res, next) => {

  try {

    const usuario = await service.actualizarPerfil(
      req.usuario.id,
      req.body
    );

    res.json({
      mensaje: "Perfil actualizado correctamente.",
      data: usuario,
    });

  } catch (error) {

    next(error);

  }

};

const cambiarPassword = async (req, res, next) => {

  try {

    await service.cambiarPassword(
      req.usuario.id,
      req.body
    );

    res.json({
      mensaje: "Contraseña actualizada correctamente.",
    });

  } catch (error) {

    next(error);

  }

};

module.exports = {
  crear,
  listar,
  obtenerPorId,
  perfil,
  actualizarPerfil,
  cambiarPassword,
};