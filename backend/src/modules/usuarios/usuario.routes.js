const router = require("express").Router();

const controller = require("./usuario.controller");
const verificarToken = require("../../middlewares/auth.middleware");

console.log("controller:", controller);
console.log("verificarToken:", verificarToken);

router.get(
    "/",
    verificarToken,
    controller.listar
);

router.get(
  "/perfil",
  verificarToken,
  controller.perfil
);

router.get(
    "/:id",
    verificarToken,
    controller.obtenerPorId
);

router.post("/", controller.crear);

module.exports = router;