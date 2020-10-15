export default class Star{
    constructor(x, y, radius){
        this.position = {
            x: x,
            y: y
        }
        this.radius = radius;
        this.scaleRatio = 0.15;
        this.timer = 0;
        this.markedForDeletion = false;
    }

    removeFromGame(){
        this.markedForDeletion = true;
    }

    update(deltaTime){
        this.timer += deltaTime * 0.005;
        this.radius += Math.sin(this.timer) * this.scaleRatio;
    }

    draw(ctx){
        // https://stackoverflow.com/a/45140101/13476675
        function drawStar(x, y, r, n, inset) {
            ctx.save();
            ctx.scale(1, -1);
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.translate(x, -y);
            ctx.moveTo(0,0-r);
            for (var i = 0; i < n; i++) {
                ctx.rotate(Math.PI / n);
                ctx.lineTo(0, 0 - (r*inset));
                ctx.rotate(Math.PI / n);
                ctx.lineTo(0, 0 - r);
            }
            ctx.closePath();
            ctx.stroke();
            ctx.fillStyle = "yellow";
            ctx.fill();
            ctx.restore();
        }

        drawStar(this.position.x, this.position.y, this.radius, 5, 2);

    }
}