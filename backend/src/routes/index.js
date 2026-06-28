const router = require("express").Router();

const authRoutes = require("../modules/auth/auth.routes");
const usuarioRoutes = require("../modules/usuarios/usuario.routes");
const medicoRoutes = require("../modules/medicos/medico.routes");
const citaRoutes = require("../modules/citas/cita.routes");

router.use("/auth", authRoutes);
router.use("/usuarios", usuarioRoutes);
router.use("/medicos", medicoRoutes);
router.use("/citas", citaRoutes);

module.exports = router;