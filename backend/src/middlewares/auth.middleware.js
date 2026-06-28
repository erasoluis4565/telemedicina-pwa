const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        mensaje: "Token no proporcionado.",
      });
    }

    const token = authorization.split(" ")[1];

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.usuario = payload;

    next();

  } catch (error) {
    return res.status(401).json({
      mensaje: "Token inválido o expirado.",
    });
  }
};

module.exports = verificarToken;