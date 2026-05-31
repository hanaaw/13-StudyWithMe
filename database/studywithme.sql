-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 30 mai 2026 à 20:13
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `studywithme`
--

-- --------------------------------------------------------

--
-- Structure de la table `documents`
--

CREATE TABLE `documents` (
  `id` int(10) UNSIGNED NOT NULL,
  `nom_fichier` varchar(255) NOT NULL,
  `chemin_stockage` varchar(500) NOT NULL,
  `session_id` int(10) UNSIGNED NOT NULL,
  `utilisateur_id` int(10) UNSIGNED NOT NULL,
  `date_upload` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `inscriptions_session`
--

CREATE TABLE `inscriptions_session` (
  `session_id` int(10) UNSIGNED NOT NULL,
  `utilisateur_id` int(10) UNSIGNED NOT NULL,
  `date_inscription` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `sessions_etude`
--

CREATE TABLE `sessions_etude` (
  `id` int(10) UNSIGNED NOT NULL,
  `titre` varchar(255) NOT NULL,
  `sujet` varchar(255) NOT NULL,
  `date_heure` datetime NOT NULL,
  `duree` smallint(5) UNSIGNED NOT NULL COMMENT 'Durée en minutes',
  `code_invitation` varchar(16) DEFAULT NULL COMMENT 'NULL = session publique',
  `max_participants` tinyint(3) UNSIGNED NOT NULL DEFAULT 10,
  `createur_id` int(10) UNSIGNED NOT NULL,
  `date_creation` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `tokens_invalides`
--

CREATE TABLE `tokens_invalides` (
  `id` int(10) UNSIGNED NOT NULL,
  `token_hash` varchar(64) NOT NULL COMMENT 'SHA-256 du JWT révoqué',
  `expire_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` int(10) UNSIGNED NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `matieres` text DEFAULT NULL COMMENT 'JSON array des matières étudiées',
  `disponibilites` text DEFAULT NULL COMMENT 'JSON object des disponibilités',
  `date_creation` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_doc_utilisateur` (`utilisateur_id`),
  ADD KEY `idx_session_id` (`session_id`);

--
-- Index pour la table `inscriptions_session`
--
ALTER TABLE `inscriptions_session`
  ADD PRIMARY KEY (`session_id`,`utilisateur_id`),
  ADD KEY `fk_insc_utilisateur` (`utilisateur_id`);

--
-- Index pour la table `sessions_etude`
--
ALTER TABLE `sessions_etude`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code_invitation` (`code_invitation`),
  ADD KEY `idx_createur` (`createur_id`),
  ADD KEY `idx_date_heure` (`date_heure`);

--
-- Index pour la table `tokens_invalides`
--
ALTER TABLE `tokens_invalides`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token_hash` (`token_hash`),
  ADD KEY `idx_expire` (`expire_at`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `sessions_etude`
--
ALTER TABLE `sessions_etude`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `tokens_invalides`
--
ALTER TABLE `tokens_invalides`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `fk_doc_session` FOREIGN KEY (`session_id`) REFERENCES `sessions_etude` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_doc_utilisateur` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `inscriptions_session`
--
ALTER TABLE `inscriptions_session`
  ADD CONSTRAINT `fk_insc_session` FOREIGN KEY (`session_id`) REFERENCES `sessions_etude` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_insc_utilisateur` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `sessions_etude`
--
ALTER TABLE `sessions_etude`
  ADD CONSTRAINT `fk_session_createur` FOREIGN KEY (`createur_id`) REFERENCES `utilisateurs` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
