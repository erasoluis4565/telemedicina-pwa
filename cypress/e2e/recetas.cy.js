describe("Flujo de recetas", () => {

  let token;

  before(() => {
    cy.request("POST", "/api/auth/login", {
      email: "maria05@gmail.com",
      password: "123456"
    }).then((res) => {
      token = res.body.token;
    });
  });

  it("Debe listar recetas del usuario", () => {

    cy.request({
      method: "GET",
      url: "/api/recetas/mis-recetas",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNDk4M2M0ZWVlMGE3ODdkZTIzN2UxNyIsInJvbCI6IlBBQ0lFTlRFIiwiaWF0IjoxNzgzMjAzMjAyLCJleHAiOjE3ODMyODk2MDJ9.3Mnt2fVBJAVrgSWI8EdKjz7J7FXbbcSVsyEvkxKV8M8`
      }
    }).then((res) => {

      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("data");

    });

  });

});