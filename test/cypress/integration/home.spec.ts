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

type RepeatFreq = 'day' | 'week' | 'month' | 'sprint' | 'year';

type TestInputsAndOutputs = {
  name: string;
  durationHrs: string;
  durationMins: string;
  repeatFreq: RepeatFreq;
  output: {
    hrs: string;
    repeat: RepeatFreq;
    fte: string;
    fteOverPoP: string;
  };
};

const sixMonthTasks: TestInputsAndOutputs[] = [
  {
    name: 'New Task 1',
    durationHrs: '4',
    durationMins: '15',
    repeatFreq: 'day',
    output: { hrs: '4.250', repeat: 'day', fte: '0.53', fteOverPoP: '0.265' },
  },
  {
    name: 'New Task 2',
    durationHrs: '2',
    durationMins: '0',
    repeatFreq: 'week',
    output: { hrs: '2.000', repeat: 'week', fte: '0.050', fteOverPoP: '0.025' },
  },
  {
    name: 'New Task 3',
    durationHrs: '10',
    durationMins: '0',
    repeatFreq: 'month',
    output: {
      hrs: '10.000',
      repeat: 'month',
      fte: '0.060',
      fteOverPoP: '0.030',
    },
  },
  {
    name: 'New Task 4',
    durationHrs: '100',
    durationMins: '0',
    repeatFreq: 'year',
    output: {
      hrs: '100.000',
      repeat: 'year',
      fte: '0.050',
      fteOverPoP: '0.025',
    },
  },
  {
    name: 'New Task 5',
    durationHrs: '8',
    durationMins: '0',
    repeatFreq: 'sprint',
    output: {
      hrs: '8.000',
      repeat: 'sprint',
      fte: '0.100',
      fteOverPoP: '0.050',
    },
  },
];

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

  for (const testTask of sixMonthTasks) {
    it(`Add ${testTask.output.hrs}hr per ${testTask.repeatFreq} task`, () => {
      console.log(testTask.name);
      cy.dataCy('add-task-button').click();
      // cy.dataCy('add-task-button').click();
      cy.dataCy('new-task-name-input')
        .type(testTask.name)
        .should('contain.value', testTask.name);
      cy.dataCy('new-task-hrs-input')
        .clear()
        .type(testTask.durationHrs)
        .should('contain.value', testTask.durationHrs);
      cy.dataCy('new-task-mins-input')
        .clear()
        .type(testTask.durationMins)
        .should('contain.value', testTask.durationMins);
      cy.dataCy('new-task-duration-select').click();
      cy.get('.q-item__label').contains(testTask.repeatFreq).click();
      cy.dataCy('new-task-duration-select')
        .children('span')
        .should('contain', testTask.repeatFreq);
      cy.dataCy('add-task-submit-button').click();

      cy.get('.q-table > tbody > tr')
        .contains('tr', testTask.name)
        .children()
        .eq(1)
        .should('contain', testTask.output.hrs);

      cy.get('.q-table > tbody > tr')
        .contains('tr', testTask.name)
        .children()
        .eq(2)
        .should('contain', testTask.output.repeat);

      cy.get('.q-table > tbody > tr')
        .contains('tr', testTask.name)
        .children()
        .eq(3)
        .should('contain', testTask.output.fte);

      cy.get('.q-table > tbody > tr')
        .contains('tr', testTask.name)
        .children()
        .eq(4)
        .should('contain', testTask.output.fteOverPoP);
    });
  }

  it('Has result table after adding data', () => {
    cy.dataCy('index-result-table').should('exist');
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
