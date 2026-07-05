const router = require("../modules/medicos/medico.routes");

describe("Medico Routes", () => {

  it("Debe exportar un router", () => {
    expect(router).toBeDefined();
    expect(router.stack).toBeDefined();
  });

  it("Debe contener rutas", () => {
    expect(router.stack.length).toBeGreaterThan(0);
  });

});