/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";

// Settings variables should contain all of the "fixed" parts of your programs
const size = 50;
const row = ['KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM'];
const column = ['KeyV', 'KeyF','KeyR','Digit4'];
// Define the maze layout (1 represents walls, 0 represents paths)
const mazeLayout = [
  
];

// State variables are the parts of your program that change over time.
let x = 0.5 - size/window.innerWidth;
let y = 1 - size/window.innerHeight;
let previousKeyRow = null;
let currentKeyRow = null;
let previousKeyColumn = null;
let currentKeyColumn = null;

// Code that runs over and over again
function loop() {
  Util.setSize(size);
  Util.setPosition(x, y);
  window.requestAnimationFrame(loop);
}
function createMaze(){
} 

//recognize whether the swipe is to the left or right
function swipeRightLeft(event){
  if (row.entries(event.code)){
    previousKeyRow = currentKeyRow;
    currentKeyRow = event.code;
    let previousIndexRow = row.indexOf(previousKeyRow);
    let currentIndexRow = row.indexOf(currentKeyRow);
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
    x = x * 1.1;
  }
}
//moving to the left when you hold space
function moveLeft(event){
  if (event.code === 'Space'){
    x = x * 0.9;
  }
}

function swipeUp(event){
  if (column.entries(event.code)){
    previousKeyColumn = currentKeyColumn;
    currentKeyColumn = event.code;
    let previousIndexColumn = column.indexOf(previousKeyColumn);
    let currentIndexColumn = column.indexOf(currentKeyColumn);
    if (currentIndexColumn > previousIndexColumn){
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
    y = y * 0.9;
  }
}


// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  createMaze();
  // Put your event listener code here
  window.addEventListener('keydown', swipeRightLeft)
  window.addEventListener('keydown', swipeUp);
  window.requestAnimationFrame(loop);
} 

setup(); // Always remember to call setup()!
