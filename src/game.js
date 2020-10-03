import Particle from './covidparticle.js';
import House from './house.js';
import InputHandler from './input.js';
import Player from './player.js';

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
}

export default class Game{
    constructor(gameWidth, gameHeight, numParticles){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gameState = GAMESTATE.RUNNING;
        this.numParticles = numParticles;
        this.particles = this.createRandomParticles();
        this.house = new House();
        this.player = new Player(this, 487, 285);
        new InputHandler(this);
    }

    createRandomParticles(){
        let particles = [];

        for (let n = 0; n < this.numParticles; n++){

            const x = Math.floor(Math.random() * this.gameWidth);
            const y = Math.floor(Math.random() * this.gameHeight);

            let particle = new Particle(this, x, y);
            particles.push(particle);
        }
        return particles;
    }

    togglePause(){
        if (this.gameState == GAMESTATE.RUNNING){
            this.gameState = GAMESTATE.PAUSED;
        } else{
            this.gameState = GAMESTATE.RUNNING;
        }
    }

    update(deltaTime){

        // destroy particles on collision
        this.particles = this.particles.filter(particle => !particle.markedForDeletion);

        // add new particles in place of destroyed ones
        let numParticlesToAdd = this.numParticles - this.particles.length;
        for (let i = 0; i < numParticlesToAdd; i++){
            const x = Math.floor(Math.random() * this.gameWidth);
            const y = Math.floor(Math.random() * this.gameHeight);

            let particle = new Particle(this, x, y);
            this.particles.push(particle);
        }

        if (this.gameState == GAMESTATE.RUNNING){
            for (let particle of this.particles){
                particle.update(deltaTime);
            }
            this.player.update(deltaTime);
        }
    }

    draw(ctx){
        for (let particle of this.particles){
            particle.draw(ctx);
        }
        this.house.draw(ctx);
        this.player.draw(ctx);
        
        if (this.gameState == GAMESTATE.PAUSED){
            ctx.fillStyle = 'rgba(0,0,0,0.4)';
            ctx.fillRect(0,0,this.gameWidth, this.gameHeight);
            ctx.font = "bold 40px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 3);
        }
    }

}