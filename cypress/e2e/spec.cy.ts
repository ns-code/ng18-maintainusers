describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Home')
  })

  it('Visits the /home page', () => {
    cy.visit('/home')
    cy.contains('Home footer')
  })
})
