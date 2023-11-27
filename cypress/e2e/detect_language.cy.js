/// <reference types="cypress" />

describe("Detect language endpoint", () => {
  it("should throw error for an invalid api key", () => {
    cy.check401SatusCodUnauthorized("POST", Cypress.env("detect_url"));
  });

  it("should detect single language", () => {
    cy.request({
      method: "POST",
      url: Cypress.env("detect_url"),
      headers: { Authorization: "Bearer " + Cypress.env("api_key") },
      body: { q: "tjena" },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const responseBody = response.body.data.detections[0];
      expect(responseBody.language).to.eq("sv");
      expect(responseBody.isReliable).to.eq(true);
      expect(responseBody.confidence).to.be.a("number");
    });
  });

  it("should detect a batch", () => {
    cy.request({
      method: "POST",
      url: Cypress.env("detect_url"),
      headers: { Authorization: "Bearer " + Cypress.env("api_key") },
      body: { q: ["வணக்கம்", "greetings"] },
    }).then((response) => {
      expect(response.status).to.eq(200);
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
        expect(response.status).to.eq(200);
        const responseBody = response.body.data.detections;
        expect(responseBody).to.be.empty;
      });
    });
  });
