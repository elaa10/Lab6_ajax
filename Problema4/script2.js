let table = new Array(9).fill('_');
let playerSymbol, computerSymbol;
let gameOver = false;

function chooseFirst() {
    if (Math.random() < 0.5) {
        playerSymbol = 'X';
        computerSymbol = 'O';
    } else {
        playerSymbol = 'O';
        computerSymbol = 'X';
        computerMove(); // computer starts
    }
}

function renderBoard() {
    $('#board td').each(function(index) {
        const value = table[index];
        $(this).text(value === '_' ? '' : value);
    });
}

function checkWinner(callback) {
    $.post("game.php", { table: table.join('') }, function(response) {
        if (response !== '') {
            alert(response);
            gameOver = true;
        }
        if (typeof callback === 'function') callback();
    });
}

function computerMove() {
    $.post("computer-side.php", {
        table: table.join(''),
        symbol: computerSymbol
    }, function(response) {
        table = response.split('');
        renderBoard();
        checkWinner();
    });
}

function onCellClick(index) {
    if (gameOver || table[index] !== '_') return;

    table[index] = playerSymbol;
    renderBoard();

    checkWinner(function () {
        if (!gameOver) {
            computerMove();
        }
    });
}

$(document).ready(function () {
    chooseFirst();
    renderBoard();

    $('#board td').each(function (index) {
        $(this).on('click', function () {
            onCellClick(index);
        });
    });
});
