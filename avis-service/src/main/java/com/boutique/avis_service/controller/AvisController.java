package com.boutique.avis_service.controller;

import com.boutique.avis_service.entity.Avis;
import com.boutique.avis_service.service.AvisService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/avis")
@Tag(name = "Avis", description = "API de gestion des avis")
public class AvisController {
    private final AvisService avisService;

    public AvisController(AvisService avisService) {
        this.avisService = avisService;
    }

    @GetMapping("/{produitId}")
    @Operation(summary = "Liste les avis d'un produit")
    public List<Avis> getAvisByProduit(@PathVariable Long produitId) {
        return avisService.getAvisByProduit(produitId);
    }

    @PostMapping
    @Operation(summary = "Soumet un avis")
    public Avis createAvis(@RequestBody Avis avis) {
        return avisService.saveAvis(avis);
    }
}
