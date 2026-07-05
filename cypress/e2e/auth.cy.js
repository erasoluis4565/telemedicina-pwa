describe("Flujo de autenticación", () => {

  it("Debe iniciar sesión correctamente", () => {

    cy.request("POST", "/api/auth/login", {
      email: "maria05@gmail.com",
      password: "123456"
    }).then((response) => {

      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");

    });

  });

});