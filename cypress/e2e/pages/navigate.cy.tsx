export class Navigate{
    navigate = () => {
    cy.contains(/Sign Out/i)
    cy.get('[data-testid="job-card-65509e9353a7667de6ef5a60"]', {timeout:10000}).should('be.visible').click()
    cy.contains(/Responsibilities/i)
    cy.go("back")
}
}