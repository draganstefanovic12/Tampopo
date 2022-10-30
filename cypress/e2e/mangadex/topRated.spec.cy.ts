describe("tesing mangas", () => {
  it("fetches top rated mangas", () => {
    cy.visit("/");

    cy.contains("Berserk");
  });
});

export {};
