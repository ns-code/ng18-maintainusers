describe('Test Maintain Users', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('List users', () => {
    cy.contains('Maintain Users')
    cy.wait(5000)
  })

  it('Add User user4', () => {
    cy.contains("button", "Add User").click()
    cy.contains('Add User')
    cy.get('.user-name-input').focus().type('user4')
    cy.get('.first-name-input').focus().type('fn4')
    cy.get('.last-name-input').focus().type('ln4')
    cy.get('.email-input').focus().type('e4@test.com')
    cy.get('mat-select[formControlName=userStatus]').click().get('mat-option').contains('A - Active').click();
    cy.get('input[formControlName=department]').focus().type('dep4')
    cy.contains('button', 'Add User').click()
    cy.contains('Maintain Users')
  })

  it('Add User user5', () => {
    cy.contains("button", "Add User").click()
    cy.contains('Add User')
    cy.get('.user-name-input').focus().type('user5')
    cy.get('.first-name-input').focus().type('fn5')
    cy.get('.last-name-input').focus().type('ln5')
    cy.get('.email-input').focus().type('e5@test.com')
    cy.get('mat-select[formControlName=userStatus]').click().get('mat-option').contains('A - Active').click();
    cy.contains('button', 'Add User').click()
    cy.contains('Maintain Users')
  })
})
