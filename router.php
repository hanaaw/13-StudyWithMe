<?php
// api/router.php  –  Point d'entrée unique de l'API

define('ROOT', dirname(__DIR__));

// ── Auto-chargement des classes ──────────────────────────────────────────────
$autoloadDirs = [
    ROOT . '/config',
    ROOT . '/utils',
    ROOT . '/middleware',
    ROOT . '/models',
    ROOT . '/controllers',
];
spl_autoload_register(function (string $class) use ($autoloadDirs): void {
    foreach ($autoloadDirs as $dir) {
        $file = "$dir/$class.php";
        if (file_exists($file)) { require_once $file; return; }
    }
});

require_once ROOT . '/config/config.php';

// ── En-têtes communs ─────────────────────────────────────────────────────────
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

// ── Gestion globale des exceptions ───────────────────────────────────────────
set_exception_handler(function (Throwable $e): void {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Erreur serveur interne.',
        'debug'   => getenv('APP_DEBUG') ? $e->getMessage() : null,
    ]);
    exit;
});

// ── Parsing de la route ──────────────────────────────────────────────────────
$method = $_SERVER['REQUEST_METHOD'];
$uri    = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri    = preg_replace('#^/13-studywithme/api#', '', $uri); // strip base path
$uri    = rtrim($uri, '/') ?: '/';
$parts  = explode('/', ltrim($uri, '/'));

// ── Routage ──────────────────────────────────────────────────────────────────
// Pattern : /<ressource>[/<id>[/<sous-ressource>[/<sous-id>]]]
$resource    = $parts[0] ?? '';
$id          = isset($parts[1]) && is_numeric($parts[1]) ? (int)$parts[1] : null;
$subResource = $parts[2] ?? null;
$subId       = isset($parts[3]) && is_numeric($parts[3]) ? (int)$parts[3] : null;

switch ($resource) {

    // ── AUTH ─────────────────────────────────────────────────────────────────
    case 'auth':
        $c = new AuthController();
        match ("$method:$id:$subResource") {
            'POST::register' => $c->register(),
            'POST::login'    => $c->login(),
            'POST::logout'   => $c->logout(),
            default          => Response::notFound('Route auth introuvable.')
        };
        break;

    // ── UTILISATEURS ─────────────────────────────────────────────────────────
    case 'users':
        $c = new UserController();
        if ($method === 'GET' && $id === null && $subResource === null) {
            $c->search();
        } elseif ($method === 'GET' && $id === null && $subResource === 'me') {
            $c->getProfile();
        } elseif ($method === 'PATCH' || ($method === 'PUT' && $id === null && $subResource === 'me')) {
            $c->updateProfile();
        } elseif ($method === 'GET' && $id !== null) {
            $c->getPublicProfile($id);
        } else {
            Response::notFound('Route users introuvable.');
        }
        break;

    // ── SESSIONS D'ÉTUDE ─────────────────────────────────────────────────────
    case 'sessions':
        $c = new SessionController();

        if ($method === 'GET' && $id === null && $subResource === null) {
            $c->index();
        } elseif ($method === 'GET' && $id === null && $subResource === 'planning') {
            $c->myPlanning();
        } elseif ($method === 'POST' && $id === null && $subResource === 'join-code') {
            $c->joinByCode();
        } elseif ($method === 'POST' && $id === null) {
            $c->store();
        } elseif ($method === 'GET' && $id !== null && $subResource === null) {
            $c->show($id);
        } elseif (in_array($method, ['PUT','PATCH']) && $id !== null && $subResource === null) {
            $c->update($id);
        } elseif ($method === 'DELETE' && $id !== null && $subResource === null) {
            $c->destroy($id);
        } elseif ($method === 'POST' && $id !== null && $subResource === 'join') {
            $c->join($id);
        } elseif ($method === 'DELETE' && $id !== null && $subResource === 'leave') {
            $c->leave($id);
        } else {
            Response::notFound('Route sessions introuvable.');
        }
        break;

    // ── DOCUMENTS ────────────────────────────────────────────────────────────
    // /sessions/{id}/documents  →  géré ci-dessous (sous-ressource)
    // mais on peut aussi router /documents directement
    case 'documents':
        // /documents n'existe pas en standalone dans notre API
        Response::notFound('Accédez aux documents via /sessions/{id}/documents.');
        break;

    default:
        // Sous-ressources : /sessions/{id}/documents[/{docId}]
        // Rechargement du routage pour ce cas particulier
        if ($resource === 'sessions' && $id !== null && $subResource === 'documents') {
            $c = new DocumentController();
            if ($method === 'GET') {
                $c->index($id);
            } elseif ($method === 'POST') {
                $c->upload($id);
            } elseif ($method === 'DELETE' && $subId !== null) {
                $c->destroy($id, $subId);
            } else {
                Response::notFound('Route documents introuvable.');
            }
        } else {
            Response::notFound("Route '$uri' introuvable.");
        }
}
