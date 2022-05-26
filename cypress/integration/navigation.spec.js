describe("Navigation", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset"); //db reset
    cy.visit("/").as("root"); //create alias 
    cy.contains("Monday"); //verify day in DOM
  });

  it("should visit root", () => {
    //visit root web page
    cy.get("@root");
  });


  it("should navigate to Tuesday", () => {
    //find and click day list item tuesday
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
