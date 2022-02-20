import locationPage from "../support/page-objects/location-page";
import restaurantPage from "../support/page-objects/restaurant-page";
import { locations, restaurants } from "../support/test-data";
/// <reference types="cypress" />

const location = '8766';
const restaurant = 'BRT_Cypress';
const restaurantName = restaurants[restaurant].fullname;
const restaurantUrl = restaurants[restaurant].url;

describe("Location tests", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    locationPage.navigateToLocation(locations[location].path);
  });

  it("Open Location to order from", () => {
    locationPage.fromLocation
        .should("have.text", locations[location].title);
  });

  it("Restaurant can be found", () => {
    locationPage.searchFor(restaurantName);
    locationPage.dataElements.searchResult(restaurantName)
        .should("include.text", restaurantName)
  });

  it("Navigation to Restaurant from search", () => {
    locationPage.findAndSelectRestaurant(restaurantName);

    cy.url()
        .should("include", restaurantUrl);
    restaurantPage.restaurantHeaderText
        .should("have.text", restaurantName);
  });
});
