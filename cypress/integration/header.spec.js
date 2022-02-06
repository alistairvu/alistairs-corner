const SITE_MAP = require('../../src/constants/siteMap').default;

describe('Header', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should see a full header element when width is high enough', () => {
    cy.viewport('macbook-13');

    cy.get('#top-nav').contains("alistair's corner");

    SITE_MAP.forEach(({ title, link }) => {
      cy.get('#top-nav').contains(title);
      cy.get('#top-nav').find(`a[href*="${link}"]`);
    });
  });

  it('should see a narrow header when width is small enough', () => {
    cy.viewport('iphone-xr');

    cy.get('#top-nav').contains('a');
    cy.get('#header-overlay').should('have.css', 'display', 'none');

    cy.get('#top-nav').find('.hamburger-react').click();
    cy.get('#header-overlay').should('have.css', 'display', 'block');

    SITE_MAP.forEach(({ title, link }) => {
      cy.get('#top-nav').contains('a', title);
      cy.get('#top-nav').find(`a[href*="${link}"]`);
    });

    cy.visit('/about');
    cy.get('#header-overlay').should('have.css', 'display', 'none');
  });
});
