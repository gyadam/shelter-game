import Particle from './covidparticle.js';
import House from './house.js';
import InputHandler from './input.js';
import Player from './player.js';
import Bar from './bar.js';
import ScoreCounter from './scorecounter.js';
import Star from './star.js';

const GAMESTATE = {
    MENU: 0,
    PAUSED: 1,
    RUNNING: 2,
    GAMEOVER: 3,
}

export default class Game{
    constructor(gameWidth, gameHeight, numParticles){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gameState = GAMESTATE.MENU;
        this.numParticles = 0;
        this.house = new House();
        this.particles = this.createRandomParticles();
        this.player = new Player(this, 487, 285);
        new InputHandler(this);
        this.frameCounter = 0;
        this.healthBar = new Bar(0.05 * this.gameWidth, 0.05 * this.gameHeight, 150, 20, "HEALTH", 100);
        this.sanityBar = new Bar(0.05 * this.gameWidth + 200, 0.05 * this.gameHeight, 150, 20, "SANITY", 100);
        this.score = 0;
        this.scoreCounter = new ScoreCounter(0.85 * this.gameWidth, 0.075 * this.gameHeight, 150, 20, "SCORE:", 0);
        this.numStars = 3;
        this.stars = this.createStars();
    }

    start(){
        if (this.gameState === GAMESTATE.MENU){
            // this.stars = this.createStars();
            this.gameState = GAMESTATE.RUNNING;
        } else if(GAMESTATE.GAMEOVER){
            this.numParticles = 0;
            this.particles = this.createRandomParticles();
            this.player = new Player(this, 487, 285);
            this.frameCounter = 0;
            this.score = 0;
            this.stars = this.createStars();
            this.gameState = GAMESTATE.RUNNING;
        }
    }

    getRandomPositionOutside(){
        const pointInHouse = (x,y) => {
            if (x > this.house.position.x - 20
                && x < this.house.position.x + this.house.width + 20
                && y > this.house.position.y - 20
                && y < this.house.position.y + this.house.height + 20){
                    return true;
                }
            return false;
        }

        let x = Math.floor(Math.random() * this.gameWidth);
        let y = Math.floor(Math.random() * this.gameHeight);
    
        while(pointInHouse(x,y)){
            console.log("generate new particle")
            x = Math.floor(Math.random() * this.gameWidth);
            y = Math.floor(Math.random() * this.gameHeight);
        }

        return {x, y};

    }

    createRandomParticles(){
        let particles = [];
        
        for (let n = 0; n < this.numParticles; n++){
            const {x, y} = this.getRandomPositionOutside();
            let particle = new Particle(this, x, y);
            particles.push(particle);
        }

        return particles;
    }

    createStars(){
        let stars = [];

        for (let n = 0; n < this.numStars; n++){
            const {x, y} = this.getRandomPositionOutside();
            let star = new Star(x, y, 10);
            stars.push(star);
        }

        return stars;
    }

    togglePause(){
        if (this.gameState == GAMESTATE.RUNNING){
            this.gameState = GAMESTATE.PAUSED;
        } else if (this.gameState == GAMESTATE.PAUSED){
            this.gameState = GAMESTATE.RUNNING;
        }
    }

