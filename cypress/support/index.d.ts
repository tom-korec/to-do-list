/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Get ToDoApp container
     * @example
     * cy.toDoApp()
     */
    toDoApp(): Chainable<any>,
  }
}