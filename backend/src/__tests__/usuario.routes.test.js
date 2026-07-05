const router = require("../modules/usuarios/usuario.routes");

describe("Usuario Routes", () => {

  it("Debe exportar un router", () => {
    expect(router).toBeDefined();
    expect(router.stack).toBeDefined();
  });

  it("Debe contener rutas", () => {
    expect(router.stack.length).toBeGreaterThan(0);
  });

});