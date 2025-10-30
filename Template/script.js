/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";

// State variables are the parts of your program that change over time.
const size = 75;
let x = 0.5 - size/window.innerWidth/2
let y = 1 - size/window.innerHeight;

// Settings variables should contain all of the "fixed" parts of your programs


// Code that runs over and over again
function loop() {
  Util.setSize(size);
  Util.setPosition(x, y);
  window.requestAnimationFrame(loop);
}

//function for thew object to move up after you press U and hold SPACE
function up(event){
  if (event.code === 'KeyU' ){
    document.addEventListener('keypress', moveUp);
  } else if (event.code === 'KeyR') { //doesn work when i use !== keyU for some reson
    document.removeEventListener('keypress', moveUp)
  } else if (event.code === 'KeyL'){
    document.removeEventListener('keypress', moveUp);
  } else if (event.code === 'KeyD'){
    document.removeEventListener('keypress', moveUp);
  }
}
function moveUp(event){
  if (event.code === 'Space'){
    y = y * 0.95;
  }
}
function down(event){
  if (event.code === 'KeyD'){
    document.addEventListener('keypress', moveDown);
  } else if (event.code === 'KeyR') {
    document.removeEventListener('keypress', moveDown)
  } else if (event.code === 'KeyL'){
    document.removeEventListener('keypress', moveDown);
  } else if (event.code === 'KeyU'){
    document.removeEventListener('keypress', moveDown);
  }
}
function moveDown(event){
  if (event.code === 'Space'){
    y = y * 1.05;
  }
}
//ZAMENJI NA SWIPE PO KKEYBOARDIH DA ZAMENJAS SMER

function right(event){
  if (event.code === 'KeyR'){
    document.addEventListener('keypress', moveRight);
  } else if (event.code === 'KeyU'){
    document.removeEventListener('keypress', moveRight);
  } else if (event.code === 'KeyL'){
    document.removeEventListener('keypress', moveRight);
  } else if (event.code === 'KeyD'){
    document.removeEventListener('keypress', moveRight);
  }
}
function moveRight(event){
  if (event.code === 'Space'){
    x = x * 1.05;
  }
}

function left(event){
  if (event.code === 'KeyL'){
    document.addEventListener('keypress', moveLeft);
    setTimeout(moveLeft(), 10);
  } else if (event.code === 'KeyU'){
    document.removeEventListener('keypress', moveLeft);
  } else if (event.code === 'KeyR'){
    document.removeEventListener('keypress', moveLeft);
  } else if (event.code === 'KeyD'){
    document.removeEventListener('keypress', moveLeft);
  }
}
function moveLeft(event){
  if (event.code === 'Space'){
    x = x * 0.95;
  }
}



// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  // Put your event listener code here
  window.addEventListener('keydown', up);
  window.addEventListener('keydown', right);
  window.addEventListener('keydown', left);
  window.addEventListener('keydown', down);
  window.requestAnimationFrame(loop);
} 

setup(); // Always remember to call setup()!
