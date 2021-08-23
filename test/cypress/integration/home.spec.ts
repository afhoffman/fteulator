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

import { MultipleProjectDurations } from '../data/models';
import { sixMonthData } from '../data/sixMonth';
import { fourSprintData } from '../data/fourSprint';
import { oneYearData } from '../data/oneYear';
import { sixtyDayData } from '../data/sixtyDay';

const projectDurationData: MultipleProjectDurations[] = [
  sixMonthData,
  fourSprintData,
  oneYearData,
  sixtyDayData,
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

for (const $data of projectDurationData) {
  describe(`${$data.length} ${$data.lengthMeta} test`, () => {
    before(() => {
      cy.visit('/');
    });

    it('Can add a project title', () => {
      cy.dataCy('index-project-title')
        .type($data.title)
        .should('contain.value', $data.title);
    });

    it('Can set project duration & meta', () => {
      cy.dataCy('index-project-duration')
        .clear()
        .type($data.length)
        .should('contain.value', $data.length);
      cy.dataCy('index-project-meta-select').click();
      cy.get('.q-item__label').contains($data.lengthMeta).click();
      cy.dataCy('index-project-meta-select')
        .children('span')
        .should('contain', $data.lengthMeta);
    });

    for (const testTask of $data.tasks) {
      it(`Add ${testTask.output.hrs} hr per ${testTask.repeatFreq} task`, () => {
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
}
