-- Nettoyage pour éviter les doublons au redémarrage
DELETE FROM avis;

-- Réinitialisation des séquences
ALTER SEQUENCE avis_id_seq RESTART WITH 1;

-- Smartphone (ID 1)
INSERT INTO avis (produit_id, auteur, commentaire, note) VALUES (1, 'Alice', 'Excellent smartphone !', 5);
INSERT INTO avis (produit_id, auteur, commentaire, note) VALUES (1, 'Bob', 'Un peu cher mais performant.', 4);

-- Laptop (ID 2)
INSERT INTO avis (produit_id, auteur, commentaire, note) VALUES (2, 'Charlie', 'Idéal pour le travail et le jeu.', 5);
INSERT INTO avis (produit_id, auteur, commentaire, note) VALUES (2, 'David', 'Le clavier est super confortable.', 4);

-- T-shirt (ID 3)
INSERT INTO avis (produit_id, auteur, commentaire, note) VALUES (3, 'Eve', 'Tissu de bonne qualité, taille bien.', 5);
INSERT INTO avis (produit_id, auteur, commentaire, note) VALUES (3, 'Frank', 'Simple et efficace.', 4);

-- Jeans (ID 4)
INSERT INTO avis (produit_id, auteur, commentaire, note) VALUES (4, 'Grace', 'Coupe parfaite, très robuste.', 5);
INSERT INTO avis (produit_id, auteur, commentaire, note) VALUES (4, 'Heidi', 'Un classique indispensable.', 5);

-- Canapé (ID 5)
INSERT INTO avis (produit_id, auteur, commentaire, note) VALUES (5, 'Ivan', 'Très confortable pour les soirées ciné.', 5);
INSERT INTO avis (produit_id, auteur, commentaire, note) VALUES (5, 'Judy', 'La couleur est conforme aux photos.', 4);

-- Lampe (ID 6)
INSERT INTO avis (produit_id, auteur, commentaire, note) VALUES (6, 'Kevin', 'Éclairage chaleureux.', 5);
INSERT INTO avis (produit_id, auteur, commentaire, note) VALUES (6, 'Laura', 'Design minimaliste que j''adore.', 5);
