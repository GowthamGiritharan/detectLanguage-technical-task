/// <reference types="cypress" />


  describe("Language endpoint", () => {

    it("should respond with 200 status when called", () => {
      cy.request('GET', Cypress.env('language_url')).its('status').should('eq', 200);
    });

    it("should have valid headers - content type", () => {
      cy.request('GET', Cypress.env('language_url')).its('headers')
        .its('content-type').should('include', 'application/json');
    });

    it("should respond with list of 164 supported languages", () => {
      cy.request('GET', Cypress.env('language_url')).its('body')
        .should('have.length', 164);
    });
  
    it("should have a valid JSON schema", () => {
      cy.request('GET', Cypress.env('language_url')).its('body')
        .each(value => {
          expect(value).to.have.all.keys('code', 'name');
        })
    });
  
    it("Validate name and code values should be string", () => {
      cy.request('GET', Cypress.env('language_url')).its('body')
      .then((responseBody) => {
        Object.keys(responseBody).forEach(function (item) {
          const code = responseBody[item].code;
          expect(code).to.be.a('string');
          const name = responseBody[item].name;
          expect(name).to.be.a('string');
        });
      });
    });
  });
  