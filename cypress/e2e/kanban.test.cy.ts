import '@4tw/cypress-drag-drop';
import { IssueStatus } from '../../src/types/IssueStatus';

// UPD: change to your local url (if needed)
const BASE_URL: string = Cypress.config('baseUrl') || '';

const TEST_REPOS = {
  MAIN: {
    URL: 'https://github.com/AnderZerfall/test-data-kanban',
    API: 'https://api.github.com/repos/AnderZerfall/test-data-kanban/issues?state=all',
    OWNER: 'https://github.com/AnderZerfall',
  },
  EXTRA: {
    URL: 'https://github.com/react-dnd/react-dnd',
    API: 'https://api.github.com/repos/react/react/issues?state=all',
    OWNER: 'https://github.com/react-dnd',
  },
  WRONG: {
    URL: 'https://some.finctional.url',
  },
};

const TEST_CARDS = {
  SOURCE: '2856157697',
  TARGET: '2856156005',
  TARGET_COLUMN: '2856157858',
  CARD_1: '2856157697',
  CARD_2: '2856156005',
  CARD_3: '2856157858',
  CARD_4: '2856157608',
  CARD_5: '2856157782',
  CARD_6: '2856157518',
};

const TEST_SELECTORS = {
  LINKS: {
    REPO: '[data-testid="link-repo"]',
    OWNER: '[data-testid="link-owner"]',
  },
  SEARCH: {
    INPUT: '[data-testid="search-bar"]',
    BUTTON: '[data-testid="search-bar-button"]',
  },
  WORK_AREA: {
    AREA: '[data-testid="kanban-area"]',
    CARD: '[data-testid="issue-card"]',
  },
  CARDS: {
    TO_DO: '[data-test-type="issue-ToDo"]',
    IN_PROGRESS: '[data-test-type="issue-InProgress"]',
    DONE: '[data-test-type="issue-Done"]',
  },
  DRAG_DROP: {
    DRAG_CARD: (cardId: string, status: IssueStatus) => `[data-test-draggable="card-draggable-${status}-${cardId}`,
    DROP_CARD: (cardId: string, status: IssueStatus) => `[data-testid="drop-indicator-${status}-${cardId}`,
    DROP_END: (status: IssueStatus) => `[data-testid="drop-indicator-end-${status}"]`,
  },
};

const insertString = (link: string) => {
  if (link) {
    cy.get(TEST_SELECTORS.SEARCH.INPUT).type(link);
  }
  cy.get(TEST_SELECTORS.SEARCH.BUTTON).click();
};

describe('Project Startup', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  it('renders the default elements on the screen', () => {
    // Checks if the kanban area renders properly
    cy.get(TEST_SELECTORS.WORK_AREA.AREA).should('exist');
  });

  it('gets issues from link', () => {
    // STEP 1 download the data
    insertString(TEST_REPOS.MAIN.URL);
    cy.intercept('GET', TEST_REPOS.MAIN.API).as('fetchData');
    cy.wait('@fetchData');

    // STEP 2 put cards into right columns
    cy.get(TEST_SELECTORS.WORK_AREA.CARD).should('have.length.greaterThan', 0);
    cy.get(TEST_SELECTORS.CARDS.TO_DO).should('have.length', 2);
    cy.get(TEST_SELECTORS.CARDS.IN_PROGRESS).should('have.length', 2);
    cy.get(TEST_SELECTORS.CARDS.DONE).should('have.length', 2);
  });

  it('loads issues from session storage', () => {
    // STEP 1 Trying download the data
    insertString(TEST_REPOS.MAIN.URL);
    cy.intercept('GET', TEST_REPOS.MAIN.API).as('fetchData');
    cy.wait(500);

    // STEP 2 the length of the fetch request should be 0, because no request has to ever appear
    cy.get('@fetchData.all').should('have.length', 0);

    // STEP 3 check if the data still persist (if it has been loaded from session storage)
    cy.get(TEST_SELECTORS.WORK_AREA.CARD).should('have.length.greaterThan', 0);
  });
});

describe('Search validation', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  const isInputDanger = () => {
    cy.wait(500);
    cy.get(TEST_SELECTORS.SEARCH.INPUT).should('have.css', 'border-color', 'rgb(215, 83, 101)');
  };

  it('inserts an empty string', () => {
    // STEP 1 input an empty string
    insertString('');

    // STEP 2 check if the input shows error
    isInputDanger();
  });

  it('insert invalid string', () => {
    // STEP 1 input an invalid string
    insertString(TEST_REPOS.WRONG.URL);
    cy.wait(500);

     // STEP 2 check if the input shows error
    isInputDanger();
  });
});

