const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const resetButton = document.getElementById('reset');

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = {};
let score = 0;
let gameInterval;

// Menghasilkan posisi makanan secara acak
function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
        y: Math.floor(Math.random() * (canvas.height / 10)) * 10,
    };
}

// Menggambar ular dan makanan
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Menggambar makanan
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);

    // Menggambar ular
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });

    // Memperbarui skor
    scoreDisplay.innerText = `Skor: ${score}`;
}

// Memperbarui posisi ular
function update() {
    const head = { x: snake[0].x + direction.x * 10, y: snake[0].y + direction.y * 10 };

    // Cek jika ular memakan makanan
    if (head.x === food.x && head.y === food.y) {
        score++;
        generateFood();
    } else {
        snake.pop(); // Hapus segmen terakhir
    }

    // Cek tabrakan dengan dinding atau dirinya sendiri
    if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        clearInterval(gameInterval);
        alert('Game Over! Skor Anda: ' + score);
        return;
    }

    snake.unshift(head); // Tambahkan kepala baru
}

// Mengontrol arah ular
document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

// Memulai permainan
function startGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    generateFood();
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(() => {
        update();
        draw();
    }, 100);
}

// Mengatur ulang permainan
resetButton.addEventListener('click', startGame);

// Memulai permainan saat halaman dimuat
window.onload = startGame;