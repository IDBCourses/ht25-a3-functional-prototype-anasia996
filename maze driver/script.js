/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";

// Fixed variables of my program.
const size = 50;
const startX = 1055;
const startY = 625;
const goalX = 1050;
const goalY = 170;

// Keys used to detect swipe to right/left.
const row = ['Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0']; 
// Keys used to detect swipe up/down.
const column = ['Digit1', 'KeyQ', 'KeyA', 'KeyZ']; 

// Object placed at the winning location.
const end = document.getElementById('end');

// MAZE WALLS
// Outside walls
const wall1 = document.getElementById('thing1');
const wall2 = document.getElementById('thing2');
const wall3 = document.getElementById('thing3');
const wall4 = document.getElementById('thing4');

// Inside walls
const wall5 = document.getElementById('thing5'); 
const wall6 = document.getElementById('thing6'); 
const wall7 = document.getElementById('thing7'); 
const wall8 = document.getElementById('thing8'); 
const wall9 = document.getElementById('thing9'); 

// Array of all the walls.
const maze = [wall1, wall2, wall3, wall4, wall5, wall6, wall7, wall8, wall9];


// Not fixed variables of my program.
let x = startX;
let y = startY;
let previousKeyRow = null;
let currentKeyRow = null;
let previousKeyColumn = null;
let currentKeyColumn = null;
let directionX = 0; 
let directionY = 0;
let isMoving = false;

// X position for each wall, matching maze[] order.
let wallX = [ 490, 1110, 490, 490, 655, 800, 800, 800, 655];

// The Y position for each wall, matching maze[] order.
let wallY = [ 90, 90, 90, 710, 90, 255, 255, 400, 545];


// Start position in the beginning or after restart.
function startPosition(){
  Util.setPositionPixels(startX, startY);
  x = startX;
  y = startY;
  previousKeyRow = null;
  currentKeyRow = null;
  previousKeyColumn = null;
  currentKeyColumn = null;
}

// Recognizes whether the swipe is to the left or right.
function swipeRightLeft(event){
  if (row.includes(event.code)){
    previousKeyRow = currentKeyRow;
    currentKeyRow = event.code;

    let previousIndexRow = row.indexOf(previousKeyRow);
    let currentIndexRow = row.indexOf(currentKeyRow);

    directionY = 0; // Prevents from moving vertically or diagonally.

    if (currentIndexRow === previousIndexRow || 
      currentIndexRow === -1 ||
      previousIndexRow === -1
    ){
      directionX = 0;
    } else if (currentIndexRow > previousIndexRow){
      directionX = 1; // Right
    } else if (currentIndexRow < previousIndexRow){
      directionX = -1; // Left
    }
    console.log(`Horizontal direction is ${directionX}`);
  }
}

// Recognizes whether the swipe is up or down.
function swipeUpDown(event){
  if (column.includes(event.code)){
    previousKeyColumn = currentKeyColumn;
    currentKeyColumn = event.code;

    let previousIndexColumn = column.indexOf(previousKeyColumn);
    let currentIndexColumn = column.indexOf(currentKeyColumn);

    directionX = 0; // Prevents from moving horizontally or diagonally.

    if (currentIndexColumn === previousIndexColumn ||
      currentIndexColumn === -1 ||
      previousIndexColumn === -1
    ){
      directionY = 0;
    } else if (currentIndexColumn < previousIndexColumn){
      directionY = 1; // Up
    } else if (currentIndexColumn > previousIndexColumn){
      directionY = -1; // Down
    } 
  console.log(`Vertical direction is ${directionY}`);
  }
}

// Checks if spacebar is pressed.
function checkSpace(event){ 
  if (event.code === 'Space'){
    // Checks if spacebar is held and not pressed repeatedly.
    if (event.type === 'keydown' && !event.repeat){
      isMoving = true;
    } else if (event.type === 'keyup'){ 
      isMoving = false;
    }
  }
}

// Makes the object move depending on the swipe and direction of it.
function movement(){
  if (isMoving){
    if (directionX > 0){
      x += 3; // Moving right
    } else if (directionX < 0){
      x -= 3; // Moving left
    }

    if (directionY > 0){
      y -= 3; // Moving up
    } else if (directionY < 0) {
      y += 3; // Moving down
    }
  }
}

// Checks if the object is touching any of the walls.
function checkCollision(x, y) {
  const between = (x, min, max) => {
    if (x >= min && x <= max){
      return true;
    } else {
      return false;
    }
  }
  if( 
    x <= 530 ||  // wall1
    x >= 1060 || // wall2
    y <= 130 || // wall3
    y >= 660 || // wall4
    between(x, 605, 695) && between(y, 130, 440) || // wall5
    between(x, 750, 840) && between(y, 245, 400) || // wall6
    between(x, 750, 1060) && between(y, 205, 295) || // wall7
    between(x, 750, 995) && between(y, 350, 440) || // wall8
    between(x, 605, 1060) && between(y, 495, 585) // wall9
  ){ 
    return true;
  } else {
    return false;
  }
}

// Checks if the object is at the winning location.
function winningLocation(x, y){
  if (x > goalX - 10 && y < goalY + 20){
    return true;
  } else {
    return false;
  }
}

// In case of winning the game everything stops, have to reload the website to play again.
function gameEnd(){
  window.removeEventListener('keydown', swipeRightLeft);
  window.removeEventListener('keydown', swipeUpDown);
  window.removeEventListener('keydown', checkSpace);
  window.removeEventListener('keyup', checkSpace);
  
  document.body.style.background = 'deeppink';
  console.log('CONGRATULATIONS! YOU MADE IT TO THE END!')
}


function loop() {
  Util.setSize(size);
  Util.setPositionPixels(x, y);

  movement();
  if (checkCollision(x,y)){ // In case of collision, restart the game.
    startPosition();
    isMoving = false; // Stops movement if it touches walls.
    console.log('GAME OVER, START AGAIN!')
  }
  if (winningLocation(x, y)){
    gameEnd();
  }
  window.requestAnimationFrame(loop);
}    



// Setup of the program.
function setup() {
  startPosition();

  for (let i = 0; i < maze.length; i++){
    Util.setPositionPixels(wallX[i], wallY[i], maze[i]);  // Positions each wall of the maze.
  }
  Util.setPositionPixels(goalX, goalY, end)
  window.addEventListener('keydown', swipeRightLeft);
  window.addEventListener('keydown', swipeUpDown);

  window.addEventListener('keydown', checkSpace);
  window.addEventListener('keyup', checkSpace);
  
  window.requestAnimationFrame(loop);
} 

setup(); 
