/// <reference types="cypress" />

describe("Detect language endpoint", () => {
  it("should throw error for an invalid api key", () => {
    //check401SatusCodUnauthorized is a custom function written in support/commands.js
    cy.check401SatusCodUnauthorized("POST", Cypress.env("detect_url"));
  });

  it("should respond success for a valid input", () => {
    cy.request({
      method: "POST",
      url: Cypress.env("detect_url"),
      headers: { Authorization: "Bearer " + Cypress.env("api_key") },
      body: { q: "tjena" },
    }).its('status').should('eq', 200)
  });

  it("should detect single language", () => {
    cy.request({
      method: "POST",
      url: Cypress.env("detect_url"),
      headers: { Authorization: "Bearer " + Cypress.env("api_key") },
      body: { q: "tjena" },
    }).then((response) => {
      const responseBody = response.body.data.detections[0];
      expect(responseBody.language).to.eq("sv");
      expect(responseBody.isReliable).to.eq(true);
      expect(responseBody.confidence).to.be.a("number");
    });
  });

  it("should return multiple results when keyphrase is ambiguous", () => {
    cy.request({
      method: "POST",
      url: Cypress.env("detect_url"),
      headers: { Authorization: "Bearer " + Cypress.env("api_key") },
      body: { q: "papa" },
    }).its('body.data.detections').should('have.length', 3)
  });

  it("should detect a batch", () => {
    cy.request({
      method: "POST",
      url: Cypress.env("detect_url"),
      headers: { Authorization: "Bearer " + Cypress.env("api_key") },
      body: { q: ["வணக்கம்", "greetings"] },
    }).then((response) => {
      const responseBody = response.body.data.detections;
      expect(responseBody[0][0].language).to.eq("ta");
      expect(responseBody[1][0].language).to.eq("en");
    });
  });

    it("should respond null for unrecognized characters ", () => {
      cy.request({
        method: "POST",
        url: Cypress.env("detect_url"),
        headers: { Authorization: "Bearer " + Cypress.env("api_key") },
        body: { q: "!§" },
      }).then((response) => {
        const responseBody = response.body.data.detections;
        expect(responseBody).to.be.empty;
      });
    });
  });
