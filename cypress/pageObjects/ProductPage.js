import BasePage from './BasePage';
const selectors = {
    totalPriceSubUK: '[data-element-id="total-price-sub"] .fs-2',
    totalPriceOtpUK: '[data-element-id="total-price-otp"] .fs-2',
    totalPriceStock: '.gap-1 [data-section-id="price"] strong',
    totalPriceUS: '.py-1 > span',
    currency: ".text-evergreen_green > strong",
    currencyUS: "span.py-1",
    currencyUSStock: ".items-end .price .text-evergreen_green",
    addtoCartBtn: ".add-to-cart-button-new_year_2025",
    addToCartBtnUK: "span.py-1",
    productSelectorUS: '[data-section-id="quantity-selector"]',
    firstProduct: '[data-section-id="quantity-selector"] > div:nth-child(1)',
    secondProduct: '[data-section-id="quantity-selector"] > div:nth-child(2)',
    thirdProduct: '[data-section-id="quantity-selector"] > div:nth-child(3)',
    subscribeBtnUS: '.relative > :nth-child(1) > .block',
    subscribeOnBtnUK: '[data-element-id="subscribe-and-save"]',
    subscribeOffBtnUK: '[data-element-id="one-time"]'
}

class ProductPage extends BasePage {

    selectFirstProduct() {
        cy.get(selectors.firstProduct).click({ force: true });
        return cy.get(selectors.firstProduct).should('be.visible').invoke('text');
    }

    selectSecondProduct() {
        cy.get(selectors.secondProduct).click({ force: true })
        return cy.get(selectors.secondProduct).should('be.visible').invoke('text');
    }

    selectThirdProduct() {
        cy.get(selectors.thirdProduct).click({ force: true });
        return cy.get(selectors.thirdProduct).should('be.visible').invoke('text');
    }

    clickSubOnBtn(urlKey) {
        if (urlKey === 'probioticChewsUK') {
            return cy
                .get(selectors.subscribeOnBtnUK).should('be.visible').click({ force: true })
                .get(selectors.totalPriceSubUK).invoke('text');
        } else {
            return cy
                .get(selectors.subscribeBtnUS).should('be.visible').click({ force: true })
                .get(selectors.totalPriceUS).invoke('text');
        }
    }

    clickSubOffBtn(urlKey) {
        if (urlKey === 'probioticChewsUK') {
            return cy
                .get(selectors.subscribeOffBtnUK).scrollIntoView().should('be.visible').click({ force: true })
                .get(selectors.totalPriceOtpUK).invoke('text');
        } else {
            return cy
                .get(selectors.subscribeBtnUS).scrollIntoView().should('be.visible').click({ force: true })
                .get(selectors.totalPriceUS).invoke('text');
        }
    }

    clickAddToCart(urlKey) {
        let addToCartBtn;
        if (urlKey == "probioticChewsUSStockUp") {
            addToCartBtn = selectors.addtoCartBtn;
        } else {
            addToCartBtn = selectors.addToCartBtnUK;
        }
        cy.get(addToCartBtn)
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true });
    }

    currencySymbolElement(urlKey) {
        if (urlKey == "probioticChewsUK") {
            return cy.get(selectors.currency)
        } else if (urlKey == "probioticChewsUSStockUp") {
            return cy.get(selectors.currencyUSStock)
        } else {
            return cy.get(selectors.currencyUS)
        }
    }

    verifyPageLoadSuccess(url) {
        cy.url().should('include', url.split('/').pop());
    }

    verifyProductAndPrices(products, urlKey) {
        const modes = ['sub', 'otp'];
        const slots = ['First', 'Second', 'Third'];
        const isUSStockUp = urlKey === "probioticChewsUSStockUp";

        modes.forEach(mode => {
            const bucket = products[mode][urlKey];
            if (!bucket) return;

            if (mode === 'otp' && !isUSStockUp) {
                this.clickSubOffBtn(urlKey);
            }

            slots.forEach(slot => {
                const methodName = `select${slot}Product`;
                const productKey = slot.toLowerCase() + 'Product';
                const { name, price } = bucket[productKey];
                const isUK = /uk$/i.test(urlKey);


                this[methodName](urlKey).then(selectedName => {
                    expect(selectedName).to.include(name);
                    cy.contains(name).click();

                    if (mode === 'otp') {
                        this[methodName](urlKey);
                        cy.wait(2000);
                    }

                    let priceSel;
                    if (mode === 'sub') {
                        priceSel = isUK
                            ? selectors.totalPriceSubUK
                            : (isUSStockUp
                                ? selectors.totalPriceStock
                                : selectors.totalPriceUS);
                    }
                    else {
                        priceSel = isUK
                            ? selectors.totalPriceOtpUK
                            : (isUSStockUp
                                ? selectors.totalPriceStock
                                : selectors.totalPriceUS);
                    }


                    cy.get(priceSel)
                        .invoke('text').then(totalPrice => {
                            expect(totalPrice).contains(price);
                        })

                })
            })

        })

    }

    verifyCurrency(expectedCurrencySymbol, urlKey) {
        this.currencySymbolElement(urlKey).should('contain.text', expectedCurrencySymbol);
    }

    verifyAllFooterLinks(footerLinksData, urlKey) {
        if (urlKey == 'probioticChewsUK') {
            Object.values(footerLinksData.UK).forEach(linkInfo => {
                this.verifyFooterLink(linkInfo.text, linkInfo.urlPath);
            });
        } else {
            Object.values(footerLinksData.US).forEach(linkInfo => {
                this.verifyFooterLink(linkInfo.text, linkInfo.urlPath);
            });
        }
    }
    
    verifyPriceIsChanged(urlKey) {
        this.clickSubOffBtn(urlKey)
            .then(priceBefore => {
                if (urlKey == "probioticChewsUK") {
                    this.clickSubOffBtn(urlKey);
                }
                this.clickSubOnBtn(urlKey)
                    .then(priceAfter => {
                        expect(priceAfter).not.to.eq(priceBefore);
                    });
            });
    }
}
export default new ProductPage();