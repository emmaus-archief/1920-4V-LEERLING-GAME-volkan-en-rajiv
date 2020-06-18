// @ts-nocheck

/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = UITLEG;

var spelerX = 625; 
var spelerY = 600; 


var stopwatchSec= 0;
var stopwatchMin= 0;
var vijandX = 620;  
var vijandY = 100;   
var speelKnopX= 50;
var speelKnopY= 50;
var spaceShip;
var Alien; 
var gameOverScherm;
var backGroundImage;
var startScherm;
var levensPlaatje;
var vijanden = [];
var aantalVijanden = 6;
var spelerR = 50;
var spelerH = 50;
var spelerHP = 3;

 
 

 
var tekenVeld = function () {
  rect(backGroundImage,20, 20, width - 2 * 20, height - 2 * 20);
};

  
  
function preload(){  
 spaceShip = loadImage('plaatjes/spaceship2.PNG');
 Alien = loadImage('plaatjes/alien.PNG');
 backGroundImage= loadImage('plaatjes/backgroundimage.png');
 startScherm = loadImage('plaatjes/startscherm 2.png');
 levensPlaatje = loadImage('plaatjes/health.PNG');
 gameOverScherm = loadImage('plaatjes/Game over scherm .png');
 
 };



var tekenSpeler = function(spelerX, spelerY, spelerR) {
  image(spaceShip, spelerX, spelerY, spelerR*2, spelerH*2);
};


function tekenTimer(){
    var extraNul= ""
    if(stopwatchSec<10){
        extraNul= "0"
 }
    if(spelStatus === SPELEN){
    fill("white");
    text(stopwatchMin + ":" + extraNul + stopwatchSec, 50,50,100,100); 
}
   if(spelStatus === GAMEOVER){
       fill("white");
       text(stopwatchMin + ":" + extraNul + stopwatchSec, 690,380,100,100);
   }
}

function tekenHP(){
    fill("red"); 
    textSize(50);
    text(spelerHP.toString(), 1200, 700);
    image(levensPlaatje,1150,650,60,60);
}

 
class Enemy{
    constructor(x, y,  snelheid){
       this.x = x;
       this.r= 100;
        this.y = y;
        this.snelheid = snelheid;
    }

    drawAndMove = function(){
        image(Alien, this.x, this.y ,this.r+80 ,this.r);
       this.y += this.snelheid;
    }
    
    
     isBuitenCanvas = function(){
        if(this.y > 720){
            return true;
        } else{
            return false;
        }
    }

raaktSpeler = function(){
         if(this.x  >= spelerX - this.r && this.x <= spelerX + spelerH && this.y >= spelerY && this.y <= spelerH + spelerY ){
            return true;
         }else{
            return false;
        }
    }
}

function genereerVijanden(){
    for(var i = 0; i < aantalVijanden; i++){
       vijanden[i] = new Enemy (random(20, 1100), random(20, 150), random(2, 7));
    }
    
        
}

  function reSpawnVijand(){
     for(var i = 0; i < vijanden.length; i++){
            vijanden[i].drawAndMove();
             if(vijanden[i].isBuitenCanvas()){
               vijanden[i] = new Enemy (random(20, 1100), random(20, 150), random(2, 7));
             }
             if(vijanden[i].raaktSpeler()){
                 spelerHP--;
                 vijanden[i] = new Enemy (random(20, 1100), random(20, 150), random(2, 7));
             }
        } 
 }

 function beweegSpeler(){
    if (keyCode === LEFT_ARROW ){
        if(spelerX>24){
        spelerX= spelerX - 7;
        }
    }
        else if (keyCode === RIGHT_ARROW ) {        
            if( spelerX<1156){
         spelerX= spelerX + 7;
            }
    }
} 
    
  
 function checkGameOver(){
    if(spelerHP <= 0){
        return true;
    }else{
        return false;
    }
 
    }
      
 
  
function updateTimer(){
    stopwatchSec++
    if (stopwatchSec == 60){
        stopwatchMin++;
        stopwatchSec = 0;
    }
}
  
    


function setup() {
createCanvas(1280, 720);
setInterval(updateTimer, 1000); 
genereerVijanden();

}



function draw() {
  switch (spelStatus) {
    case UITLEG:
    background(startScherm);
  

    if(mouseIsPressed){
        spelStatus = SPELEN;
    }
    break;
    case SPELEN:

background(backGroundImage);
beweegSpeler();
reSpawnVijand();    
tekenVeld();
tekenSpeler(spelerX, spelerY, spelerR);
tekenTimer();  
tekenHP();
checkGameOver();       

case GAMEOVER:
 if( checkGameOver()){
     spelStatus = GAMEOVER;
     background(gameOverScherm);
     tekenTimer();
     clearTimout(); 
    }
 }
  }


