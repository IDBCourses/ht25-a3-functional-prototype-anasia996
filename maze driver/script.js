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
let x = 1050;
let y = 625;
let startX = 1050;
let startY = 625;
let previousKeyRow = null;
let currentKeyRow = null;
let previousKeyColumn = null;
let currentKeyColumn = null;

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
      document.addEventListener('keypress', moveRight);
      document.removeEventListener('keypress', moveLeft);
      document.removeEventListener('keypress', moveUp);
    } else if (currentIndexRow < previousIndexRow){
      row.pop('Space');
      document.addEventListener('keypress', moveLeft);
      document.removeEventListener('keypress', moveRight);
      document.removeEventListener('keypress', moveUp);
    }
  } else {
    document.removeEventListener('keypress', moveRight);
    document.removeEventListener('keypress', moveLeft);
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
  if (column.includes(event.code)){
    previousKeyColumn = currentKeyColumn;
    currentKeyColumn = event.code;
    let previousIndexColumn = column.indexOf(previousKeyColumn);
    let currentIndexColumn = column.indexOf(currentKeyColumn);
    console.log(`${previousIndexColumn} -> ${currentIndexColumn}`);
    if (currentIndexColumn < previousIndexColumn){
      document.addEventListener('keypress', moveUp);
      document.removeEventListener('keypress', moveRight);
      document.removeEventListener('keypress', moveLeft);
    } 
  } else {
    document.removeEventListener('keypress', moveUp);
  }
}

function moveUp(event){
  if (
    event.code === 'KeyV'
  ){
    y = y * 0.9;
  }
}
function startPosition(){
  Util.setPositionPixels(startX, startY);
  let previousKeyRow = null;
  let currentKeyRow = null;
  let previousKeyColumn = null;
  let currentKeyColumn = null;
}
function checkCollision(x, y) {
  const between = (x, min, max) => {
    if (x >= min && x <= max){
      return true;
    }
  }
  if(
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
  for (let i = 0; i < maze.length; i++){
    Util.setPositionPixels(wallX[i], wallY[i], maze[i]);
  }
  if (checkCollision(x,y)){
    startPosition();
  }
  window.requestAnimationFrame(loop);
}    



// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  startPosition();
  // Put your event listener code here
  window.addEventListener('keypress', swipeRightLeft)
  window.addEventListener('keypress', swipeUp);
  window.requestAnimationFrame(loop);
} 
window.setInterval(setup(), 20);
//setup(); // Always remember to call setup()!