    update(deltaTime){

        this.frameCounter++;

        // destroy particles on collision
        this.particles = this.particles.filter(particle => !particle.markedForDeletion);
        this.stars = this.stars.filter(star => !star.markedForDeletion);

        // add new particles in place of destroyed ones
        let numParticlesToAdd = this.numParticles - this.particles.length;
        for (let i = 0; i < numParticlesToAdd; i++){
            const {x, y} = this.getRandomPositionOutside();
            let particle = new Particle(this, x, y);
            this.particles.push(particle);
        }

        // add new stars in place of collected ones
        let numStarsToAdd = this.numStars - this.stars.length;
        for (let i = 0; i < numStarsToAdd; i++){
            const {x, y} = this.getRandomPositionOutside();
            let star = new Star(x, y, 10);
            this.stars.push(star);
        }

        if (this.gameState != GAMESTATE.PAUSED){
            for (let particle of this.particles){
                particle.update(deltaTime);
            }
            for (let star of this.stars){
                star.update(deltaTime);
            }
        }
        if (this.gameState == GAMESTATE.RUNNING){
            this.player.update(deltaTime);
        }

        if (this.player.health <= 0 || this.player.sanity <= 0){
            this.gameState = GAMESTATE.GAMEOVER;
        }

        if (this.player.position.x > this.house.position.x
            && this.player.position.x + this.player.width < this.house.position.x + this.house.width
            && this.player.position.y > this.house.position.y
            && this.player.position.y + this.player.height < this.house.position.y + this.house.height
            && this.gameState === GAMESTATE.RUNNING
            ){
                if (this.frameCounter % 10 == 0){
                    this.player.health = this.player.health >= 100 ? 100 : this.player.health + 1;
                    this.player.sanity = this.player.sanity - 10 <= 0 ? 0 : this.player.sanity - 10;
                }
        } else if (this.frameCounter % 10 == 0 && this.gameState === GAMESTATE.RUNNING) {
            this.player.sanity = this.player.sanity >= 100 ? 100 : this.player.sanity + 1;
        }

        this.healthBar.update(this.player.health);
        this.sanityBar.update(this.player.sanity);
        this.scoreCounter.update(this.score);

        this.numParticles = 5 + Math.floor(this.score * 45 / 1000);

    }

    draw(ctx){

        if(this.gameState == GAMESTATE.MENU){
            this.house.draw(ctx);
            this.player.draw(ctx);
            for (let particle of this.particles){
                particle.draw(ctx);
            }
            ctx.font = "80px MachineGunk";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText("SHELTER", this.gameWidth / 2, 0.25 * this.gameHeight);
            ctx.font = "20px MachineGunk";
            
            ctx.fillText("A JavaScript game", this.gameWidth / 2, 0.3 * this.gameHeight);

            ctx.font = "20px MachineGunk";
            ctx.fillText("[ARROW KEYS] to move",this.gameWidth / 2, 0.8 * this.gameHeight);
            ctx.fillText("[ESC] to pause",this.gameWidth / 2, 0.85 * this.gameHeight);
            ctx.fillText("[SPACE] to start game",this.gameWidth / 2, 0.9 * this.gameHeight);
        } else {
            for (let particle of this.particles){
                particle.draw(ctx);
            }
    
            for (let star of this.stars){
                star.draw(ctx);
            }
    
            this.house.draw(ctx);
            if (this.gameState != GAMESTATE.GAMEOVER){
                this.player.draw(ctx);
            }
            
            if (this.gameState == GAMESTATE.PAUSED){
                ctx.fillStyle = 'rgba(0,0,0,0.4)';
                ctx.fillRect(0,0,this.gameWidth, this.gameHeight);
                ctx.font = "60px MachineGunk";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 3);
            }
    
            if (this.gameState == GAMESTATE.GAMEOVER){
                ctx.fillStyle = 'rgba(0,0,0,0.4)';
                ctx.fillRect(0,0,this.gameWidth, this.gameHeight);
                ctx.font = "60px MachineGunk";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.fillText("GAME OVER!", this.gameWidth / 2, this.gameHeight / 3);
                ctx.fillText(`FINAL SCORE: ${this.score}`, this.gameWidth / 2, 2 * this.gameHeight / 3);
                ctx.font = "30px MachineGunk";
                ctx.fillText("[SPACE] to restart",this.gameWidth / 2, 0.9 * this.gameHeight);
            }
    
            this.healthBar.draw(ctx);
            this.sanityBar.draw(ctx);
            this.scoreCounter.draw(ctx);
        }

    }

}