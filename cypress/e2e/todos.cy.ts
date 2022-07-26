describe("Todos tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should be able to add task to list by pressing enter", () => {
    cy.get("[data-cy=new-task-input]").type(`Тестовое задание {enter}`);

    cy.get(".item__container li").should("have.length", 1);
  });

  it("Should be able to add task to list by pressing add button", () => {
    cy.get("[data-cy=new-task-input]").type(`Тестовое задание`);

    cy.contains("add").click();

    cy.get(".item__container li").should("have.length", 1);
  });

  it("Should be able to mark task as completed", () => {
    cy.get("[data-cy=new-task-input]").type(`Тестовое задание {enter}`);

    cy.contains("Тестовое задание").parent().get("label").click();

    cy.get(".item__container li").children();

    cy.contains("No items left").should("be.visible");
  });

  it("Should be able to mark completed as active", () => {
    cy.get("[data-cy=new-task-input]").type(`Тестовое задание {enter}`);

    cy.contains("Тестовое задание").parent().get("label").click();

    cy.get(".item__container li").children();

    cy.contains("Тестовое задание").parent().get("label").click();

    cy.contains("1 items left").should("be.visible");
  });

  it("Should be able to view all completed tasks", () => {
    cy.get("[data-cy=new-task-input]").type(`Тестовое задание {enter}`);

    cy.get("[data-cy=new-task-input]").type(`Другое задание {enter}`);

    cy.get("[data-cy=new-task-input]").type(`Третье задание {enter}`);

    cy.get("p").contains("Тестовое задание").parent().find("label").click();

    cy.contains("Completed").click();

    cy.get(".item__container li").should("have.length", 1);
  });

  it("Should be able to view all completed tasks", () => {
    cy.get("[data-cy=new-task-input]").type(`Тестовое задание {enter}`);

    cy.get("[data-cy=new-task-input]").type(`Другое задание {enter}`);

    cy.get("[data-cy=new-task-input]").type(`Третье задание {enter}`);

    cy.get("p").contains("Тестовое задание").parent().find("label").click();

    cy.get("p").contains("Третье задание").parent().find("label").click();

    cy.contains("Active").click();

    cy.get(".item__container li").should("have.length", 1);
  });

  it("Should delete completed tasks", () => {
    cy.get("[data-cy=new-task-input]").type(`Тестовое задание {enter}`);

    cy.get("[data-cy=new-task-input]").type(`Другое задание {enter}`);

    cy.get("[data-cy=new-task-input]").type(`Третье задание {enter}`);

    cy.get("p").contains("Тестовое задание").parent().find("label").click();

    cy.get("p").contains("Третье задание").parent().find("label").click();

    cy.get("p").contains("Clear Completed").click();

    cy.get(".item__container li").should("have.length", 1);
  });
});
