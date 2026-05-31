<?php
// controllers/DocumentController.php

class DocumentController
{
    private DocumentModel $documentModel;
    private SessionModel  $sessionModel;

    public function __construct()
    {
        $this->documentModel = new DocumentModel();
        $this->sessionModel  = new SessionModel();
    }

    // ── Lister les documents d'une session ───────────────────────────────────
    public function index(int $sessionId): void
    {
        $payload = AuthMiddleware::handle();

        $session = $this->sessionModel->findById($sessionId);
        if (!$session) Response::notFound('Session introuvable.');

        // Vérifier que l'utilisateur participe à la session
        if (!$this->sessionModel->estInscrit($sessionId, $payload['user_id'])) {
            Response::error('Accès refusé à cette session.', 403);
        }

        $docs = $this->documentModel->listBySession($sessionId);
        Response::success($docs);
    }

    // ── Uploader un document ─────────────────────────────────────────────────
    public function upload(int $sessionId): void
    {
        $payload = AuthMiddleware::handle();

        $session = $this->sessionModel->findById($sessionId);
        if (!$session) Response::notFound('Session introuvable.');

        if (!$this->sessionModel->estInscrit($sessionId, $payload['user_id'])) {
            Response::error('Vous ne participez pas à cette session.', 403);
        }

        if (empty($_FILES['fichier'])) {
            Response::error('Aucun fichier reçu.', 400);
        }

        $file  = $_FILES['fichier'];

        // Vérification des erreurs d'upload PHP
        if ($file['error'] !== UPLOAD_ERR_OK) {
            Response::error('Erreur lors du transfert du fichier.', 400);
        }

        // Vérification de la taille
        if ($file['size'] > MAX_FILE_SIZE) {
            Response::error(
                'Fichier trop volumineux (max ' . (MAX_FILE_SIZE / 1024 / 1024) . ' Mo).', 413
            );
        }

        // Extension autorisée
        $originalName = basename($file['name']);
        $ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
        if (!in_array($ext, ALLOWED_EXTENSIONS, true)) {
            Response::error(
                'Extension non autorisée. Extensions acceptées : ' . implode(', ', ALLOWED_EXTENSIONS),
                415
            );
        }

        // Vérification MIME type (double contrôle)
        $finfo    = new finfo(FILEINFO_MIME_TYPE);
        $mimeType = $finfo->file($file['tmp_name']);
        $safeMimes = [
            'application/pdf','application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/plain','image/png','image/jpeg','image/gif',
            'application/zip',
        ];
        if (!in_array($mimeType, $safeMimes, true)) {
            Response::error('Type MIME non autorisé.', 415);
        }

        // Chemin de stockage sécurisé
        if (!is_dir(UPLOAD_DIR)) mkdir(UPLOAD_DIR, 0750, true);

        $safeName  = sprintf('%d_%d_%s.%s',
            $sessionId, $payload['user_id'],
            bin2hex(random_bytes(8)), $ext
        );
        $destPath  = UPLOAD_DIR . $safeName;

        if (!move_uploaded_file($file['tmp_name'], $destPath)) {
            Response::serverError('Impossible de sauvegarder le fichier.');
        }

        $id = $this->documentModel->create([
            'nom_fichier'     => $originalName,
            'chemin_stockage' => 'uploads/' . $safeName,
            'session_id'      => $sessionId,
            'utilisateur_id'  => $payload['user_id'],
        ]);

        $doc = $this->documentModel->findById($id);
        Response::created($doc, 'Document uploadé avec succès.');
    }

    // ── Supprimer un document (propriétaire ou créateur de session) ──────────
    public function destroy(int $sessionId, int $docId): void
    {
        $payload = AuthMiddleware::handle();

        $doc = $this->documentModel->findById($docId);
        if (!$doc || $doc['session_id'] != $sessionId) {
            Response::notFound('Document introuvable.');
        }

        $session = $this->sessionModel->findById($sessionId);
        $canDelete = $doc['utilisateur_id'] == $payload['user_id']
                  || $session['createur_id'] == $payload['user_id'];

        if (!$canDelete) {
            Response::error('Action non autorisée.', 403);
        }

        // Suppression physique du fichier
        $fullPath = __DIR__ . '/../' . $doc['chemin_stockage'];
        if (file_exists($fullPath)) unlink($fullPath);

        $this->documentModel->delete($docId);
        Response::success(null, 'Document supprimé.');
    }
}
