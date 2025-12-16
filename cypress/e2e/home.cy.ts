describe('Home - MediReminder', () => {

    beforeEach(() => {
        // Simula acceso al Home con credenciales de ejemplo
        cy.visit('/login');
        cy.get('[data-cy=usuario]').type('admin');
        cy.get('[data-cy=password]').type('1234');
        cy.get('[data-cy=btn-login]').click();
    });

    it('Debe mostrar el saludo al usuario', () => {
        cy.get('[data-cy=saludo]').should('contain.text', 'Hola');
    });

    it('Debe navegar a Medicamentos', () => {
        cy.get('[data-cy=btn-medicamentos]').click();
        cy.url().should('include', '/medicamentos');
    });

    it('Debe navegar a Recordatorios', () => {
        cy.get('[data-cy=btn-recordatorios]').click();
        cy.url().should('include', '/recordatorios');
    });

});