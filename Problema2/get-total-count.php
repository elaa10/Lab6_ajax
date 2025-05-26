<?php
$conn = new mysqli("localhost", "root", "", "laborator6");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT COUNT(*) as nr FROM personal_data";
$result = $conn->query($sql);

if ($row = $result->fetch_assoc()) {
    echo $row['nr'];
}

$conn->close();
?>
