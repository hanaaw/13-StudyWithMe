<?php
// utils/Response.php

class Response
{
    public static function json(mixed $data, int $code = 200): void
    {
        http_response_code($code);
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    public static function success(mixed $data = null, string $message = 'Succès', int $code = 200): void
    {
        self::json(['success' => true, 'message' => $message, 'data' => $data], $code);
    }

    public static function created(mixed $data = null, string $message = 'Ressource créée'): void
    {
        self::json(['success' => true, 'message' => $message, 'data' => $data], 201);
    }

    public static function error(string $message, int $code = 400, array $errors = []): void
    {
        $body = ['success' => false, 'message' => $message];
        if ($errors) $body['errors'] = $errors;
        self::json($body, $code);
    }

    public static function unauthorized(string $message = 'Non autorisé'): void
    {
        self::error($message, 401);
    }

    public static function notFound(string $message = 'Ressource introuvable'): void
    {
        self::error($message, 404);
    }

    public static function serverError(string $message = 'Erreur serveur interne'): void
    {
        self::error($message, 500);
    }
}
