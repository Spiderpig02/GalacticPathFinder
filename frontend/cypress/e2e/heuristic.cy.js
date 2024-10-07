describe("HeuristicsMenu Dropdown Test", () => {
  beforeEach(() => {
    // Visit the home page where HeuristicsMenu is rendered
    cy.visit("http://localhost:5174/");
  });

  it("Should not display any dropdown content by default", () => {
    const defaultText = "Choose heuristic";
    // Check that the default text is displayed
    cy.get(".algorithms-and-heuristics-container")
      .contains(defaultText)
      .should("be.visible");
  });

  it("should not display dropdown content when clicking the menu with no algorithm selected", () => {
    // Click the dropdown button
    cy.get(":nth-child(2) > .select-menu").click();
    // Wait for the dropdown button to be visible
    cy.get(".dropdown-menu-sorting").children().should("have.length", 0);
  });

  it("should display dropdown content when clicking the menu with an algorithm selected", () => {
    const algorithm = "a star";
    const heuristic = "manhattan";
    // Click the dropdown button
    cy.get(":nth-child(1) > .select-menu").click();
    // Wait for the dropdown button to be visible
    cy.get(".dropdown-menu-sorting > :nth-child(1)").should("be.visible");
    // Click the item to select an algorithm
    cy.get(".dropdown-item-sorting").contains(algorithm).click();

    cy.get(":nth-child(2) > .select-menu").click();
    // Wait for the dropdown button to be visible
    cy.get(".dropdown-menu-sorting").contains(heuristic).should("be.visible");
    // Click the dropdown button
    cy.get(".dropdown-menu-sorting").contains(heuristic).click();
    // Check that the heuristic is displayed
    cy.get(":nth-child(2) > .select-menu")
      .contains(heuristic)
      .should("be.visible");
  });
});
