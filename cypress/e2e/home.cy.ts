describe('Home - MediReminder', () => {

    beforeEach(() => {
        //Simula acceso
        window.localStorage.setItem('usuarioLogeado', '1');
        cy.visit('/home');
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