Cypress.Commands.add('check401SatusCodUnauthorized', (httpsMethod, url) => {
    cy.request({
      method: httpsMethod,
      url: url,
      failOnStatusCode: false,
      headers: {},
      body: {},
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.statusText).to.eq("Unauthorized");
      expect(response.body.error.message).to.eq("Invalid API key");
    });
  })
  