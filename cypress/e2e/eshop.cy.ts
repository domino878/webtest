import { planeoEshop } from "../actions/planeo";
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test for example for third party error 
  return false
})
describe(`Test eshop by instructions`, () => {
  it(`Task 1: Test, ktorý vyberie ľubovoľnú kategériu a vloží do košíka prvé 3 najdrahšie položky -
  zároveň skontrolujte, či sa tam tieto položky nachádzajú a následne 1 z nich odstráňte
  a overte, že sa stratila.`, () => {
    // visit eshop
    cy.visit(`https://www.planeo.sk/`);
    const PlaneoEshop = new planeoEshop()
    PlaneoEshop
      .confirmCookie()
      .chooseRandomCategory()
      .sortByPriceDescInsideCategory()

    // Just cover for situacion that item is not available  
    cy.getByTestId(`catalogue.filter.availability.item.checkbox`)
      .first()
      .click({ force: true })

    for (let i = 0; i < 3; i++) {
      PlaneoEshop
        .addItemToBasketByIndex(i)
    }

    // Check notification about number of items in basket
    cy.getByTestId(`basket.count`)
      .should(`contain`, `3 ks`)

    PlaneoEshop
      .openBasket()

    // Check number of items in basket
    cy.getByTestId(`basket-summary.product-count`)
      .should(`contain`, `3 ks`);

    PlaneoEshop
      .removeItemInBasketByIndex(0)

    // Check number of items in basket after remove one item
    cy.getByTestId(`basket-summary.product-count`)
      .should(`contain`, `2 ks`);
  });

  it(`Task 2: Test, ktorý vyhľadá položku: Samsung vo vyhľadavani, a skontroluje, či vyhľadávanie
  funguje.`, () => {
    // Visit eshop
    cy.visit(`https://www.planeo.sk/samsung`);
    // Check if exist samsung item in their shop
    cy.getByTestId(`catalogue.item`)
      .should('exist')
    const PlaneoEshop = new planeoEshop()
    PlaneoEshop
      .confirmCookie()
      .searchItem(`Samsung`)

    // Check if there is any result after search  
    cy.getByTestId(`fulltext.item`)
      .should('exist')

    // Check GTM atr that obtain SAMSUNG
    cy.get('[data-gtm-product-name], [data-gtm-product-brand]')
      .contains('SAMSUNG')
      .should('exist')
  });

  it(`Task 3: Test, ktorý overí, či nie je možné pokračovať k platbe, ak je košík prázdny.`, () => {
    // Visit eshop
    cy.visit(`https://www.planeo.sk/`);
    const PlaneoEshop = new planeoEshop()
    PlaneoEshop
      .confirmCookie()
      .openBasket()

    // Button for continue to pay and delivery should be not present/exist
    cy.getByTestId(`basket-summary.next.button`)
      .should('not.exist')
  });
});