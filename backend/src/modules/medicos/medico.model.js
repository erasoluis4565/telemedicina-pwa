const mongoose = require("mongoose");

const medicoSchema = new mongoose.Schema(
  {
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
      unique: true,
    },

    especialidad: {
      type: String,
      required: true,
      trim: true,
    },

    numeroLicencia: {
      type: String,
      required: true,
      unique: true,
    },

    experiencia: {
      type: Number,
      default: 0,
    },

    biografia: {
      type: String,
      default: "",
    },

    fotoPerfil: {
      type: String,
      default: "",
    },

    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Medico",
  medicoSchema
);