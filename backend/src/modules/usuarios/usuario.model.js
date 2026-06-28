const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },

    apellido: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    telefono: {
      type: String,
      required: true,
      trim: true,
    },

    fechaNacimiento: {
      type: Date,
      required: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    rol: {
      type: String,
      enum: ["PACIENTE", "MEDICO", "ADMIN"],
      default: "PACIENTE",
    },

    activo: {
      type: Boolean,
      default: true,
    },

    fotoPerfil: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Usuario",
  usuarioSchema
);