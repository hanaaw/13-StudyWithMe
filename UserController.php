<?php
// controllers/UserController.php

class UserController
{
    private UserModel $userModel;

    public function __construct()
    {
        $this->userModel = new UserModel();
    }

    // ── US-07 : Obtenir son propre profil ────────────────────────────────────
    public function getProfile(): void
    {
        $payload = AuthMiddleware::handle();
        $user = $this->userModel->findById($payload['user_id']);
        if (!$user) Response::notFound('Utilisateur introuvable.');
        Response::success($this->formatUser($user));
    }

    // ── US-07 : Modifier son profil ──────────────────────────────────────────
    public function updateProfile(): void
    {
        $payload = AuthMiddleware::handle();
        $input   = $this->getJson();

        $v = new Validator();
        if (!empty($input['email']))
            $v->email($input['email'], 'email');
        if (!empty($input['mot_de_passe']))
            $v->minLength($input['mot_de_passe'], 'mot_de_passe', 8);
        if (!empty($input['nom']))
            $v->maxLength($input['nom'], 'nom', 100);
        if (!empty($input['prenom']))
            $v->maxLength($input['prenom'], 'prenom', 100);

        if (!$v->isValid()) {
            Response::error('Données invalides.', 422, $v->getErrors());
        }

        // Vérification unicité email si modifié
        if (!empty($input['email'])) {
            $email = strtolower(Validator::sanitize($input['email']));
            if ($this->userModel->emailExists($email, $payload['user_id'])) {
                Response::error('Cette adresse email est déjà utilisée.', 409);
            }
            $input['email'] = $email;
        }

        // Sanitize les champs texte
        foreach (['nom','prenom'] as $f) {
            if (!empty($input[$f])) $input[$f] = Validator::sanitize($input[$f]);
        }
        // JSON encode les tableaux
        if (isset($input['matieres']))
            $input['matieres'] = is_array($input['matieres'])
                ? json_encode($input['matieres']) : $input['matieres'];
        if (isset($input['disponibilites']))
            $input['disponibilites'] = is_array($input['disponibilites'])
                ? json_encode($input['disponibilites']) : $input['disponibilites'];

        $this->userModel->update($payload['user_id'], $input);
        $user = $this->userModel->findById($payload['user_id']);
        Response::success($this->formatUser($user), 'Profil mis à jour.');
    }

    // ── Consulter le profil d'un autre utilisateur ───────────────────────────
    public function getPublicProfile(int $id): void
    {
        AuthMiddleware::handle();
        $user = $this->userModel->findById($id);
        if (!$user) Response::notFound('Utilisateur introuvable.');
        Response::success($this->formatUser($user));
    }

    // ── US-06 : Matching – rechercher des étudiants ──────────────────────────
    public function search(): void
    {
        $payload  = AuthMiddleware::handle();
        $matiere  = isset($_GET['matiere'])      ? Validator::sanitize($_GET['matiere'])      : null;
        $dispo    = isset($_GET['disponibilite']) ? Validator::sanitize($_GET['disponibilite']): null;

        $results = $this->userModel->search($payload['user_id'], $matiere, $dispo);

        $formatted = array_map([$this, 'formatUser'], $results);
        Response::success($formatted);
    }

    // ── Helpers ──────────────────────────────────────────────────────────────
    private function getJson(): array
    {
        return json_decode(file_get_contents('php://input'), true) ?? [];
    }

    private function formatUser(array $user): array
    {
        unset($user['mot_de_passe']);
        if (!empty($user['matieres']))
            $user['matieres'] = json_decode($user['matieres'], true);
        if (!empty($user['disponibilites']))
            $user['disponibilites'] = json_decode($user['disponibilites'], true);
        return $user;
    }
}
