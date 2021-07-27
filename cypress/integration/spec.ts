import 'cypress-file-upload';

describe('My First Test', () => {
  it('smoke test', () => {
    cy.visit('/user')
    cy.contains('First Name')
  });

  it('should fill out all input fields and click save', () => {
    cy.visit('/user');
    cy.get('.add-user-btn').click();
    cy.contains('Enter your first name');
    cy.get('input[name="firstName"]')
      .type('Darius');
    cy.get('input[name="lastName"]')
      .type('der Großherzige');
    cy.get('input[name="email"]')
      .type('darius@yahoo.de');
    cy.get('input[name="street"]')
      .type('Steinstraße');
    cy.get('input[name="houseNumber"]')
      .type('5a');
    cy.get('input[name="zipCode"]')
      .type('12345');
    cy.get('input[name="city"]')
      .type('Hannover');
    cy.get('button[type="submit"]').click();
  });

  it('should open a users entry', () => {
    cy.visit('/user');
    cy.contains('td', 'Alina').click();
  });

  it('should upload a profile picture', () => {
    cy.fixture('test_pic.png').then(fileContent => {
        cy.get('input[type="file"]').attachFile({
            fileContent: fileContent.toString(),
            fileName: 'test_pic.png',
            mimeType: 'image/png'
        });
    });
});

})