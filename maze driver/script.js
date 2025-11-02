/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";

// Settings variables should contain all of the "fixed" parts of your programs
const size = 50;
const row = ['KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM'];
const column = ['KeyV', 'KeyF','KeyR','Digit4'];
//outside borders
const wall1 = document.getElementById('thing1'); 
const wall2 = document.getElementById('thing2'); 
const wall3 = document.getElementById('thing3'); 
const wall4 = document.getElementById('thing4'); 
//inside borders
const wall5 = document.getElementById('thing5'); 
const wall6 = document.getElementById('thing6'); 
const wall7 = document.getElementById('thing7'); 
const wall8 = document.getElementById('thing8'); 
const wall9 = document.getElementById('thing9'); 

// State variables are the parts of your program that change over time.
// the X position for each wall
let wall1X = 450;
let wall2X = 1150;
let wall3X = 450;
let wall4X = 450;
let wall5X = 625;
let wall6X = 800;
let wall7X = 800;
let wall8X = 800;
let wall9X = 625;

// the Y positionn for each wall
let wall1Y = 50;
let wall2Y = 50;
let wall3Y = 50;
let wall4Y = 750;
let wall5Y = 50;
let wall6Y = 225;
let wall7Y = 225;
let wall8Y = 400;
let wall9Y = 575;

let x = 1075;
let y = 665;
let previousKey = null;
let currentKey = null;
//let previousKey = null;
//let currentKey = null;

// Code that runs over and over again
function loop() {
  Util.setSize(size);
  Util.setPositionPixels(x, y);
  Util.setPositionPixels(wall1X, wall1Y, wall1);
  Util.setPositionPixels(wall2X, wall2Y, wall2);
  Util.setPositionPixels(wall3X, wall3Y, wall3);
  Util.setPositionPixels(wall4X, wall4Y, wall4);
  Util.setPositionPixels(wall5X, wall5Y, wall5);
  Util.setPositionPixels(wall6X, wall6Y, wall6);
  Util.setPositionPixels(wall7X, wall7Y, wall7);
  Util.setPositionPixels(wall8X, wall8Y, wall8);
  Util.setPositionPixels(wall9X, wall9Y, wall9);
 
  window.requestAnimationFrame(loop);
}


//recognize whether the swipe is to the left or right
function swipeRightLeft(event){
  if (row.entries(event.code)){
    previousKey = currentKey;
    currentKey = event.code;
    let previousIndexRow = row.indexOf(previousKey);
    let currentIndexRow = row.indexOf(currentKey);
    console.log(`${previousIndexRow} -> ${currentIndexRow}`);
    if (currentIndexRow > previousIndexRow){
      row.push('Space'); //otherwise space has index of -1
      document.addEventListener('keydown', moveRight);
      document.removeEventListener('keydown', moveLeft);
      document.removeEventListener('keydown', moveUp);
    } else if (currentIndexRow < previousIndexRow){
      row.pop('Space');
      document.addEventListener('keydown', moveLeft);
      document.removeEventListener('keydown', moveRight);
      document.removeEventListener('keydown', moveUp);
    }
  } else {
    document.removeEventListener('keydown', moveUp);
    document.removeEventListener('keydown', moveRight);
    document.removeEventListener('keydown', moveLeft);
  }
}
//moving to the right when you hold space
function moveRight(event){
  if (event.code === 'Space'){
    x = x * 1.05;
  }
}
//moving to the left when you hold space
function moveLeft(event){
  if (event.code === 'Space'){
    x = x * 0.95;
  }
}

function swipeUp(event){
  if (column.entries(event.code)){
    previousKey = currentKey;
    currentKey = event.code;
    let previousIndex = column.indexOf(previousKey);
    let currentIndex = column.indexOf(currentKey);
    if (currentIndex > previousIndex){
      column.push('Space');
      document.addEventListener('keydown', moveUp);
      document.removeEventListener('keydown', moveRight);
      document.removeEventListener('keydown', moveLeft);
    } 
  } else {
    document.removeEventListener('keydown', moveUp);
    document.removeEventListener('keydown', moveRight);
    document.removeEventListener('keydown', moveLeft);
  }
}
function moveUp(event){
  if (event.code === 'Space'){
    y = y * 0.95;
  }
}


// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  // Put your event listener code here
  window.addEventListener('keydown', swipeRightLeft)
  //window.addEventListener('keydown', swipeUp);
  window.requestAnimationFrame(loop);
} 

setup(); // Always remember to call setup()!
