/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";

// Settings variables should contain all of the "fixed" parts of your programs
const size = 50;
const startX = 1055;
const startY = 625;
const goalX = 1050;
const goalY = 170;
const row = ['Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0']; // keys for moving right and left
const column = ['Digit1', 'KeyQ', 'KeyA', 'KeyZ']; // keys for moving up and down

// object that is placed at the winning location
const end = document.getElementById('end');
// outside walls
const wall1 = document.getElementById('thing1');
const wall2 = document.getElementById('thing2');
const wall3 = document.getElementById('thing3');
const wall4 = document.getElementById('thing4');

// inside walls
const wall5 = document.getElementById('thing5'); 
const wall6 = document.getElementById('thing6'); 
const wall7 = document.getElementById('thing7'); 
const wall8 = document.getElementById('thing8'); 
const wall9 = document.getElementById('thing9'); 

// array of all the walls
const maze = [wall1, wall2, wall3, wall4, wall5, wall6, wall7, wall8, wall9];


// State variables are the parts of your program that change over time.
let x = startX;
let y = startY;
let previousKeyRow = null;
let currentKeyRow = null;
let previousKeyColumn = null;
let currentKeyColumn = null;
let directionX = null; 
let directionY = null;
let isMoving = false;

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


// start position in the beginning or after restart
function startPosition(){
  Util.setPositionPixels(startX, startY);
  x = startX;
  y = startY;
  previousKeyRow = null;
  currentKeyRow = null;
  previousKeyColumn = null;
  currentKeyColumn = null;
}

// recognize whether the swipe is to the left or right
function swipeRightLeft(event){
  if (row.includes(event.code)){
    previousKeyRow = currentKeyRow;
    currentKeyRow = event.code;
    let previousIndexRow = row.indexOf(previousKeyRow);
    let currentIndexRow = row.indexOf(currentKeyRow);
    directionY = 0; // prevents from moving up, down or even diagonally
    if (currentIndexRow === previousIndexRow || // incase you press any other keys
      currentIndexRow === -1 ||
      previousIndexRow === -1
    ){
      directionX = 0;
    } else if (currentIndexRow > previousIndexRow){
      directionX = 1; // direction right
    } else if (currentIndexRow < previousIndexRow){
      directionX = -1; // direction left
    }
  console.log(`Direction of the swipe is ${directionX}`);
  }
}

// recognize whether the swipe is up or down
function swipeUpDown(event){
  if (column.includes(event.code)){
    previousKeyColumn = currentKeyColumn;
    currentKeyColumn = event.code;
    let previousIndexColumn = column.indexOf(previousKeyColumn);
    let currentIndexColumn = column.indexOf(currentKeyColumn);
    directionX = 0; // prevents from moving left, right or diagonally
    if (currentIndexColumn === previousIndexColumn ||
      currentIndexColumn === -1 ||
      previousIndexColumn === -1
    ){
      directionY = 0;
    } else if (currentIndexColumn < previousIndexColumn){
      directionY = 1; // direction up
    } else if (currentIndexColumn > previousIndexColumn){
      directionY = -1; // direction down
    } 
  console.log(`Direction of the swipe is ${directionY}`);
  }
}

function checkSpace(event){ // checks if spacebar is being pressed 
  if (event.code === 'Space'){
    // checks if spacebar is held and not pressed repeatedly
    if (event.type === 'keydown' && !event.repeat){
      isMoving = true;
    } else if (event.type === 'keyup'){ 
      isMoving = false;
    }
  }
}

// makes the object move depending on the swipe and direction of it
function movement(){
  if (isMoving){
    if (directionX > 0){
      x += 5; // moving right
    } else if (directionX < 0){
      x -= 5; // moving leftt
    }

    if (directionY > 0){
      y -= 5; // moving up
    } else if (directionY < 0) {
      y += 5; // moving down
    }
  }
}

// checks if the object is touching any of the walls
function checkCollision(x, y) {
  const between = (x, min, max) => {
    if (x >= min && x <= max){
      return true;
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
  }
  else {
    return false;
  }
}

//check if the object is at the winning location
function winningLocation(x, y){
  if (x > goalX - 10 && y < goalY){
    return true;
  } else {
    return false;
  }
}

//incase of winning the game everything stops, have to reload the website
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
  if (checkCollision(x,y)){ //incase of collison restart the game
    startPosition();
    isMoving = false; //stops movement if touches the walls
    console.log('GAME OVER, START AGAIN!')
  }
  if (winningLocation(x, y)){
    gameEnd();
  }
  window.requestAnimationFrame(loop);
}    



// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  startPosition();
  for (let i = 0; i < maze.length; i++){
    Util.setPositionPixels(wallX[i], wallY[i], maze[i]);
  }
  Util.setPositionPixels(goalX, goalY, end)
  window.addEventListener('keydown', swipeRightLeft);
  window.addEventListener('keydown', swipeUpDown);

  window.addEventListener('keydown', checkSpace);
  window.addEventListener('keyup', checkSpace);
  window.requestAnimationFrame(loop);
} 

setup(); // Always remember to call setup()!
