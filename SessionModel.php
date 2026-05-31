<?php
// models/SessionModel.php

class SessionModel
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    // ── Créer une session d'étude ────────────────────────────────────────────
    public function create(array $data): int
    {
        $code = $data['est_privee'] ? $this->generateCode() : null;

        $stmt = $this->db->prepare(
            'INSERT INTO sessions_etude
                (titre, sujet, date_heure, duree, code_invitation, max_participants, createur_id)
             VALUES
                (:titre, :sujet, :date_heure, :duree, :code, :max_p, :createur_id)'
        );
        $stmt->execute([
            ':titre'       => $data['titre'],
            ':sujet'       => $data['sujet'],
            ':date_heure'  => $data['date_heure'],
            ':duree'       => (int)$data['duree'],
            ':code'        => $code,
            ':max_p'       => (int)($data['max_participants'] ?? 10),
            ':createur_id' => (int)$data['createur_id'],
        ]);
        $id = (int)$this->db->lastInsertId();

        // Le créateur est automatiquement inscrit
        $this->inscrire($id, (int)$data['createur_id']);

        return $id;
    }

    // ── Lister toutes les sessions publiques + les sessions du user ──────────
    public function listAvailable(int $userId): array
    {
        $stmt = $this->db->prepare(
            'SELECT s.*,
                    u.nom   AS createur_nom,
                    u.prenom AS createur_prenom,
                    (SELECT COUNT(*) FROM inscriptions_session i WHERE i.session_id = s.id) AS nb_inscrits
             FROM sessions_etude s
             JOIN utilisateurs u ON u.id = s.createur_id
             WHERE s.code_invitation IS NULL
                OR s.createur_id = :uid
                OR EXISTS (
                    SELECT 1 FROM inscriptions_session i2
                    WHERE i2.session_id = s.id AND i2.utilisateur_id = :uid2
                )
             ORDER BY s.date_heure ASC'
        );
        $stmt->execute([':uid' => $userId, ':uid2' => $userId]);
        return $stmt->fetchAll();
    }

    // ── Lister les sessions d'un utilisateur (planning perso) ───────────────
    public function listByUser(int $userId): array
    {
        $stmt = $this->db->prepare(
            'SELECT s.*,
                    (SELECT COUNT(*) FROM inscriptions_session i WHERE i.session_id = s.id) AS nb_inscrits
             FROM sessions_etude s
             JOIN inscriptions_session ins ON ins.session_id = s.id
             WHERE ins.utilisateur_id = :uid
             ORDER BY s.date_heure ASC'
        );
        $stmt->execute([':uid' => $userId]);
        return $stmt->fetchAll();
    }

    // ── Trouver par ID ───────────────────────────────────────────────────────
    public function findById(int $id): ?array
    {
        $stmt = $this->db->prepare(
            'SELECT s.*,
                    (SELECT COUNT(*) FROM inscriptions_session i WHERE i.session_id = s.id) AS nb_inscrits
             FROM sessions_etude s WHERE s.id = :id LIMIT 1'
        );
        $stmt->execute([':id' => $id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    // ── Trouver par code d'invitation ────────────────────────────────────────
    public function findByCode(string $code): ?array
    {
        $stmt = $this->db->prepare(
            'SELECT s.*,
                    (SELECT COUNT(*) FROM inscriptions_session i WHERE i.session_id = s.id) AS nb_inscrits
             FROM sessions_etude s WHERE s.code_invitation = :code LIMIT 1'
        );
        $stmt->execute([':code' => $code]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    // ── Mettre à jour une session (réservé au créateur) ──────────────────────
    public function update(int $id, array $data): bool
    {
        $fields = [];
        $params = [':id' => $id];

        foreach (['titre','sujet','date_heure','duree','max_participants'] as $col) {
            if (array_key_exists($col, $data)) {
                $fields[] = "$col = :$col";
                $params[":$col"] = $data[$col];
            }
        }
        if (empty($fields)) return false;

        $stmt = $this->db->prepare(
            'UPDATE sessions_etude SET ' . implode(', ', $fields) . ' WHERE id = :id'
        );
        $stmt->execute($params);
        return $stmt->rowCount() > 0;
    }

    // ── Supprimer une session ────────────────────────────────────────────────
    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare('DELETE FROM sessions_etude WHERE id = :id');
        $stmt->execute([':id' => $id]);
        return $stmt->rowCount() > 0;
    }

    // ── Inscrire un utilisateur ──────────────────────────────────────────────
    public function inscrire(int $sessionId, int $userId): bool
    {
        $stmt = $this->db->prepare(
            'INSERT IGNORE INTO inscriptions_session (session_id, utilisateur_id) VALUES (:sid, :uid)'
        );
        $stmt->execute([':sid' => $sessionId, ':uid' => $userId]);
        return $stmt->rowCount() > 0;
    }

    // ── Désinscrire un utilisateur ───────────────────────────────────────────
    public function desinscrire(int $sessionId, int $userId): bool
    {
        $stmt = $this->db->prepare(
            'DELETE FROM inscriptions_session WHERE session_id = :sid AND utilisateur_id = :uid'
        );
        $stmt->execute([':sid' => $sessionId, ':uid' => $userId]);
        return $stmt->rowCount() > 0;
    }

    // ── L'utilisateur est-il inscrit ? ───────────────────────────────────────
    public function estInscrit(int $sessionId, int $userId): bool
    {
        $stmt = $this->db->prepare(
            'SELECT 1 FROM inscriptions_session WHERE session_id = :sid AND utilisateur_id = :uid'
        );
        $stmt->execute([':sid' => $sessionId, ':uid' => $userId]);
        return (bool)$stmt->fetch();
    }

    // ── Liste des participants d'une session ─────────────────────────────────
    public function getParticipants(int $sessionId): array
    {
        $stmt = $this->db->prepare(
            'SELECT u.id, u.nom, u.prenom, u.email, ins.date_inscription
             FROM inscriptions_session ins
             JOIN utilisateurs u ON u.id = ins.utilisateur_id
             WHERE ins.session_id = :sid'
        );
        $stmt->execute([':sid' => $sessionId]);
        return $stmt->fetchAll();
    }

    // ── Génère un code d'invitation unique ───────────────────────────────────
    private function generateCode(): string
    {
        do {
            $code = strtoupper(substr(bin2hex(random_bytes(6)), 0, 8));
            $stmt = $this->db->prepare(
                'SELECT 1 FROM sessions_etude WHERE code_invitation = :code'
            );
            $stmt->execute([':code' => $code]);
        } while ($stmt->fetch());

        return $code;
    }
}
