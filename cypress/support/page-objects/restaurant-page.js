import locationPage from "./location-page"
import { locations, restaurants } from "../test-data"

class RestaurantPage {

    // elements
    get restaurantHeaderText() {
       return cy.get("h1[data-qa='restaurant-header-text']");
    }

    get popularItemsSection() {
        return cy.get("section[data-qa='popular-items']");
    }

    get burgersCategory() {
        return cy.get("span._2GJkOJ").contains('Burgers');
    }

    get burgerItem() {
        return cy.get("section[data-category-hash='category_burgers'] h3[data-qa='heading']");
    }

    get beefBurgerSelect() {
        return cy.get("div._35ScA select");
    }

    get addToBasketBtn() {
        return cy.get("button[data-qa='item-choices-action-submit']");
    }

    get plusOneBtn() {
        return cy.get("div._3a9Pe span[data-qa='item-choices-amount-action-increment']");
    }

    get cartItem() {
        return cy.get("strong.Cu32pm");
    }

    get cartItemDescription() {
        return cy.get("div[data-qa='cart-item-description'] > div._1wAtD > div");
    }

    get sidebarCheckoutBtn() {
        return cy.get("button[data-qa='sidebar-action-checkout']");
    }

    dataElements = {
        searchResult: (title) => cy.get(`a[title='${title}']`)
      }

    chickenBurgersInCart = () => this.cartItem.contains('Chicken Burger')
                .parents()
                .children("div[data-qa='cart-item-quantity']");

    beefBurgersInCart = (size) =>  this.cartItemDescription.contains(size)
            .parents()
            .children("div[data-qa='cart-item-quantity']");

    navigateToMenuPage(location, resaurant) {
        // to prevent unwanted redirects, go to the location first
        locationPage.navigateToLocation(locations[location].path);

        const url = (`/menu/${restaurants[resaurant].url}`);
        cy.visit(url, {failOnStatusCode: false});

        this.popularItemsSection
            .should('be.visible');
    }

    addBeefBurger(qty=1, size='Small') {
        this.burgersCategory.click();

        this.burgerItem.contains('Beef Burger').click();
        const sizes = {
            Small: 'O3RRNNP1N1',
            Big: 'O3055QO031'
        }
        this.beefBurgerSelect.select(sizes[size]);

        if (qty == 1) {
            this.addToBasketBtn.click();
        }

        if (qty > 1) {
            for (let i=1; i<qty; i++) {
                this.plusOneBtn.click();
                cy.wait(500);
            }
            this.addToBasketBtn.click();
        }
    }

    addChickenBurger(qty=1) {
        this.burgersCategory.click();

        for (let i=0; i<qty; i++) {
            this.burgerItem.contains('Chicken Burger')
            .click();
            cy.wait(500);
        }

    }

}

export default new RestaurantPage();