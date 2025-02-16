import '@4tw/cypress-drag-drop'

const TEST_LINK = 'https://github.com/AnderZerfall/test-data-kanban';
const API_LINK = 'https://api.github.com/repos/AnderZerfall/test-data-kanban/issues?state=all';
const TEST_LINK_SECOND = 'https://github.com/react-dnd/react-dnd';
const API_LINK_SECOND = 'https://api.github.com/repos/react/react/issues?state=all';
const TEST_CARD_ID_SOURCE = 2856157697
const TEST_CARD_ID_TARGET = 2856156005
const TEST_CARD_ID_TARGET_COLUMN = 2856157858

const insertString = (link: string) => {
  if (link) {
     cy.get(`[data-testid="search-bar"]`).type(link);
  }
  cy.get(`[data-testid="search-bar-button"]`).click();
}

describe.skip('project startup', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  });

  it('renders the default elements on the screen', () => {
    cy.get('[data-testid="kanban-area"]').should("exist");
  });

  it('gets issues from link', () => {
    // STEP 1 download the data
    cy.clearAllSessionStorage();
    insertString(TEST_LINK);
    cy.intercept('GET', API_LINK).as('fetchData');
    cy.wait('@fetchData');
    
    // STEP 2 put cards into right columns
    cy.get(`[data-testid="issue-card"]`).should('have.length.greaterThan', 0);
    cy.get(`[data-test-type="issue-ToDo"]`).should('have.length', 2);
    cy.get(`[data-test-type="issue-InProgress"]`).should('have.length', 2);
    cy.get(`[data-test-type="issue-Done"]`).should('have.length', 2);
  });

  it('loads issues from session storage', () => {
    insertString(TEST_LINK);
    cy.intercept('GET', API_LINK).as('fetchDataFirst');
    cy.wait(500);
    cy.get('@fetchDataFirst.all').should('have.length', 0)

    cy.get(`[data-testid="issue-card"]`).should('have.length.greaterThan', 0);
  })
});

describe('tests search validation', () => {
   beforeEach(() => {
    cy.visit('http://localhost:5173/')
   });
  
  it('inserts an empty string', () => {
    insertString('');
    cy.wait(500);
    cy.get(`[data-testid="search-bar"]`).should('have.css', 'border-color', 'rgb(215, 83, 101)')
  });

  it('insert invalid string', () => {
    insertString('github//:test////123123');
    cy.wait(500);
    cy.get(`[data-testid="search-bar"]`).should('have.css', 'border-color', 'rgb(215, 83, 101)')
  });
});

describe('cards movement', () => {
  const cardToDo = '[data-test-draggable="card-draggable-ToDo-';
  const cardInProgress = '[data-test-draggable="card-draggable-InProgress-';
  const dropInProgress = '[data-testid="drop-indicator-InProgress-';
  const dropToDo = '[data-testid="drop-indicator-ToDo-';
  const draggable = `${cardToDo}${TEST_CARD_ID_SOURCE}"]`;

  beforeEach(() => {
    cy.visit('http://localhost:5173/')
    insertString(TEST_LINK);
  });

  it.skip('moves to other column', () => {
    const newDraggable = `${cardInProgress}${TEST_CARD_ID_SOURCE}"]`;
    const dropZone = `${dropInProgress}${TEST_CARD_ID_TARGET_COLUMN}"]`;

    cy.get(draggable).should("exist");
    cy.get(dropZone).should("exist");

    cy.get(draggable)
      .drag(dropZone);
    
    cy.get(draggable).should('not.exist');
    cy.get(newDraggable).should('exist');
  });

  it.skip('moves to the end of the column', () => {
    const newDraggable = `${cardInProgress}${TEST_CARD_ID_SOURCE}"]`;
    const dropZone = `[data-testid="drop-indicator-end-InProgress"]`;

    cy.get(draggable).should("exist");
    cy.get(dropZone).should("exist");

    cy.get(draggable)
      .drag(dropZone)
    
    cy.get(draggable).should('not.exist');
    cy.get(newDraggable).should('exist');
  });

  it.skip('moves within the current column', () => {
    const dropZone = `[data-testid="${dropToDo}${TEST_CARD_ID_TARGET}"]`;
    
    cy.get(draggable).should("exist");
    cy.get(dropZone).should("exist");

    cy.get(`[data-test-draggable^="card-draggable-ToDo-"`)
      .eq(0)
      .should(
        'have.attr',
        'data-test-draggable',
        `card-draggable-ToDo-${TEST_CARD_ID_SOURCE}`);
    cy.get(`[data-test-draggable^="card-draggable-ToDo-"`)
      .eq(1)
      .should(
        'have.attr',
        'data-test-draggable',
        `card-draggable-ToDo-${TEST_CARD_ID_TARGET}`);

    cy.get(draggable)
      .drag(dropZone)
    
    cy.get(`[data-test-draggable^="card-draggable-ToDo-"`)
      .eq(0)
      .should(
        'have.attr',
        'data-test-draggable',
        `card-draggable-ToDo-${TEST_CARD_ID_TARGET}`);
    cy.get(`[data-test-draggable^="card-draggable-ToDo-"`)
      .eq(1)
      .should(
        'have.attr',
        'data-test-draggable',
        `card-draggable-ToDo-${TEST_CARD_ID_SOURCE}`);
  });
});