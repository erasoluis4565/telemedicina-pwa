const router = require("express").Router();

const controller = require("./medico.controller");

const verificarToken = require("../../middlewares/auth.middleware");
const verificarRol = require("../../middlewares/roles.middleware");
const validarCampos = require("../../middlewares/validation.middleware");

const {
  crearMedicoValidation,
} = require("./medico.validation");

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
  verificarRol("ADMIN"),
  crearMedicoValidation,
  validarCampos,
  controller.crear
);

router.put(
  "/:id",
  verificarToken,
  verificarRol("ADMIN"),
  controller.actualizar
);

router.delete(
  "/:id",
  verificarToken,
  verificarRol("ADMIN"),
  controller.eliminar
);

module.exports = router;