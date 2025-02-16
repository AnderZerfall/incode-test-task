const TEST_LINK = 'https://github.com/AnderZerfall/test-data-kanban';
const API_LINK = 'https://api.github.com/repos/AnderZerfall/test-data-kanban/issues?state=all';
const TEST_LINK_SECOND = 'https://github.com/react-dnd/react-dnd';
const API_LINK_SECOND = 'https://api.github.com/repos/react/react/issues?state=all';

describe('project startup', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
    cy.clearAllSessionStorage();
  });

  it('renders the default elements on the screen', () => {
    cy.get('[data-testid="kanban-area"]').should("exist");
  });

  it('get issues from link', () => {
    // STEP 1 download the data
    cy.get(`[data-testid="search-bar"]`).type(TEST_LINK);
    cy.get(`[data-testid="search-bar-button"]`).click();
    cy.intercept('GET', API_LINK).as('fetchData');
    cy.wait('@fetchData');
    
    // STEP 2 put cards into right columns
    cy.get(`[data-testid="issue-card"]`).should('have.length.greaterThan', 0);
    cy.get(`[data-test-type="issue-ToDo"]`).should('have.length', 2);
    cy.get(`[data-test-type="issue-InProgress"]`).should('have.length', 2);
    cy.get(`[data-test-type="issue-Done"]`).should('have.length', 2);
  });

  it('load issues from session storage', () => {
    cy.get(`[data-testid="search-bar"]`).type(TEST_LINK);
    cy.get(`[data-testid="search-bar-button"]`).click();
    cy.intercept('GET', API_LINK).as('fetchData');
    cy.wait('@fetchData');

    cy.get(`[data-testid="issue-card"]`).should('have.length.greaterThan', 0);

    cy.get(`[data-testid="search-bar"]`).type(TEST_LINK_SECOND);
    cy.get(`[data-testid="search-bar-button"]`).click();
    cy.intercept('GET', API_LINK_SECOND).as('fetchDataSecond');
    cy.wait('@fetchDataSecond');

    cy.get(`[data-testid="search-bar"]`).type(TEST_LINK);
    cy.get(`[data-testid="search-bar-button"]`).click();
    cy.intercept('GET', API_LINK).as('fetchDataThird');
    cy.wait('@fetchDataThird', { timeout: 100 }).should('be.rejected');

    cy.get(`[data-testid="issue-card"]`).should('have.length.greaterThan', 0);
  })
})