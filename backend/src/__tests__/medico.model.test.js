const mongoose = require("mongoose");
const Medico = require("../modules/medicos/medico.model");

describe("Modelo Medico", () => {

    it("Debe crear un médico válido", () => {

        const medico = new Medico({
            usuarioId: new mongoose.Types.ObjectId(),
            especialidad: "Cardiología",
            numeroLicencia: "MED-12345"
        });

        expect(medico.usuarioId).toBeDefined();
        expect(medico.especialidad).toBe("Cardiología");
        expect(medico.numeroLicencia).toBe("MED-12345");
        expect(medico.experiencia).toBe(0);
        expect(medico.biografia).toBe("");
        expect(medico.fotoPerfil).toBe("");
        expect(medico.activo).toBe(true);

    });

    it("Debe requerir usuarioId", () => {

        const medico = new Medico({
            especialidad: "Pediatría",
            numeroLicencia: "MED-999"
        });

        const error = medico.validateSync();

        expect(error.errors.usuarioId).toBeDefined();

    });

    it("Debe requerir especialidad", () => {

        const medico = new Medico({
            usuarioId: new mongoose.Types.ObjectId(),
            numeroLicencia: "MED-999"
        });

        const error = medico.validateSync();

        expect(error.errors.especialidad).toBeDefined();

    });

    it("Debe requerir numeroLicencia", () => {

        const medico = new Medico({
            usuarioId: new mongoose.Types.ObjectId(),
            especialidad: "Neurología"
        });

        const error = medico.validateSync();

        expect(error.errors.numeroLicencia).toBeDefined();

    });

});