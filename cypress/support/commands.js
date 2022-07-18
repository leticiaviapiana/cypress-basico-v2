Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Letícia')
    cy.get('#lastName').type('Viapiana')
    cy.get('#email').type('leticiav@email.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})
