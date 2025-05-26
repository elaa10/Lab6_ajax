<?php
$conn = new mysqli("localhost", "root", "", "laborator6");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Connection failed']);
    exit;
}

$id = $_GET['id'] ?? null;

if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing ID']);
    exit;
}

$id = (int)$id;
$sql = "SELECT * FROM personal_data WHERE id = $id";
$result = $conn->query($sql);

if ($row = $result->fetch_assoc()) {
    // Setăm headerul ca să știm că e JSON
    header('Content-Type: application/json');
    echo json_encode($row);
} else {
    echo json_encode(['error' => 'Not found']);
}

$conn->close();
?>
