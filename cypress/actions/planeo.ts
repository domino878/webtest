export class planeoEshop {
    confirmCookie() {
        cy.get(`#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll`)
            .click()
        return this
    }

    chooseRandomCategory() {
        cy.getByTestId(`burger`)
            .click()
        cy.getByTestId(`catalogue-category`)
            .find(`a[data-testid="catalogue-category.lvl1-category.link"]`)
            .then($liElements => {
                const randomIndex = Math.floor(Math.random() * $liElements.length);
                const randomLi = $liElements.eq(randomIndex);
                cy.wrap(randomLi).click({ force: true })
            });
        return this
    }

    sortByPriceDescInsideCategory() {
        cy.getByTestId(`catalogue.sorting.price-desc`)
            .click({ force: true })
        cy.url().should(`include`, `sort=PRICE_DESC`)
        return this
    }

    addItemToBasketByIndex(index: number) {
        cy.getByTestId(`catalogue.item.add-to-cart.cart-icon`)
            .eq(index)
            .click({ force: true })
        cy.getByTestId(`add-to-basket-lightbox.continue-shopping`)
            .click()
        return this
    }

    openBasket() {
        cy.getByTestId(`basket`)
            .click()
        cy.url()
            .should(`eq`, `https://www.planeo.sk/kosik`)
        return this
    }

    removeItemInBasketByIndex(index: number) {
        cy.getByTestId(`basket-content.item.quantity.remove-button`)
            .eq(index)
            .click()
        return this
    }

    searchItem(item: string) {
        cy.getByTestId(`search.input`)
            .type(item)
        cy.getByTestId(`search.button`)
            .click()
        return this
    }
}