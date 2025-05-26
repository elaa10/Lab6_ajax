<?php
$conn = new mysqli("localhost", "root", "", "laborator6");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$currentPage = $_GET['currentPage'];
$dimension = $_GET['dimension'];
$skip = $currentPage * $dimension;

$sql = "SELECT * FROM personal_data LIMIT $dimension OFFSET $skip";
$result = $conn->query($sql);

while ($row = $result->fetch_assoc()) {
    echo '<tr>';
    echo '<td>' . htmlspecialchars($row['Nume']) . '</td>';
    echo '<td>' . htmlspecialchars($row['Prenume']) . '</td>';
    echo '<td>' . htmlspecialchars($row['Telefon']) . '</td>';
    echo '<td>' . htmlspecialchars($row['Email']) . '</td>';
    echo '</tr>';
}

$conn->close();
?>
