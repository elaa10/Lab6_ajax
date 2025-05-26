<?php
$conn = new mysqli("localhost", "root", "", "laborator6");
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

$filters = ['producator', 'procesor', 'memorie', 'capacitatehdd', 'placavideo'];
$conditions = [];

foreach ($filters as $filter) {
    if (isset($_GET[$filter])) {
        $escaped = array_map([$conn, 'real_escape_string'], $_GET[$filter]);
        $values = "'" . implode("','", $escaped) . "'";
        $conditions[] = "$filter IN ($values)";
    }
}

$where = count($conditions) ? "WHERE " . implode(" AND ", $conditions) : "";

$sql = "SELECT * FROM it_products $where";
$result = $conn->query($sql);

echo "<tr><th>Producător</th><th>Procesor</th><th>Memorie</th><th>HDD</th><th>Placă video</th></tr>";

while ($row = $result->fetch_assoc()) {
    echo "<tr>
        <td>" . htmlspecialchars($row['producator']) . "</td>
        <td>" . htmlspecialchars($row['procesor']) . "</td>
        <td>" . htmlspecialchars($row['memorie']) . " GB</td>
        <td>" . htmlspecialchars($row['capacitatehdd']) . " GB</td>
        <td>" . htmlspecialchars($row['placavideo']) . "</td>
    </tr>";
}

$conn->close();
?>
