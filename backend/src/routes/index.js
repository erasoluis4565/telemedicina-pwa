const router = require("express").Router();

const authRoutes = require("../modules/auth/auth.routes");
const usuarioRoutes = require("../modules/usuarios/usuario.routes");
const medicoRoutes = require("../modules/medicos/medico.routes");
const citaRoutes = require("../modules/citas/cita.routes");
const recetaRoutes = require(
  "../modules/recetas/receta.routes"
);

router.use("/auth", authRoutes);
router.use("/usuarios", usuarioRoutes);
router.use("/medicos", medicoRoutes);
router.use("/citas", citaRoutes);
router.use(
  "/recetas",
  recetaRoutes
);

module.exports = router;