const { body } = require("express-validator");

const registrarValidation = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio."),

  body("apellido")
    .notEmpty()
    .withMessage("El apellido es obligatorio."),

  body("email")
    .isEmail()
    .withMessage("Correo electrónico inválido."),

  body("telefono")
    .notEmpty()
    .withMessage("El teléfono es obligatorio."),

  body("fechaNacimiento")
    .notEmpty()
    .withMessage("La fecha de nacimiento es obligatoria."),

  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres."),
];

const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Correo inválido."),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria."),
];

module.exports = {
  registrarValidation,
  loginValidation,
};