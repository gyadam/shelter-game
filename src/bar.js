export default class Bar{
    constructor(x, y, width = 150, height = 20, title, value){
        this.position = {
            x: x,
            y: y
        }
        this.width = width;
        this.height = height;
        this.title = title;
        this.value = value;
    }

    update(value){
        this.value = value;
    }

    draw(ctx){

        ctx.fillStyle = "black";
        ctx.lineWidth= "2";
        ctx.rect(this.position.x, this.position.y, this.width, this.height);
        ctx.stroke();

        ctx.fillStyle = "white";
        ctx.fillRect(this.position.x + 1, this.position.y + 1, this.width - 2, this.height - 2);

        if (this.value > 75){
            ctx.fillStyle = "green";
        } else if (this.value > 50){
            ctx.fillStyle = "yellow";
        } else if (this.value > 25){
            ctx.fillStyle = "orange";
        } else{
            ctx.fillStyle = "red";
        }

        let fillWidth = this.value ? this.value * 1.5 - 2 : 0;
        ctx.fillRect(this.position.x + 1, this.position.y + 1, fillWidth, this.height - 2);

        ctx.font = "bold 16px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(this.value, this.position.x + 1 + 79, this.position.y + 1 + 14);

        ctx.font = "bold 12px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText(this.title, this.position.x, this.position.y - 4);
    }
}