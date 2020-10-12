export default class InputHandler{
    constructor(game){
        document.addEventListener('keydown', (event) => {
            switch(event.key){
                case "ArrowLeft":
                    game.player.moveLeft();
                    break;
                case "ArrowRight":
                    game.player.moveRight();
                    break;
                case "ArrowUp":
                    game.player.moveUp();
                    break;
                case "ArrowDown":
                    game.player.moveDown();
                    break;
                case "Escape":
                    game.togglePause();
                    break;
                case " ":
                    game.start();
            }
        });

        document.addEventListener('keyup', (event) => {
            switch(event.key){
                case "ArrowLeft":
                    game.player.stopLeft();
                    break;
                case "ArrowRight":
                    game.player.stopRight();
                    break;
                case "ArrowUp":
                    game.player.stopUp();
                    break;
                case "ArrowDown":
                    game.player.stopDown();
                    break;
            }
        });
    }
}