/// @ts-check
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
var spelStatus = SPELEN;

var spelerX = 625; // x-positie van speler
var spelerY = 600; // y-positie van speler


var stopwatchSec= 0;
var stopwatchMin= 0;
var vijandX = 620;   // x-positie van vijand
var vijandY = 100;   // y-positie van vijand

var score = 0; // aantal behaalde punten
var img; // voor onze plaatjes
var img2; // plaatje voor vijanden
var backGroundImage;
var vijanden = [];
var aantalVijanden = 6;

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
 */



    


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
 };



var tekenSpeler = function(spelerX, spelerY) {
  image(img, spelerX, spelerY, 100, 100);
};


function tekenTimer(){
    var extraNul= ""
    if(stopwatchSec<10){
        extraNul= "0"
    }
    fill("white");
   text(stopwatchMin + ":" + extraNul + stopwatchSec, 50,50,200,200);
}
/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
class Enemy{
    constructor(x, y,  snelheid){
       this.x = x;
        this.y = y;
        this.snelheid = snelheid;
    }

    drawAndMove = function(){
        image(img2, this.x, this.y ,180,100);
       this.y += this.snelheid;
    }
    
    
     isBuitenCanvas = function(){
        if(this.y > 720){
            return true;
        } else{
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


/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {
    
  return false;
};


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
    
  return false;
};

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
    case SPELEN:

  
     
    
    
     
    // Kleur de achtergrond blauw, zodat je het kunt zien
     background(backGroundImage);
     //beweegKogel();
     beweegSpeler();
      
      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
      }

      
      tekenVeld();
      //tekenKogel(kogelX, kogelY);
      tekenSpeler(spelerX, spelerY);
      tekenTimer();
    aantalVijanden ++;
     for(var i = 0; i < vijanden.length; i++){
            vijanden[i].drawAndMove();
             if(vijanden[i].isBuitenCanvas()){
               vijanden[i] = new Enemy (random(20, 1100), random(20, 150), random(2, 7));
             }
            }      
                      
    if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
  }
}
