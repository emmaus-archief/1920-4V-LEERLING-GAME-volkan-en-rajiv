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

var spelerX = 625; // x-positie van speler
var spelerY = 600; // y-positie van speler


var stopwatchSec= 0;
var stopwatchMin= 0;
var vijandX = 620;   // x-positie van vijand
var vijandY = 100;   // y-positie van vijand
var speelKnopX= 50;
var speelKnopY= 50;
var score = 0; // aantal behaalde punten
var img; // voor onze plaatjes
var img2; // plaatje voor vijanden
var backGroundImage;
var startScherm;
var levensPlaatje;
var vijanden = [];
var aantalVijanden = 6;
var spelerR = 50;
var spelerH = 50;
var spelerHP = 3;

/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */


var tekenVeld = function () {
  rect(backGroundImage,20, 20, width - 2 * 20, height - 2 * 20);
};


/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
//var tekenKogel = function(x, y) {


//};


/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */

function preload(){  
 img = loadImage('plaatjes/spaceship2.PNG');
 img2 = loadImage('plaatjes/alien.PNG');
 backGroundImage= loadImage('plaatjes/backgroundimage.png');
 startScherm = loadImage('plaatjes/startschermspace.png');
 levensPlaatje = loadImage('plaatjes/health.PNG');
 };



var tekenSpeler = function(spelerX, spelerY, spelerR) {
  image(img, spelerX, spelerY, spelerR*2, spelerH*2);
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
       text(stopwatchMin + ":" + extraNul + stopwatchSec, 625,300,100,100);
   }
}
function tekenHP(){
    fill("red"); 
    textSize(50);
    text(spelerHP.toString(), 1200, 700);
    image(levensPlaatje,1150,650,60,60);
}
/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
class Enemy{
    constructor(x, y,  snelheid){
       this.x = x;
       this.r= 100;
        this.y = y;
        this.snelheid = snelheid;
    }

    drawAndMove = function(){
        image(img2, this.x, this.y ,this.r+80 ,this.r);
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

var genereerVijanden = function(){
    for(var i = 0; i < aantalVijanden; i++){
       vijanden[i] = new Enemy (random(20, 1100), random(20, 150), random(2, 7));
    }
}


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
//var beweegKogel = function() {

//};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler= function () {
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

/**n3 
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {

  return false;
};

//var checkSpelerGeraakt = function(){
   

 
var checkGameOver = function() {
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
  
    

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);
  setInterval(updateTimer, 1000); 
  genereerVijanden();

}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case UITLEG:
    background(startScherm);
  

    if(mouseIsPressed){
        spelStatus = SPELEN;
    }
    break;
    case SPELEN:

 
     
    // Kleur de achtergrond blauw, zodat je het kunt zien
   
     background(backGroundImage);
     //beweegKogel();
     beweegSpeler();
     
      
      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }
    
    // if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
     // }

      
      tekenVeld();
      //tekenKogel(kogelX, kogelY)
      tekenSpeler(spelerX, spelerY, spelerR);
      tekenTimer();  
      tekenHP();
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
     checkGameOver();             
   if( checkGameOver()){
     spelStatus = GAMEOVER;
     background(0,0,255);
     tekenTimer();
     clearTimout();
    
    }
    case GAMEOVER:
    
    break;
  }
 }


