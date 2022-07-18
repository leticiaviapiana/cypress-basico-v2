//  <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function(){
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    // # Exercício de validação de título # //
    it('verifica o título da aplicação', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    // # Exercícios sobre digitar em campos e clicar em elementos # //
    // # Exercício extra 01 # //
    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        cy.get('#firstName').type('Letícia')
        cy.get('#lastName').type('Viapiana')
        cy.get('#email').type('leticiav@email.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    // # Exercício extra 02 # //
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Letícia')
        cy.get('#lastName').type('Viapiana')
        cy.get('#email').type('leticiav@email,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    // # Exercício extra 03 # //
    it('campo telefone continua vazio quando preenchido com valor não numérico', function(){
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value', '')
    })

    // # Exercício extra 04 # //
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Letícia')
        cy.get('#lastName').type('Viapiana')
        cy.get('#email').type('leticiav@email.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    // # Exercício extra 05 # //
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
        .type('Letícia')
        .should('have.value', 'Letícia')
        .clear()
        .should('have.value', '')
    
        cy.get('#lastName')
        .type('Viapiana')
        .should('have.value', 'Viapiana')
        .clear()
        .should('have.value', '')

        cy.get('#email')
        .type('leticiav@email.com')
        .should('have.value', 'leticiav@email.com')
        .clear()
        .should('have.value', '')

        cy.get('#phone')
        .type('999999999')
        .should('have.value', '999999999')
        .clear()
        .should('have.value', '')
    })

    // # Exercício extra 06 # //
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    // # Exercício extra 07 # //
    // esse comando customizado está salvo na pasta "commands.js" //
        // pode utilizar para eliminar duplicação de código //
               // pra tornar os testes mais legíveis //
    it('envia o formulário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    // # Exercício extra 08 # //
    // Foi realizado a alteração dos "cy.get('button[type="submit"]')" por "cy.contains('button', 'Enviar')" //

    // # Exercício sobre seleção de opções de campos de seleção suspensa # //
    it('seleciona um produto (Youtube) por seu texto', function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    // # Exercício extra 01 # //
    it('seleciona um produto (Mentoria) por seu valor', function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    // # Exercício extra 02 # //
    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    // # Exercício sobre marcar inputs do tipo radio button # //
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    // # Exercício extra 01 # //
    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    // # Exercício sobre marcar e desmarcar inputs do tipo chekbox" # //
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    // # Exercício extra 01 # //
    // Foi realizado a alteração do cy.get('#phone-checkbox').click() por cy.get('#phone-checkbox').check() //

    // # Exercício sobre selecionar um arquivo da pasta fixtures e treinei também com um arquivo pessoal contido no meu pc # //
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('treinando com um arquivo pessoal salvo no computador', function(){
        cy.get('input[type="file"]')
        .selectFile('C:/Users/Leticia Viapiana/Documents/meus documentos/CV LETÍCIA QATESTE.pdf')
        .should(function($input){   // recebeu uma função de callback //
            expect($input[0].files[0].name).to.equal('CV LETÍCIA QATESTE.pdf')
        })
    })

    // # Exercício extra 01 # //
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    // # Exercício extra 02 # //
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    // # Exercício sobre lidar com links que abrem em outra aba do navegador # //
    // # Exercício 01 # //
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    // # Exercício extra 01 # //
    it('acessa a página de política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

    // # Exercício extra 02 # //
    // Foi realizado o teste da página da política de privacidade de forma independente com um novo arquivo spec.js //

    // # Exercício sobre simulação de dimensões de um dispositivo móvel # //
    // # Exercício 01 # //
    // Foi realizado a implementação no package.json do comando "cy:open:mobile" para que o cypress execute a aplicação //
                         //      conforme a largura e a altura definidos no script      //
    
    // Utilizando o comando "npm run test" os testes são executados, o navegador não abre e é exibido os resultados no terminal //

    // # Exercício extra 01 # //
    // Foi realizado a implementação no package.json do comando "test:mobile" para que o cypress execute a aplicação conforme //
        //    a largura e a altura definidos no script, porém o navegador não abre e os testes são exibidos no terminal    //    


    // # Exercício sobre documentação do projeto de testes automatizados # //
    // Foi criado uma documentação no "README.md" e a documentação que estava no README.md foi passada para a pasta "__intro__.md" //

    // # Exercício sobre integração contínua (CI) com GitHub Actions # //
    // # Exercício 1 # //
    // Foi criado um diretório chamado .github/ e dentro dele criado um sub-diretório chamado workflows/ > ".github/workflows/" //
    
})