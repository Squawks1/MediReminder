describe('Login MediReminder', () => {

    beforeEach(() => {
        cy.visit('/login');
    });

    it('Debe mostrar el formulario de login', () => {
        cy.contains('Login').should('exist');
        cy.get('[data-cy=usuario]').should('exist');
        cy.get('[data-cy=password]').should('exist');
        cy.get('[data-cy=btn-login]')
            .should('exist')
            .should('have.class', 'button-disabled');
    });

    it('Debe validar campos incorrectos', () => {
        cy.get('[data-cy=usuario]').type('ab');
        cy.get('[data-cy=password]').type('12');

        cy.get('[data-cy=btn-login]')
            .should('exist')
            .should('have.class', 'button-disabled');

        cy.contains('El usuario debe tener entre 3 y 8 caracteres').should('exist');
        cy.contains('La contraseña debe ser numérica de 4 dígitos').should('exist');
    });

    it('Debe mostrar alerta si el usuario no existe', () => {
        cy.get('[data-cy=usuario]').type('usuario1');
        cy.get('[data-cy=password]').type('1234');

        cy.get('[data-cy=btn-login]').click();

        cy.contains('Usuario o contraseña incorrectos').should('exist');
    });

    it('Debe iniciar sesión correctamente y navegar a Home', () => {
        cy.get('[data-cy=usuario]').type('admin');
        cy.get('[data-cy=password]').type('1234');

        cy.get('[data-cy=btn-login]').click();

        cy.url().should('include', '/home');
        cy.contains('Hola').should('exist');
    });

    it('Debe navegar a la página de registro', () => {
        cy.get('[data-cy=btn-registro]').click();
        cy.url().should('include', '/registro');
    });

});
