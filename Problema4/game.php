<?php
$table = $_POST['table'];
$board = str_split($table);

function check($a, $b, $c) {
    global $board;
    return $board[$a] == $board[$b] && $board[$b] == $board[$c] && $board[$a] != '_';
}

$wins = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
];

foreach ($wins as $combo) {
    if (check(...$combo)) {
        echo "Player '{$board[$combo[0]]}' won!";
        exit;
    }
}

if (!in_array('_', $board)) {
    echo "Draw!";
}
?>
