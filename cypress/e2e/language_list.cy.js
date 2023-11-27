/// <reference types="cypress" />


  describe("Language endpoint", () => {

    it("should respond with list of 164 supported languages", () => {
      cy.request({
        method: "GET",
        url: Cypress.env("language_url"),
        headers: { Authorization: "Bearer " + Cypress.env("api_key") },
        body: {},
      }).then((response) => {
        expect(response.status).to.eq(200);
        const responseBody = response.body;
        expect(responseBody.length).to.eq(164);
      });
    });
  
    it("should include name and code of supported languages", () => {
      cy.request({
        method: "GET",
        url: Cypress.env("language_url"),
        headers: { Authorization: "Bearer " + Cypress.env("api_key") },
        body: {},
      }).then((response) => {
        const responseBody = response.body;
        expect(responseBody.every((item) => item.hasOwnProperty("code"))).to.be.true;
        expect(responseBody.every((item) => item.hasOwnProperty("name"))).to.be.true;
      });
    });
  
    it("Validate name and code values should be string", () => {
      cy.request({
        method: "GET",
        url: Cypress.env("language_url"),
        headers: { Authorization: "Bearer " + Cypress.env("api_key") },
        body: {},
      }).then((response) => {
        const responseBody = response.body;
        Object.keys(responseBody).forEach(function (item) {
          const code = responseBody[item].code;
          expect(code).to.be.a('string');
          const name = responseBody[item].name;
          expect(name).to.be.a('string');
        });
      });
    });
  });
  