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
    const cells = document.querySelectorAll('#board td');
    cells.forEach((cell, index) => {
        cell.textContent = table[index] === '_' ? '' : table[index];
    });
}

function checkWinner() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "game.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        if (xhr.status === 200) {
            if (xhr.responseText !== '') {
                alert(xhr.responseText);
                gameOver = true;
            }
        }
    };
    xhr.send("table=" + table.join(''));
}

function computerMove() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "computer-side.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        if (xhr.status === 200) {
            table = xhr.responseText.split('');
            renderBoard();
            checkWinner();
        }
    };
    xhr.send("table=" + table.join('') + "&symbol=" + computerSymbol);
}

function onCellClick(index) {
    if (gameOver || table[index] !== '_') return;

    table[index] = playerSymbol;
    renderBoard();

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "game.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
        if (xhr.status === 200) {
            if (xhr.responseText !== '') {
                alert(xhr.responseText);
                gameOver = true;
            } else {
                computerMove();
            }
        }
    };
    xhr.send("table=" + table.join(''));
}

document.addEventListener("DOMContentLoaded", () => {
    chooseFirst();
    renderBoard();
    const cells = document.querySelectorAll('#board td');
    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => onCellClick(index));
    });
});
