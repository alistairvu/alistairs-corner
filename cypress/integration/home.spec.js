describe('Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should see a banner with hello world', () => {
    cy.get('#home-intro').contains('hello, world!');
    cy.get('#home-intro').get('button').should('have.length', 2);
  });

  it('should navigate to about', () => {
    cy.get('#home-intro').get('button[href*="about"]').click();
    cy.url().should('contain', '/about');
  });

  it('should navigate to contact', () => {
    cy.get('#home-intro').get('button[href*="contact"]').click();
    cy.url().should('contain', '/contact');
  });
});
