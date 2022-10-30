describe("searches for mangas", () => {
  it("searches", () => {
    cy.visit("/");
    //only 1 input on the page
    cy.get("input[placeholder='Search...']").type("hxh");

    cy.wait(1000);

    cy.get("a").eq(1).click();

    cy.get(`[cy-data="manga-panel"]`);
  });
});
