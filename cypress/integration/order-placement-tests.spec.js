import restaurantPage from "../support/page-objects/restaurant-page";
import { restaurants } from "../support/test-data";
/// <reference types="cypress" />

const location = '8766';
const restaurant = 'BRT_Cypress';
const restaurantName = restaurants[restaurant].fullname;

describe('Order placement tests', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        restaurantPage.navigateToMenuPage(location, restaurant);
    })

    it('Open Restaurant menu', () => {
        restaurantPage.restaurantHeaderText
            .should('have.text', restaurantName);
        restaurantPage.popularItemsSection
            .should('be.visible');
    })

    it('Add items and check their Qty in basket', () => {
        const smallBeefQty = 1;
        const bigBeefQty = 3;
        const chickenQty = 4;

        restaurantPage.addBeefBurger(smallBeefQty);
        restaurantPage.addChickenBurger(chickenQty);
        restaurantPage.addBeefBurger(bigBeefQty, 'Big');

        restaurantPage.beefBurgersInCart('Small')
                .should('have.text', smallBeefQty.toString());

        restaurantPage.chickenBurgersInCart()
                .should('have.text', chickenQty.toString());

        restaurantPage.beefBurgersInCart('Big')
                .should('have.text', bigBeefQty.toString());
    })

})