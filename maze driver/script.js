/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";

// Settings variables should contain all of the "fixed" parts of your programs

const size = 50;
const startX = 1050;
const startY = 625;
const row = ['Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0']; //keys for moving right and left
const column = ['Digit1', 'KeyQ', 'KeyA', 'KeyZ']; //keys for moving up

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
let x = 1050;
let y = 625;

let previousKeyRow = null;
let currentKeyRow = null;
let previousKeyColumn = null;
let currentKeyColumn = null;
let directionX = null; 
let directionY = null;

// the X position for each wall
let wallX = [
  490,
  1110,
  490,
  490,
  655,
  800,
  800,
  800,
  655
];

// the Y positionn for each wall
let wallY = [
  90,
  90,
  90,
  710,
  90,
  255,
  255,
  400,
  545
];

function resetKeys(){
  previousKeyRow = null;
  currentKeyRow = null;
  previousKeyColumn = null;
  currentKeyColumn = null;
}

//start position in the beginning or after restart
function startPosition(){
  Util.setPositionPixels(startX, startY);
  x = 1050;
  y = 625;
  resetKeys();
}

//recognize whether the swipe is to the left or right
function swipeRightLeft(event){
  if (row.includes(event.code)){
    previousKeyRow = currentKeyRow;
    currentKeyRow = event.code;
    let previousIndexRow = row.indexOf(previousKeyRow);
    let currentIndexRow = row.indexOf(currentKeyRow);
    console.log(`${previousIndexRow} -> ${currentIndexRow}`)
    if (currentIndexRow === previousIndexRow ||
      currentIndexRow === -1 ||
      previousIndexRow === -1
    ){
      directionX = 0;
    } else if (currentIndexRow > previousIndexRow){
      directionX = 1
    } else if (currentIndexRow < previousIndexRow){
      directionX = -1
      
    }
  console.log(`${directionX}`);
  }
}

//recognize whether the swipe is up or down
function swipeUpDown(event){
  if (column.includes(event.code)){
    previousKeyColumn = currentKeyColumn;
    currentKeyColumn = event.code;
    let previousIndexColumn = column.indexOf(previousKeyColumn);
    let currentIndexColumn = column.indexOf(currentKeyColumn);
    console.log(`${previousIndexColumn} -> ${currentIndexColumn}`)
    if (currentIndexColumn === previousIndexColumn ||
      currentIndexColumn === -1 ||
      previousIndexColumn === -1
    ){
      directionY = 0;
    } else if (currentIndexColumn > previousIndexColumn){
      directionY = -1
    } else if (currentIndexColumn < previousIndexColumn){
      directionY = 1
    }
  console.log(` direction y is ${directionY}`);
  }
}


//moving to the right when you hold space
function moveRight(event){
  //resetKeys();
  if (event.code === 'Space' && directionX > 0){
    x = x + 20;
    directionY = 0;
  }
}

//moving to the left when you hold space
function moveLeft(event){
  //resetKeys();
  if (event.code === 'Space' && directionX < 0){
    x = x - 20;
    directionY = 0;
}
}

function moveUp(event){
  //resetKeys();
  if (event.code === 'Space' && directionY > 0){
    y = y - 20;
    directionX = 0;
  }
  
}

function moveDown(event){
  //resetKeys();
  if (event.code === 'Space' && directionY < 0){
    y = y + 20;
    directionX = 0;
  }
}

function movement(event){
  document.addEventListener('keypress', moveRight);
  document.addEventListener('keypress', moveLeft);
  document.addEventListener('keypress', moveUp);
  document.addEventListener('keypress', moveDown);
}


function checkCollision(x, y) {
  const between = (x, min, max) => {
    if (x >= min && x <= max){
      return true;
    }
  }
  if( //seenkat zmer tuki
    x <= 530||
    x >= 1110 - size ||
    y <= 130 ||
    y >= 710 - size ||
    between(x, 800 - size, 1110 - size) && between(y, 255 - size, 295) ||
    between(x, 800 - size, 840) && between(y, 255 - size, 440) ||
    between(x, 800 - size, 995) && between(y, 400 - size, 440) ||
    between(x, 655 - size, 695) && between(y, 130, 440) ||
    between(x, 655 - size, 1110 - size) && between(y, 545 - size, 595)
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
  if (checkCollision(x,y)){
    startPosition();
    console.log('GAME OVER, START AGAIN!')
  }
  window.requestAnimationFrame(loop);
}    



// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  startPosition();
  for (let i = 0; i < maze.length; i++){
    Util.setPositionPixels(wallX[i], wallY[i], maze[i]);
  }
  window.addEventListener('keydown', swipeRightLeft)
  window.addEventListener('keydown', swipeUpDown);
  window.addEventListener('keypress', movement);
  window.requestAnimationFrame(loop);
} 

setup(); // Always remember to call setup()!
