import Particle from './covidparticle.js';
import House from './house.js';
import InputHandler from './input.js';
import Player from './player.js';

export default class Game{
    constructor(gameWidth, gameHeight, numParticles){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.particles = this.createRandomParticles(numParticles);
        this.house = new House();
        this.player = new Player(this, 487, 285);
        new InputHandler(this.player);
    }

    createRandomParticles(numParticles){
        let particles = [];

        for (let n = 0; n < numParticles; n++){

            const x = Math.floor(Math.random() * this.gameWidth);
            const y = Math.floor(Math.random() * this.gameHeight);

            let particle = new Particle(this, x, y);
            particles.push(particle);
        }
        return particles;
    }

    update(deltaTime){
        for (let particle of this.particles){
            particle.update(deltaTime);
        }
        this.player.update(deltaTime);
    }

    draw(ctx){
        for (let particle of this.particles){
            particle.draw(ctx);
        }
        this.house.draw(ctx);
        this.player.draw(ctx);
    }

}