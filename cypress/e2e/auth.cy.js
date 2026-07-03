describe("Auth E2E Test", () => {

  it("Debe iniciar sesión correctamente", () => {

    cy.request("POST", "http://localhost:3000/api/auth/login", {
      email: "test@correo.com",
      password: "123456"
    }).then((res) => {

      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("token");

    });

  });

});