describe("clicks on a manga and checks for info and chapter images", () => {
  it("goes to homepage and checks clicks on a manga", () => {
    cy.visit("/");

    cy.contains("Berserk").click();

    //checks if it contains the chapter number
    cy.get("select").should("be.visible").select("2");

    //checks for the image alt
    cy.get('[alt="manga-panel"]');
  });
});
