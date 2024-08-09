describe("AlgorithmsMenu Dropdown Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should display dropdown content when clicking the menu", () => {
    // Check that the default text is displayed
    const defaultText = "Choose algorithm";
    cy.get(".algorithms-and-heuristics-container")
      .contains(defaultText)
      .should("be.visible");

    // Click the dropdown button
    cy.get(":nth-child(1) > .select-menu").click();

    // Wait for the dropdown button to be visible
    cy.get(".dropdown-menu-sorting > :nth-child(1)").should("be.visible");
    // Get the amount of dropdown items
    cy.get(".dropdown-item-sorting").should("have.length.greaterThan", 0);
  });

  it("should update button text to selected algorithm", () => {
    const algorithm = "a star";
    cy.get(".algorithms-and-heuristics-container")
      .contains("Choose algorithm")
      .should("be.visible");

    // Click the dropdown button
    cy.get(":nth-child(1) > .select-menu").click();

    // Wait for the dropdown button to be visible
    cy.get(".dropdown-menu-sorting > :nth-child(1)").should("be.visible");
    // Get the amount of dropdown items
    cy.get(".dropdown-item-sorting").should("have.length.greaterThan", 0);

    // Select an algorithm
    cy.get(".dropdown-item-sorting").contains(algorithm).click();

    // Verify the button text updates to the selected algorithm
    cy.get(".algorithms-and-heuristics-container")
      .contains(algorithm)
      .should("be.visible");
  });
});
