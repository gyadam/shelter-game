'use strict';

export default class House{
    constructor(center={x:500, y:300}, width=150, height=100){
        this.color = '#000';
        this.width = width;
        this.height = height;
        this.position = {
            x: center.x - width / 2,
            y: center.y - height / 2
        };
    }

    draw(ctx){
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.rect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
        ctx.stroke();
    }
}