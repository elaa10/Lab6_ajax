<?php
$conn = new mysqli("localhost", "root", "", "laborator6");
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

function renderFilter($conn, $column, $label) {
    $sql = "SELECT DISTINCT $column FROM it_products ORDER BY $column";
    $result = $conn->query($sql);

    echo "<div class='filter-group'>";
    echo "<h4>$label</h4>";

    while ($row = $result->fetch_assoc()) {
        $val = htmlspecialchars($row[$column]);
        echo "<label><input type='checkbox' name='$column' value='$val'> $val</label>";
    }

    echo "</div>";
}

renderFilter($conn, "producator", "Producător");
renderFilter($conn, "procesor", "Procesor");
renderFilter($conn, "memorie", "Memorie RAM");
renderFilter($conn, "capacitatehdd", "Capacitate HDD");
renderFilter($conn, "placavideo", "Placă video");

$conn->close();
?>
