const router = require("express").Router();

const controller = require("./auth.controller");

const {
  registrarValidation,
  loginValidation,
} = require("./auth.validation");

const validarCampos = require("../../middlewares/validation.middleware");

router.post(
  "/register",
  registrarValidation,
  validarCampos,
  controller.registrar
);

router.post(
  "/login",
  loginValidation,
  validarCampos,
  controller.login
);

module.exports = router;