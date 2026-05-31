<?php
// controllers/SessionController.php

class SessionController
{
    private SessionModel $sessionModel;

    public function __construct()
    {
        $this->sessionModel = new SessionModel();
    }

    // ── US-03 / US-04 : Lister les sessions disponibles ─────────────────────
    public function index(): void
    {
        $payload  = AuthMiddleware::handle();
        $sessions = $this->sessionModel->listAvailable($payload['user_id']);
        Response::success($sessions);
    }

    // ── US-03 : Lister les sessions personnelles ─────────────────────────────
    public function myPlanning(): void
    {
        $payload  = AuthMiddleware::handle();
        $sessions = $this->sessionModel->listByUser($payload['user_id']);
        Response::success($sessions);
    }

    // ── US-03 / US-04 : Créer une session ────────────────────────────────────
    public function store(): void
    {
        $payload = AuthMiddleware::handle();
        $input   = $this->getJson();

        $v = new Validator();
        $v->required($input['titre']     ?? '', 'titre')
          ->maxLength($input['titre']    ?? '', 'titre', 255)
          ->required($input['sujet']     ?? '', 'sujet')
          ->required($input['date_heure']?? '', 'date_heure')
          ->dateTime($input['date_heure']?? '', 'date_heure')
          ->required($input['duree']     ?? '', 'duree')
          ->integer($input['duree']      ?? 0,  'duree', 1);

        if (!$v->isValid()) {
            Response::error('Données invalides.', 422, $v->getErrors());
        }

        $id = $this->sessionModel->create([
            'titre'           => Validator::sanitize($input['titre']),
            'sujet'           => Validator::sanitize($input['sujet']),
            'date_heure'      => $input['date_heure'],
            'duree'           => (int)$input['duree'],
            'est_privee'      => !empty($input['est_privee']),
            'max_participants' => (int)($input['max_participants'] ?? 10),
            'createur_id'     => $payload['user_id'],
        ]);

        $session = $this->sessionModel->findById($id);
        Response::created($session, 'Session créée avec succès.');
    }

    // ── US-03 : Détails d'une session ────────────────────────────────────────
    public function show(int $id): void
    {
        AuthMiddleware::handle();
        $session = $this->sessionModel->findById($id);
        if (!$session) Response::notFound('Session introuvable.');

        $session['participants'] = $this->sessionModel->getParticipants($id);
        Response::success($session);
    }

    // ── US-03 : Modifier une session (créateur uniquement) ───────────────────
    public function update(int $id): void
    {
        $payload = AuthMiddleware::handle();
        $session = $this->sessionModel->findById($id);
        if (!$session) Response::notFound('Session introuvable.');
        if ($session['createur_id'] != $payload['user_id']) {
            Response::error('Action non autorisée.', 403);
        }

        $input = $this->getJson();
        $v = new Validator();
        if (!empty($input['date_heure']))
            $v->dateTime($input['date_heure'], 'date_heure');
        if (!empty($input['duree']))
            $v->integer($input['duree'], 'duree', 1);
        if (!$v->isValid()) {
            Response::error('Données invalides.', 422, $v->getErrors());
        }

        foreach (['titre','sujet'] as $f)
            if (!empty($input[$f])) $input[$f] = Validator::sanitize($input[$f]);

        $this->sessionModel->update($id, $input);
        Response::success($this->sessionModel->findById($id), 'Session mise à jour.');
    }

    // ── US-03 : Supprimer une session ────────────────────────────────────────
    public function destroy(int $id): void
    {
        $payload = AuthMiddleware::handle();
        $session = $this->sessionModel->findById($id);
        if (!$session) Response::notFound('Session introuvable.');
        if ($session['createur_id'] != $payload['user_id']) {
            Response::error('Action non autorisée.', 403);
        }
        $this->sessionModel->delete($id);
        Response::success(null, 'Session supprimée.');
    }

    // ── US-04/05 : Rejoindre une room ────────────────────────────────────────
    public function join(int $id): void
    {
        $payload = AuthMiddleware::handle();
        $input   = $this->getJson();

        // Trouver par ID ou par code d'invitation
        $session = isset($input['code_invitation'])
            ? $this->sessionModel->findByCode(Validator::sanitize($input['code_invitation']))
            : $this->sessionModel->findById($id);

        if (!$session) Response::notFound('Session introuvable ou code invalide.');

        if ($this->sessionModel->estInscrit($session['id'], $payload['user_id'])) {
            Response::error('Vous êtes déjà inscrit à cette session.', 409);
        }

        if ($session['nb_inscrits'] >= $session['max_participants']) {
            Response::error('Cette session est complète.', 400);
        }

        $this->sessionModel->inscrire($session['id'], $payload['user_id']);
        Response::success(null, 'Vous avez rejoint la session.');
    }

    // ── US-10 : Quitter une room ──────────────────────────────────────────────
    public function leave(int $id): void
    {
        $payload = AuthMiddleware::handle();
        $session = $this->sessionModel->findById($id);
        if (!$session) Response::notFound('Session introuvable.');

        if ($session['createur_id'] == $payload['user_id']) {
            Response::error('Le créateur ne peut pas quitter sa propre session. Supprimez-la.', 400);
        }

        if (!$this->sessionModel->estInscrit($id, $payload['user_id'])) {
            Response::error('Vous n\'êtes pas inscrit à cette session.', 400);
        }

        $this->sessionModel->desinscrire($id, $payload['user_id']);
        Response::success(null, 'Vous avez quitté la session.');
    }

    // ── Rejoindre via code ─────────────────────────────────────────────────
    public function joinByCode(): void
    {
        $payload = AuthMiddleware::handle();
        $input   = $this->getJson();

        if (empty($input['code_invitation'])) {
            Response::error('Code d\'invitation requis.', 400);
        }

        $session = $this->sessionModel->findByCode(
            Validator::sanitize($input['code_invitation'])
        );
        if (!$session) Response::notFound('Code d\'invitation invalide.');

        if ($this->sessionModel->estInscrit($session['id'], $payload['user_id'])) {
            Response::error('Vous êtes déjà inscrit à cette session.', 409);
        }

        if ($session['nb_inscrits'] >= $session['max_participants']) {
            Response::error('Cette session est complète.', 400);
        }

        $this->sessionModel->inscrire($session['id'], $payload['user_id']);
        Response::success($session, 'Vous avez rejoint la session privée.');
    }

    // ── Helpers ──────────────────────────────────────────────────────────────
    private function getJson(): array
    {
        return json_decode(file_get_contents('php://input'), true) ?? [];
    }
}
