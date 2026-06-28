const { body } = require("express-validator");

const crearCitaValidation = [

  body("medicoId")
    .notEmpty()
    .withMessage("El médico es obligatorio."),

  body("fecha")
    .notEmpty()
    .withMessage("La fecha es obligatoria."),

  body("hora")
    .notEmpty()
    .withMessage("La hora es obligatoria."),

  body("motivo")
    .notEmpty()
    .withMessage("El motivo es obligatorio."),

];

module.exports = {
  crearCitaValidation,
};