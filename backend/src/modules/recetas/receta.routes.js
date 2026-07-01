const router = require("express").Router();

const controller = require("./receta.controller");

const verificarToken = require("../../middlewares/auth.middleware");

const verificarRol = require("../../middlewares/roles.middleware");

const {
  crearRecetaValidation,
} = require("./receta.validation");

const validarCampos = require(
  "../../middlewares/validation.middleware"
);

// Obtener todas las recetas
router.get(
  "/",
  verificarToken,
  controller.listar
);

router.get(
  "/mis-recetas",
  verificarToken,
  controller.misRecetas
);

// Obtener una receta por ID
router.get(
  "/:id",
  verificarToken,
  controller.obtenerPorId
);

// Crear receta (solo MÉDICO y ADMIN)
router.post(
  "/",
  verificarToken,
  verificarRol("MEDICO", "ADMIN"),
  crearRecetaValidation,
  validarCampos,
  controller.crear
);

// Actualizar receta
router.put(
  "/:id",
  verificarToken,
  verificarRol("MEDICO", "ADMIN"),
  controller.actualizar
);

// Eliminar receta
router.delete(
  "/:id",
  verificarToken,
  verificarRol("ADMIN"),
  controller.eliminar
);

module.exports = router;