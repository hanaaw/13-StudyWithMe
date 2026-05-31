<?php
// middleware/AuthMiddleware.php

class AuthMiddleware
{
    /**
     * Vérifie le token JWT dans l'en-tête Authorization.
     * Retourne le payload ou termine avec 401.
     */
    public static function handle(): array
    {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION']
            ?? getallheaders()['Authorization']
            ?? '';

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            Response::unauthorized('Token d\'authentification manquant.');
        }

        $token   = substr($authHeader, 7);
        $payload = JWT::verify($token);

        if (!$payload) {
            Response::unauthorized('Token invalide ou expiré.');
        }

        return $payload;
    }

    /**
     * Extrait le token brut depuis l'en-tête (pour la déconnexion).
     */
    public static function getRawToken(): string
    {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION']
            ?? getallheaders()['Authorization']
            ?? '';
        return substr($authHeader, 7);
    }
}
