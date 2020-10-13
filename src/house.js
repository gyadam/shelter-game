'use strict';

export default class House{
    constructor(center={x:500, y:300}, width=150, height=100){
        this.color = "#B73239";
        this.width = width;
        this.height = height;
        this.position = {
            x: center.x - width / 2,
            y: center.y - height / 2
        };
    }

    draw(ctx){
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.rect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        let plantImg = document.getElementById("plant-image");
        ctx.drawImage(plantImg, this.position.x + 10, this.position.y + 55, 30, 30);

        let tvImg = document.getElementById("tv-image");
        ctx.drawImage(tvImg, this.position.x + 99, this.position.y + 47, 311*0.1, 352*0.1);

        let lampImg = document.getElementById("lamp-image");
        ctx.drawImage(lampImg, this.position.x + 30, this.position.y + 15, 40, 40);
        
        // House walls (this mess should be refactored!)

        // top wall
        let offsetY = 10;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, 20);
        while(offsetY <= 20){

            let brickSize = 20;
            let offsetX = offsetY % 20 == 0 ? brickSize : brickSize / 2;
            while(offsetX < this.width){
                ctx.moveTo(this.position.x + offsetX, this.position.y + offsetY - 10);
                ctx.lineTo(this.position.x + offsetX, this.position.y + offsetY);
                offsetX += 20;
            }

            if (offsetY > 0){
                ctx.moveTo(this.position.x, this.position.y + offsetY);
                ctx.lineTo(this.position.x + this.width, this.position.y + offsetY);
            }

            offsetY += 10;
        }
        ctx.stroke();

        // left wall
        offsetY = 10;
        ctx.fillStyle = this.color;
        ctx.rect(this.position.x, this.position.y + 10, 20, 70);
        ctx.fillRect(this.position.x, this.position.y + 10, 20, 70);
        while(offsetY < 80){

            let brickSize = 20;
            let offsetX = offsetY % 20 == 0 ? brickSize : brickSize / 2;
            while(offsetX <= 20){
                ctx.moveTo(this.position.x + offsetX, this.position.y + offsetY - 10);
                ctx.lineTo(this.position.x + offsetX, this.position.y + offsetY);
                offsetX += 20;
            }

            if (offsetY > 0){
                ctx.moveTo(this.position.x, this.position.y + offsetY);
                ctx.lineTo(this.position.x + 20, this.position.y + offsetY);
            }

            offsetY += 10;
        }
        ctx.stroke();

        // right wall
        offsetY = 20;
        let startOffsetX = this.width - 20;
        ctx.fillStyle = this.color;
        ctx.rect(this.position.x + startOffsetX, this.position.y + offsetY, 20, 60);
        ctx.fillRect(this.position.x + startOffsetX, this.position.y + offsetY, 20, 60);
        while(offsetY < 80){

            let brickSize = 20;
            let offsetX = offsetY % 20 == 0 ? this.width - brickSize : this.width - brickSize / 2;
            while(offsetX <= this.width){
                ctx.moveTo(this.position.x + offsetX, this.position.y + offsetY);
                ctx.lineTo(this.position.x + offsetX, this.position.y + offsetY + 10);
                offsetX += 20;
            }

            if (offsetY > 0){
                ctx.moveTo(this.position.x + startOffsetX, this.position.y + offsetY);
                ctx.lineTo(this.position.x + startOffsetX + 20, this.position.y + offsetY);
            }

            offsetY += 10;
        }
        ctx.stroke();


        // bottom wall
        ctx.fillStyle = this.color;
        ctx.rect(this.position.x, this.position.y + 80, this.width, 20);
        ctx.fillRect(this.position.x, this.position.y + 80, this.width, 20);
        offsetY = 90;
        while(offsetY < this.height + 10){

            let brickSize = 20;
            let offsetX = offsetY % 20 == 0 ? brickSize : brickSize / 2;
            while(offsetX < this.width){
                ctx.moveTo(this.position.x + offsetX, this.position.y + offsetY - 10);
                ctx.lineTo(this.position.x + offsetX, this.position.y + offsetY);
                offsetX += 20;
            }

            if (offsetY > 0){
                ctx.moveTo(this.position.x, this.position.y + offsetY);
                ctx.lineTo(this.position.x + this.width, this.position.y + offsetY);
            }

            offsetY += 10;
        }
        ctx.stroke();

        ctx.stroke();
    }
}