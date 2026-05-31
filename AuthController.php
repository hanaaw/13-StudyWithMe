<?php
// controllers/AuthController.php

class AuthController
{
    private UserModel $userModel;

    public function __construct()
    {
        $this->userModel = new UserModel();
    }

    // ── US-01 : Inscription ──────────────────────────────────────────────────
    public function register(): void
    {
        $input = $this->getJson();

        $v = new Validator();
        $v->required($input['nom']          ?? '', 'nom')
          ->required($input['prenom']        ?? '', 'prenom')
          ->required($input['email']         ?? '', 'email')
          ->email($input['email']            ?? '', 'email')
          ->required($input['mot_de_passe']  ?? '', 'mot_de_passe')
          ->minLength($input['mot_de_passe'] ?? '', 'mot_de_passe', 8);

        if (!$v->isValid()) {
            Response::error('Données invalides.', 422, $v->getErrors());
        }

        $email = strtolower(Validator::sanitize($input['email']));
        if ($this->userModel->emailExists($email)) {
            Response::error('Cette adresse email est déjà utilisée.', 409);
        }

        $id = $this->userModel->create([
            'nom'            => Validator::sanitize($input['nom']),
            'prenom'         => Validator::sanitize($input['prenom']),
            'email'          => $email,
            'mot_de_passe'   => $input['mot_de_passe'],
            'matieres'       => isset($input['matieres'])
                                    ? json_encode($input['matieres']) : null,
            'disponibilites' => isset($input['disponibilites'])
                                    ? json_encode($input['disponibilites']) : null,
        ]);

        $user  = $this->userModel->findById($id);
        $token = JWT::generate(['user_id' => $id, 'email' => $email]);

        Response::created(
            ['token' => $token, 'user' => $this->formatUser($user)],
            'Compte créé avec succès.'
        );
    }

    // ── US-02 : Connexion ────────────────────────────────────────────────────
    public function login(): void
    {
        $input = $this->getJson();

        $v = new Validator();
        $v->required($input['email']        ?? '', 'email')
          ->email($input['email']           ?? '', 'email')
          ->required($input['mot_de_passe'] ?? '', 'mot_de_passe');

        if (!$v->isValid()) {
            Response::error('Données invalides.', 422, $v->getErrors());
        }

        $user = $this->userModel->findByEmail(strtolower(trim($input['email'])));

        if (!$user || !password_verify($input['mot_de_passe'], $user['mot_de_passe'])) {
            Response::error('Identifiants incorrects.', 401);
        }

        $token = JWT::generate(['user_id' => $user['id'], 'email' => $user['email']]);

        Response::success(
            ['token' => $token, 'user' => $this->formatUser($user)],
            'Connexion réussie.'
        );
    }

    // ── US-02 : Déconnexion ──────────────────────────────────────────────────
    public function logout(): void
    {
        AuthMiddleware::handle(); // Vérifie le token
        $token = AuthMiddleware::getRawToken();
        JWT::revoke($token);
        Response::success(null, 'Déconnexion réussie.');
    }

    // ── Helpers ──────────────────────────────────────────────────────────────
    private function getJson(): array
    {
        $raw = file_get_contents('php://input');
        return json_decode($raw, true) ?? [];
    }

    private function formatUser(array $user): array
    {
        unset($user['mot_de_passe']);
        if ($user['matieres'])      $user['matieres']      = json_decode($user['matieres'], true);
        if ($user['disponibilites'])$user['disponibilites'] = json_decode($user['disponibilites'], true);
        return $user;
    }
}
