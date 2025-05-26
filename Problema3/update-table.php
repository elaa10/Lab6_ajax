<?php
$conn = new mysqli("localhost", "root", "", "laborator6");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = $_REQUEST['id'];


$nume = $_POST['Nume'];
$prenume = $_POST['Prenume'];
$telefon = $_POST['Telefon'];
$email = $_POST['Email'];

$sql = "UPDATE personal_data SET Nume = '$nume', Prenume = '$prenume', Telefon = '$telefon', Email = '$email' WHERE id = $id";
$result = $conn->query($sql);

$conn->close();
?>
