<?php
$conn = new mysqli("localhost", "root", "", "laborator6");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$departure = $_GET['departure'] ?? '';
$departure = $conn->real_escape_string($departure);

$sql = "SELECT DISTINCT arrival FROM routes WHERE departure = '$departure'";
$result = $conn->query($sql);

echo '<ul class="arrival-list">';
while ($row = $result->fetch_assoc()) {
    echo '<li>' . htmlspecialchars($row['arrival']) . '</li>';
}
echo '</ul>';

$conn->close();
?>
