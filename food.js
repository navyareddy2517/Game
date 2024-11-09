export class Food {
    constructor(size) {
        this.size = size;
        this.position = { x: 0, y: 0 };
    }

    spawn(width, height, snake) {
        let newPosition;
        do {
            newPosition = {
                x: Math.floor(Math.random() * width),
                y: Math.floor(Math.random() * height)
            };
        } while (this.isOnSnake(newPosition, snake));

        this.position = newPosition;
    }

    isOnSnake(position, snake) {
        return snake.body.some(segment => 
            segment.x === position.x && segment.y === position.y
        );
    }
}