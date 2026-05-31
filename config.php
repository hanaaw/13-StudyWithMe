<?php
// config/config.php

define('JWT_SECRET',       getenv('JWT_SECRET') ?: 'ch4ng3_th1s_s3cr3t_k3y_1n_pr0duct10n!');
define('JWT_EXPIRY',       3600 * 24);   // 24 heures
define('UPLOAD_DIR',       __DIR__ . '/../uploads/');
define('MAX_FILE_SIZE',    10 * 1024 * 1024); // 10 Mo
define('ALLOWED_EXTENSIONS', ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'txt', 'png', 'jpg', 'jpeg', 'gif', 'zip']);
define('BASE_URL',         getenv('BASE_URL') ?: 'http://localhost/studywithme');
