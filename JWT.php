<?php
// utils/JWT.php

class JWT
{
    // ── Génère un token ──────────────────────────────────────────────────────
    public static function generate(array $payload): string
    {
        $header  = self::base64url(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
        $payload['iat'] = time();
        $payload['exp'] = time() + JWT_EXPIRY;
        $body    = self::base64url(json_encode($payload));
        $sig     = self::base64url(hash_hmac('sha256', "$header.$body", JWT_SECRET, true));
        return "$header.$body.$sig";
    }

    // ── Vérifie et décode un token ───────────────────────────────────────────
    public static function verify(string $token): ?array
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) return null;

        [$header, $body, $sig] = $parts;
        $expected = self::base64url(hash_hmac('sha256', "$header.$body", JWT_SECRET, true));

        if (!hash_equals($expected, $sig)) return null;

        $payload = json_decode(base64_decode(strtr($body, '-_', '+/')), true);
        if (!$payload || $payload['exp'] < time()) return null;

        // Vérification blacklist
        $hash = hash('sha256', $token);
        $db   = Database::getInstance();
        $stmt = $db->prepare('SELECT id FROM tokens_invalides WHERE token_hash = ?');
        $stmt->execute([$hash]);
        if ($stmt->fetch()) return null;

        return $payload;
    }

    // ── Révoque un token (déconnexion) ───────────────────────────────────────
    public static function revoke(string $token): void
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) return;

        $payload = json_decode(base64_decode(strtr($parts[1], '-_', '+/')), true);
        $hash    = hash('sha256', $token);
        $expire  = date('Y-m-d H:i:s', $payload['exp'] ?? time());

        $db = Database::getInstance();
        $stmt = $db->prepare(
            'INSERT IGNORE INTO tokens_invalides (token_hash, expire_at) VALUES (?, ?)'
        );
        $stmt->execute([$hash, $expire]);

        // Nettoyage périodique
        $db->exec("DELETE FROM tokens_invalides WHERE expire_at < NOW()");
    }

    private static function base64url(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }
}