describe('Link to repositories', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
    insertString(TEST_REPOS.MAIN.URL);
  });

  it('link to repository', () => {
    // STEP 1 click on repo link
    cy.get(TEST_SELECTORS.LINKS.REPO).click();
    // STEP 2 check if the user has been redirected to a certain page
    cy.origin('https://github.com', { args: { TEST_REPOS } }, ({ TEST_REPOS }) =>
      cy.url().should('eq', TEST_REPOS.MAIN.URL),
    );
  });

  it('link to owner', () => {
    cy.get(TEST_SELECTORS.LINKS.OWNER).click();
    cy.origin('https://github.com', { args: { TEST_REPOS } }, ({ TEST_REPOS }) =>
      cy.url().should('eq', TEST_REPOS.MAIN.OWNER),
    );
  });
});

describe('Cards movement and storage', () => {
  const draggable = TEST_SELECTORS.DRAG_DROP.DRAG_CARD(TEST_CARDS.SOURCE, IssueStatus.TO_DO);
  const newDraggable = TEST_SELECTORS.DRAG_DROP.DRAG_CARD(TEST_CARDS.SOURCE, IssueStatus.IN_PROGRESS);

  beforeEach(() => {
    cy.visit(BASE_URL);
    insertString(TEST_REPOS.MAIN.URL);
  });

  it('moves to other column', () => {
    const dropZone = TEST_SELECTORS.DRAG_DROP.DROP_CARD(TEST_CARDS.TARGET_COLUMN, IssueStatus.IN_PROGRESS);

    cy.get(draggable).drag(dropZone);

    cy.get(draggable).should('not.exist');
    cy.get(newDraggable).should('exist');
  });

  it('moves to the end of the column', () => {
    const dropZone = TEST_SELECTORS.DRAG_DROP.DROP_END(IssueStatus.IN_PROGRESS);

    cy.get(draggable).drag(dropZone);

    cy.get(draggable).should('not.exist');
    cy.get(newDraggable).should('exist');
  });

  it('moves within the current column', () => {
    const dropZone = TEST_SELECTORS.DRAG_DROP.DROP_CARD(TEST_CARDS.TARGET, IssueStatus.TO_DO);

    cy.get(`[data-test-draggable^="card-draggable-ToDo-"`)
      .eq(0)
      .should('have.attr', 'data-test-draggable', `card-draggable-ToDo-${TEST_CARDS.SOURCE}`);
    cy.get(`[data-test-draggable^="card-draggable-ToDo-"`)
      .eq(1)
      .should('have.attr', 'data-test-draggable', `card-draggable-ToDo-${TEST_CARDS.TARGET}`);

    cy.get(draggable).drag(dropZone);

    cy.get(`[data-test-draggable^="card-draggable-ToDo-"`)
      .eq(0)
      .should('have.attr', 'data-test-draggable', `card-draggable-ToDo-${TEST_CARDS.TARGET}`);
    cy.get(`[data-test-draggable^="card-draggable-ToDo-"`)
      .eq(1)
      .should('have.attr', 'data-test-draggable', `card-draggable-ToDo-${TEST_CARDS.SOURCE}`);
  });

  it('Tests saved cards positioning', () => {
    const dropZone = TEST_SELECTORS.DRAG_DROP.DROP_CARD(TEST_CARDS.TARGET_COLUMN, IssueStatus.IN_PROGRESS);

    cy.get(draggable).drag(dropZone);

    insertString(TEST_REPOS.EXTRA.URL);
    cy.wait(500);
    insertString(TEST_REPOS.MAIN.URL);
    cy.intercept('GET', TEST_REPOS.MAIN.API).as('fetchData');
    cy.wait(500);
    cy.get('@fetchData.all').should('have.length', 0);

    cy.get(`[data-test-draggable^="card-draggable-ToDo-"`)
      .eq(0)
      .should('have.attr', 'data-test-draggable', `card-draggable-ToDo-${TEST_CARDS.CARD_2}`);
    cy.get(`[data-test-draggable^="card-draggable-InProgress-"`)
      .eq(0)
      .should('have.attr', 'data-test-draggable', `card-draggable-InProgress-${TEST_CARDS.CARD_1}`);
  });
});
