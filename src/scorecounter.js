export default class ScoreCounter{
    constructor(x, y, width, height, title = "SCORE:", value = 0){
        this.position = {
            x: x,
            y: y
        }
        this.width = width;
        this.height = height;
        this.title = title;
        this.value = value;
    }

    draw(ctx){
        ctx.font = "30px AllTheWayToTheSun";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.value, this.position.x + 1 + 79, this.position.y - 4);

        ctx.font = "16px AllTheWayToTheSun";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText(this.title, this.position.x, this.position.y - 4);
    }
}