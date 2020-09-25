'use strict';

import Particle from './covidparticle.js';
import House from './house.js';

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAMEWIDTH = 1000;
const GAMEHEIGHT = 600;
const numParticles = 50;

let particles = [];

for (let n = 0; n < numParticles; n++){

    const x = Math.floor(Math.random() * GAMEWIDTH);
    const y = Math.floor(Math.random() * GAMEHEIGHT);

    let particle = new Particle(x, y);
    particles.push(particle);
    particle.draw(ctx);
}

let house = new House();

let lastTime = 0;

function gameLoop(timestamp){

    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAMEWIDTH, GAMEHEIGHT);

    house.draw(ctx);

    for (let particle of particles){
        particle.update(deltaTime);
        particle.draw(ctx);
    }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);