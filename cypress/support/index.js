// cypress/support/index.js
// This file is processed and loaded automatically before your test files.
// It is a great place to put global configuration and behavior that modifies Cypress.

// Import custom commands module
import './commands';

// You can also import other support utilities here, for example:
// import './utils';

// Example: preserve a cookie across all tests
// before(() => {
//   Cypress.Cookies.defaults({
//     preserve: 'session_id'
//   });
// });
Cypress.on('uncaught:exception', (err, runnable) => {
    // We expect a ResizeObserver loop error to occur in certain situations,
    // but we want to ignore it and let the test continue.
    // Prevents Cypress from failing the test
    if (err.message.includes('ResizeObserver loop completed with undelivered notifications')) {
      // Returning false here prevents Cypress from failing the test
      return false;
    }
  
    // You can add handlers for other expected errors here
    // if (err.message.includes('some other expected error')) {
    //   return false;
    // }
  
    // Let other uncaught exceptions fail the test
    // return true; // Default behavior: fail the test
  });

  Cypress.on('window:before:load', (win) => {
    // stub axon globally for all tests
    win.axon = () => {};     // no-op function
    // or, if you want to spy on calls:
    // win.axon = cy.stub().as('axonStub');
  });