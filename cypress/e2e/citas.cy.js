describe("Flujo de citas", () => {

  let token;

  before(() => {
    cy.request("POST", "/api/auth/login", {
      email: "maria05@gmail.com",
      password: "123456"
    }).then((res) => {
      token = res.body.token;
    });
  });

  it("Debe crear una cita", () => {

    cy.request({
      method: "POST",
      url: "/api/citas",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNDk4M2M0ZWVlMGE3ODdkZTIzN2UxNyIsInJvbCI6IlBBQ0lFTlRFIiwiaWF0IjoxNzgzMjAzMjAyLCJleHAiOjE3ODMyODk2MDJ9.3Mnt2fVBJAVrgSWI8EdKjz7J7FXbbcSVsyEvkxKV8M8`
      },
      body: {
        medicoId: "6a404614d6daebbcbd7e86ae",
        fecha: "2026-07-10",
        hora: "10:00",
        motivo: "Control general"
      }
    }).then((res) => {

      expect(res.status).to.eq(201);
      expect(res.body).to.have.property("data");

    });

  });

});