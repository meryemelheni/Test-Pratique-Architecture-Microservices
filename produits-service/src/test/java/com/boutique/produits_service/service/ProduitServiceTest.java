package com.boutique.produits_service.service;

import com.boutique.produits_service.entity.Produit;
import com.boutique.produits_service.repository.ProduitRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProduitServiceTest {

    @Mock
    private ProduitRepository produitRepository;

    @InjectMocks
    private ProduitService produitService;

    @Test
    public void testGetAllProduits() {
        Produit p1 = new Produit(); p1.setNom("P1");
        Produit p2 = new Produit(); p2.setNom("P2");
        when(produitRepository.findAll()).thenReturn(Arrays.asList(p1, p2));

        List<Produit> result = produitService.getAllProduits();
        assertEquals(2, result.size());
        assertEquals("P1", result.get(0).getNom());
    }
}
