import { Snake } from './snake.js';
import { Food } from './food.js';

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.startBtn = document.getElementById('startBtn');

        this.gridSize = 20;
        this.tileCount = 20;
        this.canvas.width = this.canvas.height = this.gridSize * this.tileCount;

        this.snake = new Snake(this.gridSize);
        this.food = new Food(this.gridSize);
        
        this.score = 0;
        this.gameLoop = null;
        this.gameSpeed = 150;

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.startGame());

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp': this.snake.setDirection('up'); break;
                case 'ArrowDown': this.snake.setDirection('down'); break;
                case 'ArrowLeft': this.snake.setDirection('left'); break;
                case 'ArrowRight': this.snake.setDirection('right'); break;
            }
        });

        // Mobile controls
        ['up', 'down', 'left', 'right'].forEach(direction => {
            document.getElementById(`${direction}Btn`)?.addEventListener('click', () => {
                this.snake.setDirection(direction);
            });
        });
    }

    startGame() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
        }

        this.snake.reset();
        this.score = 0;
        this.scoreElement.textContent = this.score;
        this.food.spawn(this.tileCount, this.tileCount, this.snake);
        
        this.gameLoop = setInterval(() => this.update(), this.gameSpeed);
        this.startBtn.textContent = 'Restart Game';
    }

    update() {
        this.snake.update();

        // Check if snake ate food
        if (this.snake.body[0].x === this.food.position.x && 
            this.snake.body[0].y === this.food.position.y) {
            this.score += 10;
            this.scoreElement.textContent = this.score;
            this.snake.grow();
            this.food.spawn(this.tileCount, this.tileCount, this.snake);
        } else {
            this.snake.body.pop();
        }

        // Check collision
        if (this.snake.checkCollision(this.tileCount, this.tileCount)) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
            alert(`Game Over! Score: ${this.score}`);
            return;
        }

        this.draw();
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw snake
        this.ctx.fillStyle = '#4CAF50';
        this.snake.body.forEach(segment => {
            this.ctx.fillRect(
                segment.x * this.gridSize,
                segment.y * this.gridSize,
                this.gridSize - 1,
                this.gridSize - 1
            );
        });

        // Draw food
        this.ctx.fillStyle = '#FF0000';
        this.ctx.fillRect(
            this.food.position.x * this.gridSize,
            this.food.position.y * this.gridSize,
            this.gridSize - 1,
            this.gridSize - 1
        );
    }
}

// Initialize game
new Game();