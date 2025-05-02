# PetLab QA Automation Framework

A Cypress-based end-to-end testing framework for PetLab Co product pages, implemented in JavaScript using the Page Object Model (POM) and data-driven testing.

## Table of Contents

* [Features](#features)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Project Structure](#project-structure)
* [Configuration](#configuration)
* [Running Tests](#running-tests)
* [Writing Tests](#writing-tests)

  * [Page Objects](#page-objects)
  * [Fixtures](#fixtures)
  * [Custom Commands](#custom-commands)
* [Contributing](#contributing)
* [License](#license)
* [Author](#author)

## Features

* **Data-Driven Testing**: Supports multiple URLs and product scenarios via fixtures
* **Page Object Model**: Encapsulates page interactions in reusable classes
* **Custom Commands**: Simplifies repetitive actions (e.g., accepting cookie banners)
* **Retry Logic**: Configured retries for flaky tests (2 retries in CI)
* **Timeout Settings**: Customizable page load and response timeouts
* **Iframe & Real Events**: Handles secure address input and real user event simulation

## Prerequisites

* **Node.js** v14 or higher
* **npm** v6 or higher
* Internet access to target application pages

## Installation

```bash
# Clone the repository
git clone https://github.com/buraktuna1993/petLabTask.git
cd petLabTask

# Install dependencies
npm install
```

## Project Structure

```
petLabTask/
├── cypress/
│   ├── e2e/
│   │   └── petlab_tests.cy.js   # Main test suite
│   ├── fixtures/               # Test data (URLs, products, addresses, footer links)
│   ├── pageObjects/            # Page Object Model classes
│   └── support/                # Custom commands and global hooks
├── cypress.config.js           # Cypress configuration (timeouts, retries)
├── package.json                # Project metadata and npm scripts
└── README.md                   # This documentation file
```

## Configuration

All configuration is managed in `cypress.config.js`:

```js
module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {},
    supportFile: 'cypress/support/index.js'
  },
  pageLoadTimeout: 60000,
  responseTimeout: 20000,
  retries: { runMode: 2, openMode: 0 }
});
```

* **chromeWebSecurity**: Disabled to allow cross-origin iframes
* **pageLoadTimeout**: Wait up to 60 seconds for page to load
* **responseTimeout**: Wait up to 20 seconds for API responses
* **retries**: Retry failed tests twice in CI (`runMode`)

## Running Tests

### Open Interactive Test Runner

```bash
npx cypress open
```

### Run Headless in CI

```bash
npx cypress run
```

## Writing Tests

### Page Objects

* Defined under `cypress/pageObjects/`
* Encapsulate selectors and common actions
* Examples:

  * `ProductPage.js` handles product selection, price verification, subscriptions, and footer links
  * `CheckoutPage.js` fills shipping form via Faker and asserts order summary

### Fixtures

* Located in `cypress/fixtures/`
* Provide test data:

  * `urls.js`: Map of test URLs, names, currency symbols, and keys
  * `products.js`: Expected product names and prices for subscription and one-time purchase
  * `address.js`: Shipping addresses and phone numbers per region
  * `footerLinks.js`: Footer link text and URL paths per region

### Custom Commands

* Defined in `cypress/support/commands.js`
* Example:

  ```js
  Cypress.Commands.add('acceptCookiesBanner', () => {
    cy.get('#onetrust-accept-btn-handler', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });
  });
  ```
* Automatically stub global `axon` in support files to prevent errors

## Contributing

1. Fork the repository
2. Create a new feature branch: `git checkout -b feature/my-test`
3. Commit your changes: `git commit -m 'Add new test scenario'`
4. Push to the branch: `git push origin feature/my-test`
5. Open a Pull Request

Please follow existing patterns for page objects, fixtures, and test naming.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Author

**Burak Tuna** - QA Automation Engineer

Contact: [buraktuna1993@example.com](mailto:buraktuna1993@example.com)
