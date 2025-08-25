// //declaracion
// const canvas = document.getElementById('gameCanvas');
// const ctx = canvas.getContext('2d');

// // Variables del jugador
// const player = {
//     x: canvas.width / 2 - 20,
//     y: canvas.height - 50,
//     width: 40,
//     height: 20,
//     speed: 40
// };

// // Array para meteoritos
// const meteorites = [];
// const meteoriteSize = 20;
// let gameOver = false;

// // Función para generar un meteorito
// function createMeteorite() {
//     const x = Math.random() * (canvas.width - meteoriteSize);
//     meteorites.push({ x: x, y: 0, width: meteoriteSize, height: meteoriteSize });
// }

// // Función para dibujar el jugador
// function drawPlayer() {
//     ctx.fillStyle = "blue";
//     ctx.fillRect(player.x, player.y, player.width, player.height);
// }

// // Función para dibujar los meteoritos
// function drawMeteorites() {
//     ctx.fillStyle = "red";
//     meteorites.forEach(meteorite => {
//         ctx.fillRect(meteorite.x, meteorite.y, meteorite.width, meteorite.height);
//     });
// }

// // Función para mover los meteoritos
// function moveMeteorites() {
//     meteorites.forEach(meteorite => {
//         meteorite.y += 5;
//     });
// }

// // Función para detectar colisiones
// function checkCollision() {
//     meteorites.forEach(meteorite => {
//         if (
//             player.x < meteorite.x + meteorite.width &&
//             player.x + player.width > meteorite.x &&
//             player.y < meteorite.y + meteorite.height &&
//             player.y + player.height > meteorite.y
//         ) {
//             gameOver = true;
//         }
//     });
// }

// // Función para eliminar meteoritos fuera del canvas
// function removeOffScreenMeteorites() {
//     for (let i = 0; i < meteorites.length; i++) {
//         if (meteorites[i].y > canvas.height) {
//             meteorites.splice(i, 1);
//             i--;
//         }
//     }
// }

// // Función principal del juego
// function gameLoop() {
//     if (gameOver) {
//         alert("¡Has sido golpeado por un meteorito! Fin del juego.");
//         document.location.reload();
//         return;
//     }

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     drawPlayer();
//     drawMeteorites();

//     moveMeteorites();
//     checkCollision();
//     removeOffScreenMeteorites();

//     requestAnimationFrame(gameLoop);
// }

// // Eventos para mover al jugador con botones
// document.getElementById('leftButton').addEventListener('click', () => {
//     if (player.x > 0) {
//         player.x -= player.speed;
//     }
// });

// document.getElementById('rightButton').addEventListener('click', () => {
//     if (player.x < canvas.width - player.width) {
//         player.x += player.speed;
//     }
// });

// // Botón de opciones para mostrar el modal
// const modal = document.getElementById('modal');
// document.getElementById('optionsButton').addEventListener('click', () => {
//     modal.style.display = 'flex';
// });

// // Botón para reiniciar el juego
// document.getElementById('restartButton').addEventListener('click', () => {
//     document.location.reload();
// });

// // Botón para cerrar el modal
// document.getElementById('closeModalButton').addEventListener('click', () => {
//     modal.style.display = 'none';
// });

// // Generar meteoritos periódicamente
// setInterval(createMeteorite, 1000);

// // Iniciar el juego
// gameLoop();


// class Game {
//     constructor(canvasId, leftBtnId, rightBtnId, scoreId) {
//         this.canvas = document.getElementById(canvasId);
//         this.ctx = this.canvas.getContext('2d');
//         this.scoreElement = document.getElementById(scoreId);
//         this.leftButton = document.getElementById(leftBtnId);
//         this.rightButton = document.getElementById(rightBtnId);

//         this.player = { x: this.canvas.width / 2 - 20, y: this.canvas.height - 50, width: 40, height: 20, speed: 40 };
//         this.meteorites = [];
//         this.meteoriteSize = 20;
//         this.score = 0;
//         this.gameOver = false;

