describe("Navigation", () => {
  beforeEach(() => {
    //create alias before each test
    cy.visit("/").as("root");
  });

  it("should visit root", () => {
    //visit root web page
    cy.get("@root");
  });


  it("should navigate to Tuesday", () => {
    //visit root webpage
    cy.get("@root");

    //find and click day list item tuesday
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
