# shelter-game
**[Shelter](https://shelter-game.netlify.app/)** is a browser game where the goal is to collect points while avoiding getting killed by COVID or going crazy at home.

## Tech
Shelter was written in JavaScript with ES6 classes, using HTML5 canvas to draw objects and some minimal CSS for styling.

The game is deployed as a static site on Netlify, which automatically triggers a new deploy when a commit is pushed to the 'deploy' branch of this repo.

## Play
Shelter is live at **https://shelter-game.netlify.app/**

## Features
* Viruses drawn using trigonometric functions with HTML5 canvas and JavaScript
* Increasing difficulty (number of viruses goes up with score)
* Health decreases when hit by a virus, recovers while staying at home
* Sanity decreases while staying at home, recovers when going outside

## To be added
* Sound effects
* More objects to collect
