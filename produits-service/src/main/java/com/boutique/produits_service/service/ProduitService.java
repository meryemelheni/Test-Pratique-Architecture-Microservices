package com.boutique.produits_service.service;

import com.boutique.produits_service.entity.Produit;
import com.boutique.produits_service.repository.ProduitRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProduitService {
    private final ProduitRepository produitRepository;

    public ProduitService(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    @Cacheable(value = "produits")
    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    public List<Produit> getProduitsByCategorie(Long categorieId) {
        return produitRepository.findByCategorieId(categorieId);
    }

    public Optional<Produit> getProduitById(Long id) {
        return produitRepository.findById(id);
    }

    @CacheEvict(value = "produits", allEntries = true)
    public Produit saveProduit(Produit produit) {
        return produitRepository.save(produit);
    }
}
