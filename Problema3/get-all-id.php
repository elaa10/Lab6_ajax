<?php
$conn = new mysqli("localhost", "root", "", "laborator6");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id FROM personal_data";
$result = $conn->query($sql);

while ($row = $result->fetch_assoc()) {
    echo '<option value="' . $row['id'] . '">' . $row['id'] . '</option>';
}

$conn->close();
?>
