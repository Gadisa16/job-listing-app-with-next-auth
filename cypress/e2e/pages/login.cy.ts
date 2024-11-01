export class Login{
    login = (email: string, password: string) => {
    cy.get(':nth-child(1) > .bg-white').type(email);
    cy.get(':nth-child(2) > .bg-white').type(password);
    cy.get('.py-4').click();
    cy.contains('Sign Out').should('be.visible');
}
}