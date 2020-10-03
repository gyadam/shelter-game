export default class Player{
    constructor(game, x, y){
        this.game = game;
        this.position = {
            x: x,
            y: y
        }
        this.width = 25;
        this.height = 30;
        this.maxSpeed = 0.2;
        this.speed = {
            x: 0,
            y: 0
        };
        this.eyeSize = 7;
        this.eyeOffset = 4;
        this.pupilSize = 3;
        this.pupilPosition = {
            x: 4,
            y: 1
        };
        this.health = 100;
    }

    moveLeft(){
        this.speed.x = -this.maxSpeed;
    }

    moveRight(){
        this.speed.x = this.maxSpeed;
    }

    moveDown(){
        this.speed.y = this.maxSpeed;
    }

    moveUp(){
        this.speed.y = -this.maxSpeed;
    }

    stopLeft(){
        this.speed.x = 0;
    }
    
    stopRight(){
        this.speed.x = 0;
    }

    stopDown(){
        this.speed.y = 0;
    }

    stopUp(){
        this.speed.y = 0;
    }

    update(deltaTime){
        this.position.x += this.speed.x * deltaTime;
        this.position.y += this.speed.y * deltaTime;

        if (this.position.x < 0){
            this.position.x = 0;
            this.speed.x = 0;
        }
        
        if (this.position.x + this.width > this.game.gameWidth){
            this.position.x = this.game.gameWidth - this.width;
            this.speed.x = 0;
        }

        if (this.position.y < 0){
            this.position.y = 0;
            this.speed.y = 0;
        }
        
        if (this.position.y + this.height > this.game.gameHeight){
            this.position.y = this.game.gameHeight - this.height;
            this.speed.y = 0;
        }
    }

    draw(ctx){

        // body
        ctx.fillStyle = 'black';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

        // legs
        const legWidth = 8;
        ctx.fillRect(this.position.x, this.position.y + this.height - 1, legWidth, 4)
        ctx.fillRect(this.position.x + this.width - legWidth, this.position.y + this.height - 1, legWidth, 4)

        // eyes
        ctx.fillStyle = 'white';
        ctx.fillRect(this.position.x + this.eyeOffset, this.position.y + this.eyeOffset, this.eyeSize, this.eyeSize);
        ctx.fillRect(this.position.x + this.width - this.eyeSize - this.eyeOffset, this.position.y + this.eyeOffset, this.eyeSize, this.eyeSize);
        
        // todo: draw eyes in corner if moving diagonally

        if (this.speed.x < 0){
            this.pupilPosition.x = 0;
            this.pupilPosition.y = 2;
        }
        if (this.speed.x > 0){
            this.pupilPosition.x = 4;
            this.pupilPosition.y = 2;
        }
        if (this.speed.y < 0){
            this.pupilPosition.x = 2;
            this.pupilPosition.y = 0;
        }
        if (this.speed.y > 0){
            this.pupilPosition.x = 2;
            this.pupilPosition.y = 4;
        }

        ctx.fillStyle = 'black';
        ctx.fillRect(this.position.x + this.eyeOffset + this.pupilPosition.x, this.position.y + this.eyeOffset + this.pupilPosition.y, this.pupilSize, this.pupilSize);
        ctx.fillRect(this.position.x + this.width - this.eyeSize - this.eyeOffset + this.pupilPosition.x, this.position.y + this.eyeOffset + this.pupilPosition.y, this.pupilSize, this.pupilSize);
        
    }
}