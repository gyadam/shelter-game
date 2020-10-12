'use strict';

const SPEED = 0.5;
const GAMEWIDTH = 1000;
const GAMEHEIGHT = 600;

export default class Particle {
    constructor(game, x, y, color = "#FF0000"){
        this.game = game;
        this.position = {
            x: x,
            y: y
        }
        this.speed = {
            x: Math.random() * SPEED * (Math.random() < 0.5 ? 1 : -1),
            y: Math.random() * SPEED * (Math.random() < 0.5 ? 1 : -1)
        }
        this.color  = color;
        this.size = 1;
        this.numSpikes = 9;
        this.radius = 10 * this.size;
        this.spikeInnerSize = this.radius / 5;
        this.spikeOuterSize = this.radius / 3;
        this.bump = this.radius / 5;
        this.numDots = 5;
        this.markedForDeletion = false;
    }

    draw(ctx){

        ctx.beginPath();
        ctx.strokeStyle = this.color;

        for (let i = 0; i < this.numSpikes; i++){
            const startingAngle = i * Math.PI * 2 / this.numSpikes;
            const endingAngle = (i + 1) * Math.PI * 2 / this.numSpikes;
            ctx.arc(this.position.x, this.position.y, this.radius, startingAngle, endingAngle);
            ctx.moveTo(this.position.x + Math.cos(endingAngle)*(this.radius - this.spikeInnerSize), this.position.y + Math.sin(endingAngle)*(this.radius - this.spikeInnerSize)); // 68, 75
            ctx.lineTo(this.position.x + Math.cos(endingAngle)*(this.radius + this.spikeOuterSize), this.position.y + Math.sin(endingAngle)*(this.radius + this.spikeOuterSize)); // 60, 75
            ctx.lineTo(this.position.x + Math.cos(endingAngle)*(this.radius + this.spikeOuterSize) - Math.sin(endingAngle)*this.bump, this.position.y + Math.sin(endingAngle)*(this.radius + this.spikeOuterSize) + Math.cos(endingAngle)*this.bump);
            ctx.lineTo(this.position.x + Math.cos(endingAngle)*(this.radius + this.spikeOuterSize) + Math.sin(endingAngle)*this.bump, this.position.y + Math.sin(endingAngle)*(this.radius + this.spikeOuterSize) - Math.cos(endingAngle)*this.bump);
            ctx.moveTo(this.position.x + Math.cos(endingAngle)*(this.radius + this.spikeOuterSize), this.position.y + Math.sin(endingAngle)*(this.radius + this.spikeOuterSize)); // go back
        }

        ctx.stroke();

        ctx.fillStyle = this.color;

        for (let i = 0; i < this.numDots; i++){
            const startingAngle = i * Math.PI * 2 / this.numDots;
            const endingAngle = (i + 1) * Math.PI * 2 / this.numDots;
            ctx.arc(this.position.x, this.position.y, this.radius, startingAngle, endingAngle);
            const dotX = this.position.x + Math.cos(endingAngle)*(this.radius - 5);
            const dotY = this.position.y + Math.sin(endingAngle)*(this.radius - 5)
            ctx.fillRect(dotX,dotY,2,2);
        }
    }

