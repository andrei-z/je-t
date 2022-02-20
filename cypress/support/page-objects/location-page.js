class LocationPage {

    // elements
    get fromLocation() {
      return cy.get("span[data-qa='header-location-element'] > span");
    }

    get searchField() {
      return cy.get("input[data-qa='restaurant-list-search-element']");
    }

    dataElements = {
      searchResult: (title) => cy.get(`a[title='${title}']`)
    }

    navigateToLocation(location) {
      const url = (`/delivery/food/${location}?showTestRestaurants=true`);
      cy.visit(url, {failOnStatusCode: false});

      // wait for "Checking your browser" to finish
      cy.get("span[data-translate='checking_browser']")
        .should('not.exist', {timeout: 10000});

    }

    searchFor(userInput) {
      this.searchField
        .type(`${userInput}{enter}`);
    }

    findAndSelectRestaurant(restaurant) {
      this.searchFor(restaurant);
      this.dataElements
          .searchResult(restaurant).click()
    }

  }

  export default new LocationPage();