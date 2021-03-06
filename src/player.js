import Coffee from "./coffee.js";
import Star from "./star.js";

export default class Player{
    constructor(game, x, y, color){
        this.game = game;
        this.position = {
            x: x,
            y: y
        }
        this.width = 25;
        this.height = 34;
        this.color = 'black';
        this.maxSpeed = 0.25;
        this.speed = {
            x: 0,
            y: 0
        };
        this.bodyHeight = 30;
        this.legWidth = 8;
        this.legLength = 4;
        this.eyeSize = 7;
        this.eyeOffset = 4;
        this.pupilSize = 3;
        this.pupilPosition = {
            x: 4,
            y: 1
        };
        this.health = 100;
        this.sanity = 100;
        this.isHit = false;
        this.impactTime = 0;
        this.radius = (Math.sqrt(this.width*this.width + this.height*this.height)) / 2;
        this.drankCoffee = false;
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

    hit(){
        this.impactTime = 5;
    }

    increaseSpeed(ratio){
        this.maxSpeed *= ratio;
    }

    decreaseSpeed(ratio){
        this.maxSpeed /= ratio;
    }

    collect(object){
        object.removeFromGame();
        if (object instanceof Star){
            this.game.score += 10;
        } else if (object instanceof Coffee){
            this.game.score += 20;
            this.drankCoffee = true;
        }
    }

    resetCoffeeFlag(){
        this.drankCoffee = false;
    }

    checkCollision(object){
        function distBetweenPoints(x1, y1, x2, y2) {
            return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        }

        if (distBetweenPoints(this.position.x + this.width / 2, this.position.y + this.height / 2, object.position.x, object.position.y) < this.radius + object.radius){
            return true;
        }

        return false;
    }

    update(deltaTime){
        this.position.x += this.speed.x * deltaTime;
        this.position.y += this.speed.y * deltaTime;

        if (this.position.x > this.game.gameWidth + this.width){
            this.position.x = 0;
        } else if (this.position.x < 0 - this.width){
            this.position.x = this.game.gameWidth;
        }

        if (this.position.y > this.game.gameHeight + this.height){
            this.position.y = 0;
        } else if (this.position.y < 0 - this.height){
            this.position.y = this.game.gameHeight;
        }

        if (this.impactTime === 0){
            this.isHit = false;
        } else {
            this.isHit = true;
            this.impactTime--;
        }

        for(let star of this.game.stars){
            if(this.checkCollision(star)){
                this.collect(star);
            };
        }

        for (let coffee of this.game.coffees){
            if (this.checkCollision(coffee)){
                this.collect(coffee);
            };
        }
    }

    draw(ctx){

        ctx.beginPath();

        // body
        ctx.fillStyle = this.isHit ? 'red' : 'black';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.bodyHeight);

        // legs
        ctx.fillRect(this.position.x, this.position.y + this.bodyHeight - 1, this.legWidth, this.legLength)
        ctx.fillRect(this.position.x + this.width - this.legWidth, this.position.y + this.bodyHeight - 1, this.legWidth, 4)

        // eyes
        ctx.fillStyle = `rgb(255, ${this.sanity * 2.55}, ${this.sanity * 2.55})`;
        ctx.fillRect(this.position.x + this.eyeOffset, this.position.y + this.eyeOffset, this.eyeSize, this.eyeSize);
        ctx.fillRect(this.position.x + this.width - this.eyeSize - this.eyeOffset, this.position.y + this.eyeOffset, this.eyeSize, this.eyeSize);
        
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

        ctx.fillStyle = this.isHit ? 'red' : 'black';
        ctx.fillRect(this.position.x + this.eyeOffset + this.pupilPosition.x, this.position.y + this.eyeOffset + this.pupilPosition.y, this.pupilSize, this.pupilSize);
        ctx.fillRect(this.position.x + this.width - this.eyeSize - this.eyeOffset + this.pupilPosition.x, this.position.y + this.eyeOffset + this.pupilPosition.y, this.pupilSize, this.pupilSize);
        
    }
}