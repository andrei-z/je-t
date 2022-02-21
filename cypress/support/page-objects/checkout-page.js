import restaurantPage from "./restaurant-page"

class CheckoutPage {

    get checkoutTitle() {
        return cy.get("h3[data-qa='multi-step-checkout-checkout-title']");
    }
    get checkoutRestaurantName() {
        return cy.get("div[data-qa='multi-step-checkout-restaurant-name']");
    }
    get streetInput() {
        return cy.get("input[name='streetName']");
    }
    get houseInput() {
        return cy.get("input[name='streetNumber']");
    }
    get postcodeInput() {
        return cy.get("input[name='postalCode']");
    }
    get cityInput() {
        return cy.get("input[name='city']");
    }
    get fullnameInput() {
        return cy.get("input[name='fullName']");
    }
    get phoneInput() {
        return cy.get("input[name='phoneNumber']");
    }
    get emailInput() {
        return cy.get("input[name='email']");
    }
    get redRequiredIcon() {
        return cy.get("span.H52Nt");
    }
    get redRequiredOutline() {
        return cy.get("label.dEBSa");
    }

    get submitPaymentSelectionBtn() {
        return cy.get("button[data-qa='payment-modal-action-submit']");
    }
    get paymentArea() {
        return cy.get("div[data-qa='multi-step-checkout-details-payment']");
    }
    get paymentMethodSelected() {
        return cy.get("div[data-qa='multi-step-checkout-details-payment-description']");
    }
    get orderAndPayBtn() {
        return cy.get("button[data-qa='multi-step-checkout-action-submit-order']");
    }
    get localErrorBanner() {
        return cy.get("div[data-qa='local-error-banner-delivery']");
    }

    navigateToCheckoutPage(location, resaurant) {
        restaurantPage.navigateToMenuPage(location, resaurant)

        // add an item to cart, and proceed to checkout
        restaurantPage.addChickenBurger(); // qty 1 by default
        restaurantPage.sidebarCheckoutBtn
                .click();
    }

    inputDeliveryDataFromFile() {
        cy.fixture('delivery-data').then((fileData) => {
            this.streetInput.clear().type(fileData.Street);
            this.houseInput.clear().type(fileData.House);
            this.postcodeInput.clear().type(fileData.Postcode);
            this.cityInput.clear().type(fileData.City);
            this.fullnameInput.clear().type(fileData.Fullname);
            this.phoneInput.clear().type(fileData.Phone);
            this.emailInput.clear().type(fileData.Email);
          })
    }

    PaymentMethod(locator) {
        this.paymentArea.click();
        cy.get(locator).click();
        this.submitPaymentSelectionBtn.click();
    }
    selectPayment = {
        Cash: () => this.PaymentMethod("div[data-qa='payment-modal-cash']"),
        PayPal: () => this.PaymentMethod("div[data-qa='payment-modal-paypal']"),
        iDeal: () => this.PaymentMethod("div[data-qa='payment-modal-iDEAL']"),
        Creditcard: () => this.PaymentMethod("div[data-qa='payment-modal-creditcard']"),
        Bitcoin: () => this.PaymentMethod("div[data-qa='payment-modal-bitpay']"),
        VVV: () => this.PaymentMethod("div[data-qa='payment-modal-giftCard']")
    }

}

export default new CheckoutPage();