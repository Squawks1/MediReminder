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

    it('Debe validar contraseñas no coincidentes', () => {
        cy.get('[data-cy=nombre]').type('Juan Perez');
        cy.get('[data-cy=usuario]').type('juan1');
        cy.get('[data-cy=email]').type('juan@mail.com');
        cy.get('[data-cy=password]').type('1234');
        cy.get('[data-cy=confirmarPassword]').type('0000');

        cy.contains('Las contraseñas no coinciden')
        .should('exist');
    });

    it('Debe navegar al login', () => {
        cy.get('[data-cy=btn-login]').click();
        cy.url().should('include', '/login');
    });

});