//         // Eventos de botones
//         this.leftButton.addEventListener('click', () => this.moveLeft());
//         this.rightButton.addEventListener('click', () => this.moveRight());

//         // Iniciar meteoritos
//         this.meteoriteInterval = setInterval(() => this.createMeteorite(), 1000);
        
//         // Iniciar loop
//         requestAnimationFrame(() => this.gameLoop());
//     }

//     createMeteorite() {
//         if (!this.gameOver) {
//             const x = Math.random() * (this.canvas.width - this.meteoriteSize);
//             this.meteorites.push({ x, y: 0, width: this.meteoriteSize, height: this.meteoriteSize });
//         }
//     }

//     drawPlayer() {
//         if (!this.gameOver) {
//             this.ctx.fillStyle = "blue";
//             this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
//         }
//     }

//     drawMeteorites() {
//         this.ctx.fillStyle = "red";
//         this.meteorites.forEach(meteorite => {
//             this.ctx.fillRect(meteorite.x, meteorite.y, meteorite.width, meteorite.height);
//         });
//     }

//     moveMeteorites() {
//         for (let i = 0; i < this.meteorites.length; i++) {
//             this.meteorites[i].y += 5;

//             // Si el meteorito pasa el borde, suma 1 punto y se elimina
//             if (this.meteorites[i].y > this.canvas.height) {
//                 this.meteorites.splice(i, 1); // Elimina el meteorito
//                 this.score++; // Aumenta el puntaje
//                 this.updateScore(); // Actualiza el marcador
//             }
//         }
//     }

//     checkCollision() {
//         this.meteorites.forEach(meteorite => {
//             if (
//                 this.player.x < meteorite.x + meteorite.width &&
//                 this.player.x + this.player.width > meteorite.x &&
//                 this.player.y < meteorite.y + meteorite.height &&
//                 this.player.y + this.player.height > meteorite.y
//             ) {
//                 this.gameOver = true;
//                 clearInterval(this.meteoriteInterval); // Detener la generación de meteoritos
//             }
//         });
//     }

//     updateScore() {
//         this.scoreElement.textContent = this.score;
//     }

//     gameLoop() {
//         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//         this.drawPlayer();
//         this.drawMeteorites();
//         this.moveMeteorites();
//         this.checkCollision();

//         if (!this.gameOver) {
//             requestAnimationFrame(() => this.gameLoop());
//         } else {
//             this.endGame();
//         }
//     }

//     moveLeft() {
//         if (!this.gameOver && this.player.x > 0) {
//             this.player.x -= this.player.speed;
//         }
//     }

//     moveRight() {
//         if (!this.gameOver && this.player.x < this.canvas.width - this.player.width) {
//             this.player.x += this.player.speed;
//         }
//     }

//     endGame() {
//         if (game1.gameOver && game2.gameOver) {
//             setTimeout(() => {
//                 alert("¡Ambos jugadores han perdido! Fin del juego.");
//                 document.location.reload();
//             }, 500);
//         }
//     }
// }

// // Crear instancias de los dos juegos
// const game1 = new Game('gameCanvas1', 'leftButton1', 'rightButton1', 'score1');
// const game2 = new Game('gameCanvas2', 'leftButton2', 'rightButton2', 'score2');

// // Teclado para los jugadores
// document.addEventListener('keydown', (event) => {
//     if (event.key === 'a') game1.moveLeft();
//     if (event.key === 'd') game1.moveRight();
//     if (event.key === 'j') game2.moveLeft();
//     if (event.key === 'l') game2.moveRight();
// });

// // Reinicio del juego
// document.getElementById('restartButton').addEventListener('click', () => {
//     document.location.reload();
// });
// document.getElementById('closeModalButton').addEventListener('click', () => {
//     document.getElementById('modal').style.display = 'none';
// });

