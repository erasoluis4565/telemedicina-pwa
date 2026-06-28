const mongoose = require("mongoose");

const citaSchema = new mongoose.Schema(
  {
    pacienteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    medicoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medico",
      required: true,
    },

    fecha: {
      type: Date,
      required: true,
    },

    hora: {
      type: String,
      required: true,
    },

    motivo: {
      type: String,
      required: true,
      trim: true,
    },

    estado: {
      type: String,
      enum: [
        "PENDIENTE",
        "CONFIRMADA",
        "COMPLETADA",
        "CANCELADA",
      ],
      default: "PENDIENTE",
    },

    tipoConsulta: {
      type: String,
      enum: [
        "VIRTUAL",
        "PRESENCIAL",
      ],
      default: "VIRTUAL",
    },

    duracion: {
      type: Number,
      default: 30,
    },

    observaciones: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Cita",
  citaSchema
);