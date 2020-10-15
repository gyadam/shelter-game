'use strict';

export default class Coffee{
    constructor(x, y){
        this.position = {
            x: x,
            y: y
        };
        this.width = 40;
        this.radius = 0.85 * this.width / 2;
        this.scaleRatio = 0.25;
        this.timer = 0;
        this.lifetime = 500;
        this.markedForDeletion = false;
    }

    removeFromGame(){
        this.markedForDeletion = true;
    }

    update(deltaTime){
        this.timer += deltaTime * 0.005;
        this.width += Math.sin(this.timer) * this.scaleRatio;
        this.radius = 0.85 * this.width / 2;
        this.lifetime--;
        if(this.lifetime <= 0){
            this.removeFromGame();
        }
    }

    draw(ctx){
        let coffeeImg = document.getElementById("coffee-image");
        // centered around x, y coordinates
        ctx.drawImage(coffeeImg, this.position.x - this.width / 2, this.position.y - this.width / 2, this.width, this.width);
    }
}