import productPage from '../pageObjects/ProductPage';
import urls from '../fixtures/urls';
import footerLinks from '../fixtures/footerLinks';
import checkoutPage from '../pageObjects/CheckoutPage';
import address from '../fixtures/address'
import products from '../fixtures/products';

describe('PetLab Co Product Page Tests', () => {


    Object.values(urls).forEach(testCase => {
        context(`${testCase.name} - ${testCase.url}`, () => {
             beforeEach(() => {
                productPage.visit(testCase.url);
            });

            it('should load the page successfully', () => {
                productPage.verifyPageLoadSuccess(testCase.url);
            });

            it('displays the correct price for each product', () => {
                productPage.verifyProductAndPrices(products, testCase.urlKey);
            })

            it('should display prices in the correct currency', () => {
                 productPage.verifyCurrency(testCase.currency, testCase.urlKey);
            });

            it('updates the price when the Subscription button is clicked', () => {
                if(testCase.urlKey=="probioticChewsUSStockUp"){
                   return;
                } else {
                    productPage.verifyPriceIsChanged(testCase.urlKey);
                }
            })

            it('should verify footer links navigate correctly', () => {
                 productPage.verifyAllFooterLinks(footerLinks, testCase.urlKey);
            });

            it('should verify prices in order summary', () => {
                productPage.selectFirstProduct(testCase.urlKey);
                productPage.clickAddToCart(testCase.urlKey);
                checkoutPage.fillShippingForm(address, testCase.urlKey);
                checkoutPage.assertOrderSummary(testCase.urlKey);
            });

        });
    });
});