const mongoose = require("mongoose");

const recetaSchema = new mongoose.Schema(
  {
    citaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cita",
      required: true,
      unique: true,
    },

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

    diagnostico: {
      type: String,
      required: true,
      trim: true,
    },

    medicamentos: [
      {
        nombre: {
          type: String,
          required: true,
        },

        dosis: {
          type: String,
          required: true,
        },

        frecuencia: {
          type: String,
          required: true,
        },

        duracion: {
          type: String,
          required: true,
        },
      },
    ],

    recomendaciones: {
      type: String,
      default: "",
    },

    estado: {
      type: String,
      enum: ["ACTIVA", "FINALIZADA"],
      default: "ACTIVA",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Receta",
  recetaSchema
);