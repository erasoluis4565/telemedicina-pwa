const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();


// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

// Ruta de prueba
app.get("/", (req, res) => {
    res.json({
        mensaje: "API TeleSalud funcionando correctamente 🚀"
    });
});

app.use(errorHandler);

module.exports = app;