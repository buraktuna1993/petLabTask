// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('axon is not defined')) {
      return false;
    }
    // returning true here tells Cypress to fail on *other* errors
    return true;
  });

  Cypress.on('window:before:load', (win) => {
    // stub axon globally for all tests
    win.axon = () => {};     // no-op function
    // or, if you want to spy on calls:
    // win.axon = cy.stub().as('axonStub');
  });