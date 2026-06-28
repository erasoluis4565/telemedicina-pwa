const { body } = require("express-validator");

const crearMedicoValidation = [

  body("usuarioId")
    .notEmpty()
    .withMessage("El usuario es obligatorio."),

  body("especialidad")
    .notEmpty()
    .withMessage("La especialidad es obligatoria."),

  body("numeroLicencia")
    .notEmpty()
    .withMessage("El número de licencia es obligatorio."),

];

module.exports = {
  crearMedicoValidation,
};