/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";

// Settings variables should contain all of the "fixed" parts of your programs

const size = 50;
const row = ['KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM']; //keys for moving right and left
const column = ['Digit4', 'KeyR', 'KeyF', 'KeyV']; //keys for moving up

//outside walls
const wall1 = document.getElementById('thing1');
const wall2 = document.getElementById('thing2');
const wall3 = document.getElementById('thing3');
const wall4 = document.getElementById('thing4');

//inside walls
const wall5 = document.getElementById('thing5'); 
const wall6 = document.getElementById('thing6'); 
const wall7 = document.getElementById('thing7'); 
const wall8 = document.getElementById('thing8'); 
const wall9 = document.getElementById('thing9'); 

//array of all the walls
const maze = [wall1, wall2, wall3, wall4, wall5, wall6, wall7, wall8, wall9];

// State variables are the parts of your program that change over time.
let x = 1075;
let y = 665;
let startX = 1075;
let startY = 665;
let previousKeyRow = null;
let currentKeyRow = null;
let previousKeyColumn = null;
let currentKeyColumn = null;

// the X position for each wall
let wallX = [
  450,
  1150,
  450,
  450,
  625,
  800,
  800,
  800,
  625
];

// the Y positionn for each wall
let wallY = [
  50,
  50,
  50,
  750,
  50,
  225,
  225,
  400,
  575
];


//recognize whether the swipe is to the left or right
function swipeRightLeft(event){
  if (row.includes(event.code)){
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
    document.removeEventListener('keydown', moveRight);
    document.removeEventListener('keydown', moveLeft);
  }
}

//moving to the right when you hold space
function moveRight(event){
  if (event.code === 'Space'){
    x = x * 1.15;
  }
}

//moving to the left when you hold space
function moveLeft(event){
  if (event.code === 'Space'){
    x = x * 0.85;
  }
}

function swipeUp(event){
  if (column.includes(event.code)){
    previousKeyColumn = currentKeyColumn;
    currentKeyColumn = event.code;
    let previousIndexColumn = column.indexOf(previousKeyColumn);
    let currentIndexColumn = column.indexOf(currentKeyColumn);
    console.log(`${previousIndexColumn} -> ${currentIndexColumn}`);
    if (currentIndexColumn < previousIndexColumn){
      document.addEventListener('keydown', moveUp);
      document.removeEventListener('keydown', moveRight);
      document.removeEventListener('keydown', moveLeft);
    } 
  } else {
    document.removeEventListener('keydown', moveUp);
  }
}

function moveUp(event){
  if (event.code === 'Space'){
    y = y * 0.85;
  }
}

function checkCollision(x, y) {
  const between = (x, min, max) => {
    if (x > min && x < max){
      return true;
    }
  }
  if(
    x < 490 ||
    x > 1060 ||
    y < 90||
    between(x, 750, 1060) && between(y, 175, 265) ||
    between(x, 750, 840) && between(y, 175, 440) ||
    between(x, 800, 1015) && between(y, 350, 440) ||
    between(x, 575, 665) && between(y, 90, 440) ||
    between(x, 575, 1060) && between(y, 525, 615)
  ){ 
    return true;
  }
  else {
    return false;
  }
}


function loop() {
  Util.setSize(size);
  Util.setPositionPixels(x, y);
  for (let i = 0; i < maze.length; i++){
    Util.setPositionPixels(wallX[i], wallY[i], maze[i]);
  }
  if (checkCollision(x,y)){
    //in case of collision send object to the start position
    Util.setPositionPixels(startX, startY)
  }
  window.requestAnimationFrame(loop);
}
// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  // Put your event listener code here
  window.addEventListener('keydown', swipeRightLeft)
  window.addEventListener('keydown', swipeUp);
  window.requestAnimationFrame(loop);
} 

setup(); // Always remember to call setup()!
