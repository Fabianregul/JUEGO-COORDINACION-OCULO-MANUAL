
// ==================== JUEGO PRINCIPAL ====================

// Declaración del canvas y contexto
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Variables del jugador
const player = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 70,
    width: 40,
    height: 60,
    speed: 40
};

// Array para meteoritos
const meteorites = [];
const meteoriteSize = 40;
let gameOver = false;
let score = 0; // <-- Nueva variable de puntuación

// Cargar imágenes
const bgImage = new Image();
bgImage.src = "img/fondo.jpg";

const meteoriteImg = new Image();
meteoriteImg.src = "img/meteorito.png";

const playerImg = new Image();
playerImg.src = "img/cohete.png";

// Función para generar meteoritos
function createMeteorite() {
    const x = Math.random() * (canvas.width - meteoriteSize);
    meteorites.push({ x: x, y: 0, width: meteoriteSize, height: meteoriteSize });
}

// Dibujar fondo
function drawBackground() {
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
}

// Dibujar jugador
function drawPlayer() {
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

// Dibujar meteoritos
function drawMeteorites() {
    meteorites.forEach(meteorite => {
        ctx.drawImage(meteoriteImg, meteorite.x, meteorite.y, meteorite.width, meteorite.height);
    });
}

// Mover meteoritos
function moveMeteorites() {
    for (let i = 0; i < meteorites.length; i++) {
        meteorites[i].y += 5;

        // Si el meteorito pasa el borde inferior, se elimina y suma puntos
        if (meteorites[i].y > canvas.height) {
            meteorites.splice(i, 1);
            score++;
        }
    }
}

// Detectar colisiones
function checkCollision() {
    meteorites.forEach(meteorite => {
        if (
            player.x < meteorite.x + meteorite.width &&
            player.x + player.width > meteorite.x &&
            player.y < meteorite.y + meteorite.height &&
            player.y + player.height > meteorite.y
        ) {
            gameOver = true;
        }
    });
}

// Dibujar puntuación en pantalla
function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Puntos: " + score, 10, 30);
}

// Loop principal del juego
function gameLoop() {
    if (gameOver) {
        alert("¡Has sido golpeado por un meteorito! Puntaje final: " + score);
        document.location.reload();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawPlayer();
    drawMeteorites();
    drawScore(); // <-- Muestra la puntuación

    moveMeteorites();
    checkCollision();

    requestAnimationFrame(gameLoop);
}

// Movimiento con botones
document.getElementById('leftButton').addEventListener('click', () => {
    if (player.x > 0) player.x -= player.speed;
});

document.getElementById('rightButton').addEventListener('click', () => {
    if (player.x < canvas.width - player.width) player.x += player.speed;
});

// Botón de opciones (abre modal)
const modal = document.getElementById('modal');
document.getElementById('optionsButton').addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Botón reiniciar
document.getElementById('restartButton').addEventListener('click', () => {
    document.location.reload();
});

// Cerrar modal
document.getElementById('closeModalButton').addEventListener('click', () => {
    modal.style.display = 'none';
});

// Generar meteoritos periódicamente
setInterval(createMeteorite, 1000);

// Iniciar el juego
gameLoop();
