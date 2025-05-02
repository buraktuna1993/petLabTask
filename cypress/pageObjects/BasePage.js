const selectors = {
    footer: "#funnel-footer"
}
class BasePage {

    visit(url) {
        cy.visit(url);
        cy.acceptCookiesBanner();
    }

     verifyFooterLink(linkText, expectedUrlPath) {
         cy.get(selectors.footer).contains(linkText).should('have.attr', 'href').and('include', expectedUrlPath);
     }
}
export default BasePage;