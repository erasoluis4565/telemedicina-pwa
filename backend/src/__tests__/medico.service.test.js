const medicoService = require("../modules/medicos/medico.service");
const repository = require("../modules/medicos/medico.repository");

jest.mock("../modules/medicos/medico.repository");

describe("Medico Service", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe crear un médico", async () => {

    const medico = {
      _id: "1",
      usuarioId: "usuario1",
      especialidad: "Cardiología",
    };

    repository.crear.mockResolvedValue(medico);

    const resultado = await medicoService.crear(medico);

    expect(repository.crear).toHaveBeenCalledWith(medico);

    expect(resultado).toEqual(medico);

  });

  test("Debe listar médicos", async () => {

    const lista = [
      {
        _id: "1",
        especialidad: "Cardiología",
      },
      {
        _id: "2",
        especialidad: "Pediatría",
      },
    ];

    repository.obtenerTodos.mockResolvedValue(lista);

    const resultado = await medicoService.listar();

    expect(repository.obtenerTodos).toHaveBeenCalled();

    expect(resultado).toEqual(lista);

  });

  test("Debe obtener un médico por ID", async () => {

    const medico = {
      _id: "1",
      especialidad: "Neurología",
    };

    repository.obtenerPorId.mockResolvedValue(medico);

    const resultado = await medicoService.obtenerPorId("1");

    expect(repository.obtenerPorId).toHaveBeenCalledWith("1");

    expect(resultado).toEqual(medico);

  });

  test("Debe actualizar un médico", async () => {

    const actualizado = {
      _id: "1",
      especialidad: "Dermatología",
    };

    repository.actualizar.mockResolvedValue(actualizado);

    const resultado = await medicoService.actualizar(
      "1",
      actualizado
    );

    expect(repository.actualizar).toHaveBeenCalledWith(
      "1",
      actualizado
    );

    expect(resultado).toEqual(actualizado);

  });

  test("Debe eliminar un médico", async () => {

    repository.eliminar.mockResolvedValue({
      mensaje: "Eliminado",
    });

    const resultado = await medicoService.eliminar("1");

    expect(repository.eliminar).toHaveBeenCalledWith("1");

    expect(resultado).toEqual({
      mensaje: "Eliminado",
    });

  });

});