<?php
// models/UserModel.php

class UserModel
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    // ── Création d'un utilisateur ────────────────────────────────────────────
    public function create(array $data): int
    {
        $stmt = $this->db->prepare(
            'INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, matieres, disponibilites)
             VALUES (:nom, :prenom, :email, :mot_de_passe, :matieres, :disponibilites)'
        );
        $stmt->execute([
            ':nom'           => $data['nom'],
            ':prenom'        => $data['prenom'],
            ':email'         => $data['email'],
            ':mot_de_passe'  => password_hash($data['mot_de_passe'], PASSWORD_BCRYPT),
            ':matieres'      => $data['matieres']      ?? null,
            ':disponibilites'=> $data['disponibilites'] ?? null,
        ]);
        return (int)$this->db->lastInsertId();
    }

    // ── Recherche par email ──────────────────────────────────────────────────
    public function findByEmail(string $email): ?array
    {
        $stmt = $this->db->prepare(
            'SELECT * FROM utilisateurs WHERE email = :email LIMIT 1'
        );
        $stmt->execute([':email' => $email]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    // ── Recherche par ID ─────────────────────────────────────────────────────
    public function findById(int $id): ?array
    {
        $stmt = $this->db->prepare(
            'SELECT id, nom, prenom, email, matieres, disponibilites, date_creation
             FROM utilisateurs WHERE id = :id LIMIT 1'
        );
        $stmt->execute([':id' => $id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    // ── Mise à jour du profil ────────────────────────────────────────────────
    public function update(int $id, array $data): bool
    {
        $fields = [];
        $params = [':id' => $id];

        foreach (['nom','prenom','email','matieres','disponibilites'] as $col) {
            if (array_key_exists($col, $data)) {
                $fields[] = "$col = :$col";
                $params[":$col"] = $data[$col];
            }
        }
        // Mise à jour du mot de passe (optionnelle)
        if (!empty($data['mot_de_passe'])) {
            $fields[]  = 'mot_de_passe = :mot_de_passe';
            $params[':mot_de_passe'] = password_hash($data['mot_de_passe'], PASSWORD_BCRYPT);
        }

        if (empty($fields)) return false;

        $sql = 'UPDATE utilisateurs SET ' . implode(', ', $fields) . ' WHERE id = :id';
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->rowCount() > 0;
    }

    // ── Email déjà utilisé ? ─────────────────────────────────────────────────
    public function emailExists(string $email, int $excludeId = 0): bool
    {
        $stmt = $this->db->prepare(
            'SELECT id FROM utilisateurs WHERE email = :email AND id != :exclude LIMIT 1'
        );
        $stmt->execute([':email' => $email, ':exclude' => $excludeId]);
        return (bool)$stmt->fetch();
    }

    // ── Matching : recherche par matières et/ou disponibilités ──────────────
    public function search(int $currentUserId, ?string $matiere = null, ?string $disponibilite = null): array
    {
        $where   = ['u.id != :uid'];
        $params  = [':uid' => $currentUserId];

        if ($matiere) {
            $where[] = "JSON_SEARCH(u.matieres, 'one', :matiere) IS NOT NULL";
            $params[':matiere'] = $matiere;
        }
        if ($disponibilite) {
            $where[] = "u.disponibilites LIKE :dispo";
            $params[':dispo'] = '%' . $disponibilite . '%';
        }

        $sql = 'SELECT id, nom, prenom, email, matieres, disponibilites
                FROM utilisateurs u
                WHERE ' . implode(' AND ', $where);

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }
}
