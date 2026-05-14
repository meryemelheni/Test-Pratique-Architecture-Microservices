-- Nettoyage pour éviter les doublons au redémarrage
DELETE FROM produit;
DELETE FROM categorie;

-- Réinitialisation des séquences pour que les IDs commencent à 1
ALTER SEQUENCE categorie_id_seq RESTART WITH 1;
ALTER SEQUENCE produit_id_seq RESTART WITH 1;

INSERT INTO categorie (nom) VALUES ('Électronique');
INSERT INTO categorie (nom) VALUES ('Vêtements');
INSERT INTO categorie (nom) VALUES ('Maison');

-- Électronique (ID 1)
INSERT INTO produit (nom, prix, stock, categorie_id) VALUES ('Smartphone', 699.99, 50, 1);
INSERT INTO produit (nom, prix, stock, categorie_id) VALUES ('Laptop', 1200.00, 30, 1);

-- Vêtements (ID 2)
INSERT INTO produit (nom, prix, stock, categorie_id) VALUES ('T-shirt', 19.99, 100, 2);
INSERT INTO produit (nom, prix, stock, categorie_id) VALUES ('Jeans', 49.99, 80, 2);

-- Maison (ID 3)
INSERT INTO produit (nom, prix, stock, categorie_id) VALUES ('Canapé', 450.00, 10, 3);
INSERT INTO produit (nom, prix, stock, categorie_id) VALUES ('Lampe', 25.00, 40, 3);

