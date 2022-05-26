describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset"); //db reset
    cy.visit("/").as("root"); //create alias 
    cy.contains("Monday"); //verify day in DOM
  });


  it("should book an interview", () => {
    //click add button
    cy.get("[alt=Add]")
      .first()
      .click();

    //enter student's name
    cy.get("[data-testid=student-name-input")
      .type("Lydia Miller-Jones", { delay: 100 });

    //select interviewer
    cy.get("[alt='Sylvia Palmer']")
      .click();

    //click save button
    cy.contains("Save")
      .click();

    //verify created appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });


  it("should edit an interview", () => {
    //click edit button
    cy.get("[alt=Edit]")
      .click({ force: true });

    //clear form
    cy.get("[data-testid=student-name-input")
      .clear()
      .type("John Doe", { delay: 100 });

    //select interviewer
    cy.get("[alt='Tori Malcolm']")
      .click();

    //click save button
    cy.contains("Save")
      .click();

    //verify edited appointment
    cy.contains(".appointment__card--show", "John Doe");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });


  it("should cancel an interview", () => {
    //click delete on first appointment
    cy.get("[alt=Delete]")
      .click({ force: true });

    //confirm delete
    cy.contains("Confirm")
      .click();

    //check deleting animation exists
    cy.contains("Deleting")
      .should("exist");

    //check deleting animation doesn't exist
    cy.contains("Deleting")
      .should("not.exist");

    //check that appointment is deleted
    cy.contains(".appointment__card--show", "John Doe")
      .should("not.exist");
  });
});