'use strict';

import Game from './game.js';

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAMEWIDTH = 1000;
const GAMEHEIGHT = 600;
const NUM_PARTICLES = 50;

let game = new Game(GAMEWIDTH, GAMEHEIGHT, NUM_PARTICLES);

let lastTime = 0;

function gameLoop(timestamp){

    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAMEWIDTH, GAMEHEIGHT);

    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);