package com.boutique.produits_service.repository;

import com.boutique.produits_service.entity.Categorie;
import com.boutique.produits_service.entity.Produit;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
public class ProduitRepositoryTest {

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private CategorieRepository categorieRepository;

    @Test
    public void testFindByCategorieId() {
        Categorie cat = new Categorie();
        cat.setNom("Test Cat");
        cat = categorieRepository.save(cat);

        Produit p = new Produit();
        p.setNom("Test Prod");
        p.setCategorie(cat);
        produitRepository.save(p);

        List<Produit> found = produitRepository.findByCategorieId(cat.getId());
        assertEquals(1, found.size());
        assertEquals("Test Prod", found.get(0).getNom());
    }
}
