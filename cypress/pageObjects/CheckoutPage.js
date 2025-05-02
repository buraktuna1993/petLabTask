import BasePage from "./BasePage";
const { faker } = require('@faker-js/faker');

const selectors = {
    email: "[for='contact-info-email-input']",
    phone: "[for='contact-info-phone-input']",
    address: "#Field-addressLine1Input",
    iframe: "iframe[title='Secure address input frame']",
    firstName: "#Field-firstNameInput",
    lastName: "#Field-lastNameInput",
    agreeToTermsCheckbox: "[data-testid='CONTACT_INFORMATION__TERMS']",
    tax: "[data-testid='ORDER_SUMMARY__TAXES']",
    discount: "[data-testid='ORDER_SUMMARY__SAVINGS']",
    price: "[data-testid='ORDER_SUMMARY__TOTAL']",
    shipping: "[data-testid='ORDER_SUMMARY__SHIPPING']"
}

class CheckoutPage extends BasePage {

    fillShippingForm(address, urlKey) {

        let firstName = faker.person.firstName();
        let lastName = faker.person.lastName();
        let email = faker.internet.email(firstName, lastName)

        let shippingData;
        if (urlKey == "probioticChewsUK") {
            shippingData = address.UK;
        } else {
            shippingData = address.US;
        }
        cy.get(selectors.email)
            .should('be.visible')
            .type(email)

        cy.get(selectors.phone)
            .should('be.visible')
            .type(shippingData.phone)

        cy.get(selectors.agreeToTermsCheckbox)
            .click();

        cy.get(selectors.iframe)
            .should('be.visible')
            .its('0.contentDocument.body').should('not.be.empty')
            .then(cy.wrap)
            .as('iframe');

        cy.get('@iframe').find(selectors.firstName)
            .should('be.visible')
            .clear()
            .type(firstName);

        cy.get('@iframe').find(selectors.lastName)
            .should('be.visible')
            .clear()
            .type(lastName);

        cy.get('@iframe').find(selectors.address)
            .should('be.visible')
            .clear()
            .type(shippingData.address)
            .type('{enter}');

    }
    assertOrderSummary(urlKey) {
        cy.get(selectors.price)
            .should('be.visible');

        cy.get(selectors.discount)
            .should('be.visible');
        if (urlKey != "probioticChewsUK") {
            cy.get(selectors.tax)
                .should('be.visible');
        }
        cy.get(selectors.shipping)
            .should('be.visible');
    }

}
export default new CheckoutPage;