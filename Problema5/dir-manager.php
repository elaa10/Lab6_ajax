<?php
$dir = $_GET['directory'] ?? '.';
$entries = [];

if (is_dir($dir)) {
    foreach (scandir($dir) as $entry) {
        if ($entry === "." || $entry === "..") continue;
        $fullPath = $dir . DIRECTORY_SEPARATOR . $entry;
        $entries[] = [
            "name" => $entry,
            "type" => is_dir($fullPath) ? "dir" : "file",
            "path" => realpath($fullPath)
        ];
    }
}

header("Content-Type: application/json");
echo json_encode($entries);
?>
