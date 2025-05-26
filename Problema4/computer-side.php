<?php
$table = $_POST['table'];
$symbol = $_POST['symbol'];

$tableArr = str_split($table);
$empty = array_keys($tableArr, '_');

if (!empty($empty)) {
    $choice = $empty[array_rand($empty)];
    $tableArr[$choice] = $symbol;
}

echo implode('', $tableArr);
?>
