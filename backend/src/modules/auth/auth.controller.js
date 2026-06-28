const authService = require("./auth.service");

const registrar = async (req, res, next) => {
  try {
    const usuario = await authService.registrar(req.body);

    // No devolver la contraseña encriptada
    const { passwordHash, ...usuarioSinPassword } = usuario.toObject();

    res.status(201).json({
      mensaje: "Usuario registrado correctamente.",
      data: usuarioSinPassword,
    });

  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { usuario, token } = await authService.login(req.body);

    const { passwordHash, ...usuarioSinPassword } = usuario.toObject();

    res.json({
      mensaje: "Inicio de sesión correcto.",
      token,
      usuario: usuarioSinPassword,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  registrar,
  login,
};