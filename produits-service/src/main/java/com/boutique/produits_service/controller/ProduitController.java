package com.boutique.produits_service.controller;

import com.boutique.produits_service.entity.Produit;
import com.boutique.produits_service.service.ProduitService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produits")
@Tag(name = "Produits", description = "API de gestion des produits")
public class ProduitController {
    private final ProduitService produitService;

    public ProduitController(ProduitService produitService) {
        this.produitService = produitService;
    }

    @GetMapping
    @Operation(summary = "Liste tous les produits ou par catégorie")
    public List<Produit> getProduits(@RequestParam(required = false) Long categorieId) {
        if (categorieId != null) {
            return produitService.getProduitsByCategorie(categorieId);
        }
        return produitService.getAllProduits();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Détail d'un produit")
    public ResponseEntity<Produit> getProduitById(@PathVariable Long id) {
        return produitService.getProduitById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Crée un produit")
    public Produit createProduit(@RequestBody Produit produit) {
        return produitService.saveProduit(produit);
    }
}
