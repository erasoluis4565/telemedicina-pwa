require("dotenv").config();

const app = require("./app");
const conectarDB = require("./config/database");

const PORT = process.env.PORT || 3000;

// Conectar la base de datos
conectarDB();

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});