describe('E2E API Tests via Gateway', () => {
  const gatewayUrl = 'http://localhost:8090';

  it('should fetch categories and products then avis', () => {
    // 1. Get Categories
    cy.request(`${gatewayUrl}/api/categories`).then((response) => {
      expect(response.status).to.eq(200);
      const catId = response.body[0].id;

      // 2. Get Products for first category
      cy.request(`${gatewayUrl}/api/produits?categorieId=${catId}`).then((prodResponse) => {
        expect(prodResponse.status).to.eq(200);
        if (prodResponse.body.length > 0) {
            const prodId = prodResponse.body[0].id;

            // 3. Get Avis for first product
            cy.request(`${gatewayUrl}/api/avis/${prodId}`).then((avisResponse) => {
                expect(avisResponse.status).to.eq(200);
            });
        }
      });
    });
  });
});