class Game {
    constructor(canvasId, leftBtnId, rightBtnId, scoreId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById(scoreId);
        this.leftButton = document.getElementById(leftBtnId);
        this.rightButton = document.getElementById(rightBtnId);

        this.player = { x: this.canvas.width / 2 - 20, y: this.canvas.height - 70, width: 40, height: 60, speed: 40 };
        this.meteorites = [];
        this.meteoriteSize = 40;
        this.score = 0;
        this.gameOver = false;

        // Cargar imágenes
        this.bgImage = new Image();
        this.bgImage.src = "img/fondo.jpg";

        this.meteoriteImg = new Image();
        this.meteoriteImg.src = "img/meteorito.png";

        this.playerImg = new Image();
        this.playerImg.src = "img/cohete.png";

        // Eventos de botones
        this.leftButton.addEventListener('click', () => this.moveLeft());
        this.rightButton.addEventListener('click', () => this.moveRight());

        // Iniciar meteoritos
        this.meteoriteInterval = setInterval(() => this.createMeteorite(), 1000);
        
        // Iniciar loop
        requestAnimationFrame(() => this.gameLoop());
    }

    createMeteorite() {
        if (!this.gameOver) {
            const x = Math.random() * (this.canvas.width - this.meteoriteSize);
            this.meteorites.push({ x, y: 0, width: this.meteoriteSize, height: this.meteoriteSize });
        }
    }

    drawBackground() {
        this.ctx.drawImage(this.bgImage, 0, 0, this.canvas.width, this.canvas.height);
    }

    drawPlayer() {
        if (!this.gameOver) {
            this.ctx.drawImage(this.playerImg, this.player.x, this.player.y, this.player.width, this.player.height);
        }
    }

    drawMeteorites() {
        this.meteorites.forEach(meteorite => {
            this.ctx.drawImage(this.meteoriteImg, meteorite.x, meteorite.y, meteorite.width, meteorite.height);
        });
    }

    moveMeteorites() {
        for (let i = 0; i < this.meteorites.length; i++) {
            this.meteorites[i].y += 5;

            // Si el meteorito pasa el borde, suma 1 punto y se elimina
            if (this.meteorites[i].y > this.canvas.height) {
                this.meteorites.splice(i, 1); // Elimina el meteorito
                this.score++; // Aumenta el puntaje
                this.updateScore(); // Actualiza el marcador
            }
        }
    }

    checkCollision() {
        this.meteorites.forEach(meteorite => {
            if (
                this.player.x < meteorite.x + meteorite.width &&
                this.player.x + this.player.width > meteorite.x &&
                this.player.y < meteorite.y + meteorite.height &&
                this.player.y + this.player.height > meteorite.y
            ) {
                this.gameOver = true;
                clearInterval(this.meteoriteInterval); // Detener la generación de meteoritos
            }
        });
    }

    updateScore() {
        this.scoreElement.textContent = this.score;
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBackground();
        this.drawPlayer();
        this.drawMeteorites();
        this.moveMeteorites();
        this.checkCollision();

        if (!this.gameOver) {
            requestAnimationFrame(() => this.gameLoop());
        } else {
            this.endGame();
        }
    }

    moveLeft() {
        if (!this.gameOver && this.player.x > 0) {
            this.player.x -= this.player.speed;
        }
    }

    moveRight() {
        if (!this.gameOver && this.player.x < this.canvas.width - this.player.width) {
            this.player.x += this.player.speed;
        }
    }

    endGame() {
        if (game1.gameOver && game2.gameOver) {
            setTimeout(() => {
                alert("¡Ambos jugadores han perdido! Fin del juego.");
                document.location.reload();
            }, 500);
        }
    }
}

// Crear instancias de los dos juegos
const game1 = new Game('gameCanvas1', 'leftButton1', 'rightButton1', 'score1');
const game2 = new Game('gameCanvas2', 'leftButton2', 'rightButton2', 'score2');

// Teclado para los jugadores
document.addEventListener('keydown', (event) => {
    if (event.key === 'a') game1.moveLeft();
    if (event.key === 'd') game1.moveRight();
    if (event.key === 'j') game2.moveLeft();
    if (event.key === 'l') game2.moveRight();
});

// Reinicio del juego
document.getElementById('restartButton').addEventListener('click', () => {
    document.location.reload();
});
document.getElementById('closeModalButton').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});
