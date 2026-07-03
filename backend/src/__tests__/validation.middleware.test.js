const validarCampos = require("../middlewares/validation.middleware");
const { validationResult } = require("express-validator");

jest.mock("express-validator");

describe("Validation Middleware", () => {

  let req;
  let res;
  let next;

  beforeEach(() => {

    req = {};

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();

    jest.clearAllMocks();

  });

  test("Debe continuar cuando no existen errores", () => {

    validationResult.mockReturnValue({
      isEmpty: () => true,
    });

    validarCampos(req, res, next);

    expect(next).toHaveBeenCalled();

  });

  test("Debe devolver 400 cuando existen errores", () => {

    const errores = [
      {
        msg: "Campo requerido",
      },
    ];

    validationResult.mockReturnValue({

      isEmpty: () => false,

      array: () => errores,

    });

    validarCampos(req, res, next);

    expect(res.status)
      .toHaveBeenCalledWith(400);

    expect(res.json)
      .toHaveBeenCalledWith({
        errores,
      });

  });

});