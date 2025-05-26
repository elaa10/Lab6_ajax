<?php
$conn = new mysqli("localhost", "root", "", "laborator6");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT DISTINCT departure FROM routes ORDER BY departure ASC";
$result = $conn->query($sql);

$departures = [];

while ($row = $result->fetch_assoc()) {
    $departures[] = $row['departure'];
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($departures);
?>
