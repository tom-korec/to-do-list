/// <reference types="cypress" />
/// <reference types="../support" />

const toDo1 = "Make e2e tests with cypress";
const toDo2 = "cook a dinner";
const toDo3 = "find a job";

const selectors = {
  addForm: "[data-cy=add-todo]",
  editForm: "[data-cy=edit-todo]",
  textInput: "[data-cy=text-input]",
  submitButton: "[data-cy=submit-button]",
  listItem: "[data-cy=todo-item]",
  listItemCheckbox: "[data-cy=todo-item-checkbox]",
  listItemText: "[data-cy=todo-item-text]",
  listItemDelete: "[data-cy=todo-item-delete]",
};

const checkToDoItem = (text) => {
  cy.toDoApp().find(selectors.listItem).as("item").should("have.length", 1);
  cy.get("@item").find(selectors.listItemText).should("have.text", text);
  cy.get("@item")
    .find(selectors.listItemCheckbox)
    .should("not.have.class", "checkbox-checked");
};

const addToDo = (toDoText) => {
  cy.toDoApp()
    .find(selectors.addForm)
    .as("addForm")
    .find(selectors.textInput)
    .type(toDoText);
  cy.get("@addForm").find(selectors.submitButton).click();
};

const getListItems = () => {
  return cy.toDoApp().find(selectors.listItem);
};

const getListItemAtIndex = (index) => {
  return cy.toDoApp().find(selectors.listItem).eq(index);
};

context("Actions", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("type and submit new toDo with button click", () => {
    cy.toDoApp()
      .find(selectors.addForm)
      .as("addForm")
      .find(selectors.textInput)
      .type(toDo1)
      .should("have.value", toDo1);
    cy.get("@addForm").find(selectors.submitButton).click();
    checkToDoItem(toDo1);
  });

  it("type and submit new toDo with pressing enter", () => {
    cy.toDoApp()
      .find(selectors.addForm)
      .find(selectors.textInput)
      .as("addFormInput")
      .type(toDo1)
      .should("have.value", toDo1);
    cy.get("@addFormInput").type("{enter}");
    checkToDoItem(toDo1);
  });

  it("delete toDo", () => {
    addToDo(toDo1);
    getListItemAtIndex(0)
      .as("item")
      .find(selectors.listItemDelete)
      .as("deleteButton")
      .should("not.be.visible");

    // cypress cannot apply css :hover on element
    // see https://docs.cypress.io/api/commands/hover.html#Workarounds
    cy.get("@deleteButton").click({ force: true });
    getListItems().should("have.length", 0);
  });

  it("close toDo", () => {
    addToDo(toDo1);
    getListItemAtIndex(0)
      .as("item")
      .find(selectors.listItemCheckbox)
      .as("checkbox")
      .click();
    cy.get("@checkbox").should("have.class", "checkbox-checked");
    cy.get("@item")
      .find(selectors.listItemText)
      .should("have.class", "tdl-item-text-closed");
  });

  it("update toDo and submit with button click", () => {
    addToDo(toDo1);
    getListItemAtIndex(0).as("item").find(selectors.listItemText).click();
    cy.get("@item")
      .find(selectors.textInput)
      .type(`{selectAll}{backspace}${toDo2}`)
      .should("have.value", toDo2);
    cy.get("@item").find(selectors.submitButton).click();
    checkToDoItem(toDo2);
  });

  it("update toDo and submit with enter", () => {
    addToDo(toDo1);
    getListItemAtIndex(0).as("item").find(".tdl-item-text").click();
    cy.get("@item")
      .find(selectors.textInput)
      .type(`{selectAll}{backspace}${toDo2}{enter}`);
    checkToDoItem(toDo2);
  });

  it("sort todos", () => {
    addToDo(toDo1);
    getListItemAtIndex(0);
    addToDo(toDo2);
    getListItemAtIndex(1);
    addToDo(toDo3);
    getListItemAtIndex(2);

    getListItems().should("have.length", 3);

    getListItemAtIndex(0)
      .as("item2")
      .find(selectors.listItemText)
      .should("have.text", toDo2);

    getListItemAtIndex(1)
      .as("item3")
      .find(selectors.listItemText)
      .should("have.text", toDo3);

    getListItemAtIndex(2)
      .as("item1")
      .find(selectors.listItemText)
      .should("have.text", toDo1);

    cy.get("@item1").find(selectors.listItemCheckbox).click();
    cy.get("@item2").find(selectors.listItemCheckbox).click();

    getListItemAtIndex(0)
      .find(selectors.listItemText)
      .should("have.text", toDo3);
    getListItemAtIndex(1)
      .find(selectors.listItemText)
      .should("have.text", toDo1);
    getListItemAtIndex(2)
      .find(selectors.listItemText)
      .should("have.text", toDo2);
  });

  it("localstorage", () => {
    addToDo(toDo1);
    getListItemAtIndex(0);
    addToDo(toDo2);
    getListItemAtIndex(1);

    getListItems().should("have.length", 2);

    cy.reload(true);

    getListItems().should("have.length", 2);

    getListItemAtIndex(0)
      .find(selectors.listItemText)
      .should("have.text", toDo2);
    getListItemAtIndex(1)
      .find(selectors.listItemText)
      .should("have.text", toDo1);
  });
});
