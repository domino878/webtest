// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject = any> {
        /**
         * Custom command to select an element by data-testid attribute.
         *
         * @example
         * cy.getByTestId('test-id', { timeout: 10000, log: true }).click();
         */
        getByTestId(testId: string,options?: Partial<Loggable & Timeoutable & Withinable>): Chainable<Subject>;
      }
}

Cypress.Commands.add('getByTestId', (testId, options) => {
    return cy.get(`[data-testid="${testId}"]`, options);
  });

