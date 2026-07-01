const { body } = require("express-validator");

const crearRecetaValidation = [

  body("citaId")
    .notEmpty()
    .withMessage("La cita es obligatoria."),

  body("diagnostico")
    .notEmpty()
    .withMessage("El diagnóstico es obligatorio."),

  body("medicamentos")
    .isArray({ min: 1 })
    .withMessage("Debe existir al menos un medicamento."),

];

module.exports = {
  crearRecetaValidation,
};