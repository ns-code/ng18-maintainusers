describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Maintain Users')
  })

  it('Visits the /users page', () => {
    cy.visit('/users')
    cy.contains('Maintain Users')
  })
})
