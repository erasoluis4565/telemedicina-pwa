const router = require("express").Router();

const controller = require("./cita.controller");

const verificarToken = require("../../middlewares/auth.middleware");
const verificarRol = require("../../middlewares/roles.middleware");
const validarCampos = require("../../middlewares/validation.middleware");

const {
  crearCitaValidation,
} = require("./cita.validation");

router.get(
  "/",
  verificarToken,
  controller.listar
);

router.get(
  "/:id",
  verificarToken,
  controller.obtenerPorId
);

router.post(
  "/",
  verificarToken,
  verificarRol("PACIENTE", "ADMIN"),
  crearCitaValidation,
  validarCampos,
  controller.crear
);

router.put(
  "/:id",
  verificarToken,
  verificarRol("PACIENTE", "MEDICO", "ADMIN"),
  controller.actualizar
);

router.delete(
  "/:id",
  verificarToken,
  verificarRol("ADMIN"),
  controller.eliminar
);

module.exports = router;