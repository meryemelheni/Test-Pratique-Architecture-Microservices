package com.boutique.avis_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "produits-service")
public interface ProduitClient {
    @GetMapping("/api/produits/{id}")
    Object getProduitById(@PathVariable("id") Long id);
}
