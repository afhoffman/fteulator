// Use `cy.dataCy` custom command for more robust tests
// See https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements

// ** This file is an example of how to write Cypress tests, you can safely delete it **

// This test will pass when run against a clean Quasar project
// describe('Landing', () => {
//   beforeEach(() => {
//     cy.visit('/');
//   });
//   it('.should() - assert that <title> is correct', () => {
//     cy.title().should('include', 'fte');
//   });
// });

describe('Initial Load', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Card exists and has title', () => {
    cy.dataCy('index-main-card').should('exist');
    cy.dataCy('main-card-title').should('contain', 'FTE-ulator');
  });

  it('has an add task button', () => {
    cy.dataCy('add-task-button').should('exist');
  });

  it('has project title, duration, and duration meta', () => {
    cy.dataCy('index-project-title').should('exist');
    cy.dataCy('index-project-duration').should('exist');
    cy.dataCy('index-project-meta-select').should('exist');
  });
});

describe('Set project duration, add task, check values, reset', () => {
  before(() => {
    cy.visit('/');
  });

  it('Can add a project title', () => {
    cy.dataCy('index-project-title')
      .type('Test Project Name')
      .should('contain.value', 'Test Project Name');
  });

  it('Can set project duration & meta', () => {
    cy.dataCy('index-project-duration')
      .clear()
      .type('6')
      .should('contain.value', '6');
    cy.dataCy('index-project-meta-select').click();
    cy.get('.q-item__label').contains('month(s)').click();
    cy.dataCy('index-project-meta-select')
      .children('span')
      .should('contain', 'month(s)');
  });

  it('Displays reset button after change', () => {
    cy.dataCy('index-reset-button').should('exist');
  });

  it('Can open add task dialog', () => {
    cy.dataCy('add-task-button').click();
    cy.dataCy('add-task-cancel-button').click();
  });

  it('Add 4.25hr per day task', () => {
    const taskName = 'New Task 1';
    cy.dataCy('add-task-button').click();
    // cy.dataCy('add-task-button').click();
    cy.dataCy('new-task-name-input')
      .type(taskName)
      .should('contain.value', taskName);
    cy.dataCy('new-task-hrs-input')
      .clear()
      .type('4')
      .should('contain.value', '4');
    cy.dataCy('new-task-mins-input')
      .clear()
      .type('15')
      .should('contain.value', '15');
    cy.dataCy('add-task-submit-button').click();
    cy.dataCy('index-total-fte').should('contain', '0.53');
    cy.dataCy('index-total-fte-over-pop').should('contain', '0.265');

    cy.get('.q-table > tbody > tr')
      .contains('tr', taskName)
      .children()
      .eq(1)
      .should('contain', '4.250');

    cy.get('.q-table > tbody > tr')
      .contains('tr', taskName)
      .children()
      .eq(2)
      .should('contain', 'day');

    cy.get('.q-table > tbody > tr')
      .contains('tr', taskName)
      .children()
      .eq(3)
      .should('contain', '0.530');

    cy.get('.q-table > tbody > tr')
      .contains('tr', taskName)
      .children()
      .eq(4)
      .should('contain', '0.265');
  });

  it('Has result table after first entry', () => {
    cy.dataCy('index-result-table').should('exist');
  });

  it('Can add 2hr per week task', () => {
    const taskName = 'New Task 2';
    cy.dataCy('add-task-button').click();
    cy.dataCy('new-task-name-input')
      .type(taskName)
      .should('contain.value', taskName);
    cy.dataCy('new-task-hrs-input')
      .clear()
      .type('2')
      .should('contain.value', '2');
    cy.dataCy('new-task-duration-select').click();
    cy.get('.q-item__label').contains('week').click();
    cy.dataCy('new-task-duration-select')
      .children('span')
      .should('contain', 'week');
    cy.dataCy('add-task-submit-button').click();

    cy.get('.q-table > tbody > tr')
      .contains('tr', taskName)
      .children()
      .eq(1)
      .should('contain', '2.000');

    cy.get('.q-table > tbody > tr')
      .contains('tr', taskName)
      .children()
      .eq(2)
      .should('contain', 'week');

    cy.get('.q-table > tbody > tr')
      .contains('tr', taskName)
      .children()
      .eq(3)
      .should('contain', '0.050');

    cy.get('.q-table > tbody > tr')
      .contains('tr', taskName)
      .children()
      .eq(4)
      .should('contain', '0.025');
  });

  it('Can add 10hr per month task', () => {
    const taskName = 'New Task 3';

    cy.dataCy('add-task-button').click();
    cy.dataCy('new-task-name-input')
      .type(taskName)
      .should('contain.value', taskName);
    cy.dataCy('new-task-hrs-input')
      .clear()
      .type('10')
      .should('contain.value', '10');
    cy.dataCy('new-task-duration-select').click();
    cy.get('.q-item__label').contains('month').click();
    cy.dataCy('new-task-duration-select')
      .children('span')
      .should('contain', 'month');
    cy.dataCy('add-task-submit-button').click();

    cy.get('.q-table > tbody > tr')
      .contains('tr', taskName)
      .children()
      .eq(1)
      .should('contain', '10');

    cy.get('.q-table > tbody > tr')
      .contains('tr', taskName)
      .children()
      .eq(2)
      .should('contain', 'month');

    cy.get('.q-table > tbody > tr')
      .contains('tr', taskName)
      .children()
      .eq(3)
      .should('contain', '0.060');

    cy.get('.q-table > tbody > tr')
      .contains('tr', taskName)
      .children()
      .eq(4)
      .should('contain', '0.030');
  });

  it('Can add 100hr per year task', () => {
    const taskName = 'New Task 4';

    cy.dataCy('add-task-button').click();
    cy.dataCy('new-task-name-input')
      .type(taskName)
      .should('contain.value', taskName);
    cy.dataCy('new-task-hrs-input')
      .clear()
      .type('100')
      .should('contain.value', '100');
    cy.dataCy('new-task-duration-select').click();
    cy.get('.q-item__label').contains('year').click();
    cy.dataCy('new-task-duration-select')
      .children('span')
      .should('contain', 'year');
    cy.dataCy('add-task-submit-button').click();

    cy.get('.q-table > tbody > tr')
      .contains('tr', taskName)
      .children()
      .eq(1)
      .should('contain', '100.000');

    cy.get('.q-table > tbody > tr')
      .contains('tr', taskName)
      .children()
      .eq(2)
      .should('contain', 'year');

    cy.get('.q-table > tbody > tr')
      .contains('tr', taskName)
      .children()
      .eq(3)
      .should('contain', '0.050');

    cy.get('.q-table > tbody > tr')
      .contains('tr', taskName)
      .children()
      .eq(4)
      .should('contain', '0.025');
  });
  it('Can add 8hr per sprint task', () => {
    const taskName = 'New Task 5';
    cy.dataCy('add-task-button').click();
    cy.dataCy('new-task-name-input')
      .type(taskName)
      .should('contain.value', taskName);
    cy.dataCy('new-task-hrs-input')
      .clear()
      .type('8')
      .should('contain.value', '8');
    cy.dataCy('new-task-duration-select').click();
    cy.get('.q-item__label').contains('sprint').click();
    cy.dataCy('new-task-duration-select')
      .children('span')
      .should('contain', 'sprint');
    cy.dataCy('add-task-submit-button').click();

    cy.get('.q-table > tbody > tr')
      .contains('tr', taskName)
      .children()
      .eq(1)
      .should('contain', '8.000');

    cy.get('.q-table > tbody > tr')
      .contains('tr', taskName)
      .children()
      .eq(2)
      .should('contain', 'sprint');

    cy.get('.q-table > tbody > tr')
      .contains('tr', taskName)
      .children()
      .eq(3)
      .should('contain', '0.100');

    cy.get('.q-table > tbody > tr')
      .contains('tr', taskName)
      .children()
      .eq(4)
      .should('contain', '0.050');
  });

  it('Can reset the form', () => {
    cy.dataCy('index-reset-button').click();
    cy.get('button').contains('OK').click();

    cy.dataCy('index-project-title').should('contain.value', '');
    cy.dataCy('index-project-duration').should('contain.value', '1');
    cy.dataCy('index-project-meta-select')

      .children('span')
      .should('contain', 'year(s)');
    cy.dataCy('index-reset-button').should('not.exist');
    cy.dataCy('index-result-table').should('not.exist');
  });
});

// ** The following code is an example to show you how to write some tests for your home page **
//
// describe('Home page tests', () => {
//   beforeEach(() => {
//     cy.visit('/');
//   });
//   it('has pretty background', () => {
//     cy.dataCy('landing-wrapper')
//       .should('have.css', 'background')
//       .and('match', /(".+(\/img\/background).+\.png)/);
//   });
//   it('has pretty logo', () => {
//     cy.dataCy('landing-wrapper img')
//       .should('have.class', 'logo-main')
//       .and('have.attr', 'src')
//       .and('match', /^(data:image\/svg\+xml).+/);
//   });
//   it('has very important information', () => {
//     cy.dataCy('instruction-wrapper')
//       .should('contain', 'SETUP INSTRUCTIONS')
//       .and('contain', 'Configure Authentication')
//       .and('contain', 'Database Configuration and CRUD operations')
//       .and('contain', 'Continuous Integration & Continuous Deployment CI/CD');
//   });
// });
