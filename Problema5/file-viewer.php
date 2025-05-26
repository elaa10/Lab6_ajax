<?php
$file = $_GET['file'] ?? '';

if (is_file($file)) {
    // Doar extensii sigure, evită PHP, EXE etc.
    $allowed = ['txt', 'html', 'css', 'js', 'json', 'log', 'php'];
    $ext = pathinfo($file, PATHINFO_EXTENSION);

    if (in_array($ext, $allowed)) {
        echo htmlspecialchars(file_get_contents($file));
    } else {
        echo "⚠️ Tipul fișierului nu este permis pentru vizualizare.";
    }
} else {
    echo "Fișier inexistent sau invalid.";
}
?>
