<?php
// models/DocumentModel.php

class DocumentModel
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    // ── Enregistrer un document en base ─────────────────────────────────────
    public function create(array $data): int
    {
        $stmt = $this->db->prepare(
            'INSERT INTO documents (nom_fichier, chemin_stockage, session_id, utilisateur_id)
             VALUES (:nom, :chemin, :sid, :uid)'
        );
        $stmt->execute([
            ':nom'    => $data['nom_fichier'],
            ':chemin' => $data['chemin_stockage'],
            ':sid'    => (int)$data['session_id'],
            ':uid'    => (int)$data['utilisateur_id'],
        ]);
        return (int)$this->db->lastInsertId();
    }

    // ── Lister les documents d'une session ───────────────────────────────────
    public function listBySession(int $sessionId): array
    {
        $stmt = $this->db->prepare(
            'SELECT d.*, u.nom AS uploader_nom, u.prenom AS uploader_prenom
             FROM documents d
             JOIN utilisateurs u ON u.id = d.utilisateur_id
             WHERE d.session_id = :sid
             ORDER BY d.date_upload DESC'
        );
        $stmt->execute([':sid' => $sessionId]);
        return $stmt->fetchAll();
    }

    // ── Trouver un document par ID ───────────────────────────────────────────
    public function findById(int $id): ?array
    {
        $stmt = $this->db->prepare(
            'SELECT * FROM documents WHERE id = :id LIMIT 1'
        );
        $stmt->execute([':id' => $id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    // ── Supprimer un document ────────────────────────────────────────────────
    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare('DELETE FROM documents WHERE id = :id');
        $stmt->execute([':id' => $id]);
        return $stmt->rowCount() > 0;
    }
}
