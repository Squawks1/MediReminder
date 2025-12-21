describe('Registro MediReminder', () => {

    beforeEach(() => {
        cy.visit('/registro');
    });

    it('Debe tener el botón Crear cuenta deshabilitado inicialmente', () => {
        cy.get('[data-cy=btn-crear]')
            .should('exist')
            .should('have.class', 'button-disabled');
    });

    it('Debe validar email incorrecto', () => {
        cy.get('[data-cy=nombre]').type('Juan Perez');
        cy.get('[data-cy=usuario]').type('juan1');
        cy.get('[data-cy=email]').type('correo-invalido');
        cy.get('[data-cy=password]').type('1234');
        cy.get('[data-cy=confirmarPassword]').type('1234');

        cy.contains('Ingrese un correo electrónico válido')
        .should('exist');
    });

    it('Debe validar contraseñas que no coinciden', () => {
        cy.get('[data-cy=nombre]').find('input').type('Juan Perez');
        cy.get('[data-cy=usuario]').find('input').type('juan1');
        cy.get('[data-cy=email]').find('input').type('juan@test.com');

        cy.get('[data-cy=password]').find('input').type('1234').blur();
        cy.get('[data-cy=confirmarPassword]').find('input').type('9999').blur();

        cy.contains('Las contraseñas no coinciden').should('exist');
    });

    it('Debe navegar al login', () => {
        cy.get('[data-cy=btn-login]').click();
        cy.url().should('include', '/login');
    });

});
