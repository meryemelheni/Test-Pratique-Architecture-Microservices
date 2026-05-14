package com.boutique.avis_service.service;

import com.boutique.avis_service.client.ProduitClient;
import com.boutique.avis_service.entity.Avis;
import com.boutique.avis_service.repository.AvisRepository;
import feign.FeignException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AvisService {
    private final AvisRepository avisRepository;
    private final ProduitClient produitClient;

    public AvisService(AvisRepository avisRepository, ProduitClient produitClient) {
        this.avisRepository = avisRepository;
        this.produitClient = produitClient;
    }

    public List<Avis> getAvisByProduit(Long produitId) {
        return avisRepository.findByProduitId(produitId);
    }

    public Avis saveAvis(Avis avis) {
        try {
            produitClient.getProduitById(avis.getProduitId());
        } catch (FeignException.NotFound e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produit introuvable");
        }
        return avisRepository.save(avis);
    }
}
