/// <reference types="cypress" />

describe("User status endpoint", () => {
  it("should throw error for an invalid api key", () => {
    cy.check401SatusCodUnauthorized("GET", Cypress.env("user_status_url"));
  });

  it("should respond success for a valid input", () => {
    cy.request({
      method: "GET",
      url: Cypress.env("user_status_url"),
      headers: { Authorization: "Bearer " + Cypress.env("api_key") },
      body: {},
    })
      .its("status").should("eq", 200);
  });

  it("should respond with user status", () => {
    const today = new Date();
    const todaysDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

    cy.request({
      method: "GET",
      url: Cypress.env("user_status_url"),
      headers: { Authorization: "Bearer " + Cypress.env("api_key") },
      body: {},
    }).then((response) => {
      const responseBody = response.body;
      expect(responseBody.date).to.eq(todaysDate);
      expect(responseBody.status).to.eq("ACTIVE");
    });
  });
});
