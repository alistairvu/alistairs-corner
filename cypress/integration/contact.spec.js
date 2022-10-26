describe('Contact', () => {
  beforeEach(() => {
    cy.visit('https://alistairs-corner.xyz/contact');
  });

  it('should navigate to the contact page', () => {
    cy.get('h1').contains('get in touch');
  });

  it('should validate and then submit form', () => {
    cy.get('form').submit();

    cy.contains('You must enter a name');
    cy.contains('You must enter an email');
    cy.contains('Please send a message');

    cy.get('#name').type('hello');
    cy.get('#email').type('test');

    cy.contains('Please enter a valid email');
    cy.get('#email').type('@gmail.com');

    cy.get('#message').type('this is a message');

    cy.get('form').submit();

    cy.contains('information sent!');
  });
});
