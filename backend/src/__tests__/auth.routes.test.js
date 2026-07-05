const router = require("../modules/auth/auth.routes");

describe("Auth Routes", () => {

  it("Debe exportar un router de Express", () => {
    expect(router).toBeDefined();
    expect(router.stack).toBeDefined();
  });

  it("Debe tener rutas registradas", () => {
    expect(router.stack.length).toBeGreaterThan(0);
  });

});