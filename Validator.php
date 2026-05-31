<?php
// utils/Validator.php

class Validator
{
    private array $errors = [];

    public function required(mixed $value, string $field): self
    {
        if ($value === null || trim((string)$value) === '') {
            $this->errors[$field] = "Le champ '$field' est obligatoire.";
        }
        return $this;
    }

    public function email(string $value, string $field): self
    {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            $this->errors[$field] = "L'adresse email '$field' est invalide.";
        }
        return $this;
    }

    public function minLength(string $value, string $field, int $min): self
    {
        if (strlen($value) < $min) {
            $this->errors[$field] = "Le champ '$field' doit contenir au moins $min caractères.";
        }
        return $this;
    }

    public function maxLength(string $value, string $field, int $max): self
    {
        if (strlen($value) > $max) {
            $this->errors[$field] = "Le champ '$field' ne doit pas dépasser $max caractères.";
        }
        return $this;
    }

    public function integer(mixed $value, string $field, int $min = 1): self
    {
        if (!filter_var($value, FILTER_VALIDATE_INT) || (int)$value < $min) {
            $this->errors[$field] = "Le champ '$field' doit être un entier >= $min.";
        }
        return $this;
    }

    public function dateTime(string $value, string $field): self
    {
        $d = DateTime::createFromFormat('Y-m-d H:i:s', $value);
        if (!$d) {
            $this->errors[$field] = "Le champ '$field' doit être au format YYYY-MM-DD HH:MM:SS.";
        }
        return $this;
    }

    public function isValid(): bool  { return empty($this->errors); }
    public function getErrors(): array { return $this->errors; }

    // Sanitize une chaîne
    public static function sanitize(string $value): string
    {
        return htmlspecialchars(strip_tags(trim($value)), ENT_QUOTES, 'UTF-8');
    }
}
