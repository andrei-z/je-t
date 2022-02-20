import checkoutPage from "../support/page-objects/checkout-page";
import { restaurants } from "../support/test-data";
/// <reference types="cypress" />

const location = '8766';
const restaurant = 'BRT_Cypress';
const restaurantName = restaurants[restaurant].fullname;

describe('Checkout tests', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        checkoutPage.navigateToCheckoutPage(location, restaurant)
    })

    it('Navigation to Checkout page', () => {
        cy.url()
                .should('include', '#checkout');
        checkoutPage.checkoutTitle
                .should('have.text', 'Checkout');
        checkoutPage.checkoutRestaurantName
                .should('have.text', restaurantName);
    })

    it('Input delivery data from file', () => {
        checkoutPage.inputDeliveryDataFromFile();

        checkoutPage.redRequiredIcon
            .should('not.exist')
        checkoutPage.redRequiredOutline
            .should('not.exist')
    })

    it('Select payment method', () => {
        const method = 'Cash';
        checkoutPage.selectPayment(method);

        checkoutPage.paymentMethodSelected
                .should('include.text', method);
    })

    it('Cannot place order when in a different region', () => {
        checkoutPage.inputDeliveryDataFromFile();
        checkoutPage.selectPayment('Cash');
        checkoutPage.orderAndPayBtn.click();

        cy.fixture('delivery-data').then((fileData) => {
            checkoutPage.localErrorBanner
                .should('be.visible')
                .and('include.text', `${restaurantName} does not deliver in the delivery area ${fileData.Postcode}`);
          })
    })
})