    update(deltaTime){

        const dx = this.speed.x * deltaTime;
        const dy = this.speed.y * deltaTime;

        let topOfHouse = this.game.house.position.y;
        let bottomOfHouse = this.game.house.position.y + this.game.house.height;
        let leftSideOfHouse = this.game.house.position.x;
        let rightSideOfHouse = this.game.house.position.x + this.game.house.width;
        
        let topOfPlayer = this.game.player.position.y;
        let bottomOfPlayer = this.game.player.position.y + this.game.player.height;
        let leftSideOfPlayer = this.game.player.position.x;
        let rightSideOfPlayer = this.game.player.position.x + this.game.player.width;

        let topOfParticle = this.position.y - this.radius - this.spikeOuterSize;
        let bottomOfParticle = this.position.y + this.radius + this.spikeOuterSize;
        let leftSideOfParticle = this.position.x - this.radius - this.spikeOuterSize;
        let rightSideParticle = this.position.x + this.radius + this.spikeOuterSize;

        // collision w top of house
        if (bottomOfParticle < topOfHouse && bottomOfParticle + dy > topOfHouse && rightSideParticle + dx >= leftSideOfHouse && leftSideOfParticle + dx <= rightSideOfHouse){
            this.speed.y = - this.speed.y;
        }

        // collision w bottom of house
        if (topOfParticle > bottomOfHouse && topOfParticle + dy < bottomOfHouse && rightSideParticle + dx >= leftSideOfHouse && leftSideOfParticle + dx <= rightSideOfHouse){
            this.speed.y = - this.speed.y;
        }

        // collision w left side of house
        if (rightSideParticle < leftSideOfHouse && rightSideParticle + dx > leftSideOfHouse && bottomOfParticle + dy >= topOfHouse && topOfParticle + dy <= bottomOfHouse){
            this.speed.x = - this.speed.x;
        }

        // collision w right side of house
        if (leftSideOfParticle > rightSideOfHouse && leftSideOfParticle + dx < rightSideOfHouse && bottomOfParticle + dy >= topOfHouse && topOfParticle + dy <= bottomOfHouse){
            this.speed.x = - this.speed.x;
        }

        // don't handle collisions on game over. to refactor! (remove player altogether)
        if (this.game.player.health > 0){

            // collision w top of player
            if (bottomOfParticle < topOfPlayer && bottomOfParticle + dy > topOfPlayer + this.game.player.speed.y * deltaTime && rightSideParticle + dx >= leftSideOfPlayer && leftSideOfParticle + dx <= rightSideOfPlayer){
                this.markedForDeletion = true;
                this.game.player.health = this.game.player.health - 5 <= 0 ? 0 : this.game.player.health - 5;
                this.game.player.hit();

            }
    
            // collision w bottom of player
            if (topOfParticle > bottomOfPlayer && topOfParticle + dy < bottomOfPlayer + this.game.player.speed.y * deltaTime && rightSideParticle + dx >= leftSideOfPlayer && leftSideOfParticle + dx <= rightSideOfPlayer){
                this.markedForDeletion = true;
                this.game.player.health = this.game.player.health - 5 <= 0 ? 0 : this.game.player.health - 5;
                this.game.player.hit();
            }
    
            // collision w left side of player
            if (rightSideParticle < leftSideOfPlayer && rightSideParticle + dx > leftSideOfPlayer + this.game.player.speed.x * deltaTime && bottomOfParticle + dy >= topOfPlayer && topOfParticle + dy <= bottomOfPlayer){
                this.markedForDeletion = true;
                this.game.player.health = this.game.player.health - 5 <= 0 ? 0 : this.game.player.health - 5;
                this.game.player.hit();
            }
    
            // collision w right side of player
            if (leftSideOfParticle > rightSideOfPlayer && leftSideOfParticle + dx < rightSideOfPlayer + this.game.player.speed.x * deltaTime && bottomOfParticle + dy >= topOfPlayer && topOfParticle + dy <= bottomOfPlayer){
                this.markedForDeletion = true;
                this.game.player.health = this.game.player.health - 5 <= 0 ? 0 : this.game.player.health - 5;
                this.game.player.hit();
            }
        }

        this.position.x += dx;
        this.position.y += dy;

        if (this.position.x > GAMEWIDTH + this.radius){
            this.position.x = 0 - this.radius;
        } else if (this.position.x < 0 - this.radius) {
            this.position.x = GAMEWIDTH + this.radius;
        }

        if (this.position.y > GAMEHEIGHT + this.radius){
            this.position.y = 0 - this.radius;
        } else if (this.position.y < 0 - this.radius) {
            this.position.y = GAMEHEIGHT + this.radius;
        }
    }
}