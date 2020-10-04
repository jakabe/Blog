//legs in motion?
var bRLW = true;
var fRLW = false;
var bodyMovingR = false;
var bodyMovingL = false;
var bLLW = false;
var fLLW = false;
//
var nextPosition;
let pos;
let rad;

//leg length is 50,50 for now
let lL;

//NOTE: forward = (1,0) vector in R2


//legs are relative to position = ( 0 , 0 );

//forward left shoulder
// forward rad, left rad
let fLS;

//forward left LEG
let fLL;

//forward right shoulder
//forward rad, right rad
let fRS;

//forward right LEG
let fRL;

//back left shoulder
//backward rad, left rad
let bLS;

//backward left LEG
let bLL;


//back right shoulder
//backward rad, right rad
let bRS;

//backward right leg
let bRL;

/* NOTE: 
 *
 *  forward  := positive Y
 *  backward := negative Y 
 *
 *  left     := negative X
 *  right    := positive X
 *
 */

let fLD;
let fRD;
let bLD;
let bRD;
//
var canvas;
var animate;



function configureSetup(){
  rectMode(CENTER);
  textSize(32);

  nextPosition = createVector(0, 60);

  pos = createVector(150, 300);
  rad = 25;
  lL = createVector(rad, rad);

  //direction vectors
  fLD = createVector(-1, -1);
  fRD = createVector(1, -1);
  bLD = createVector(-1, 1);
  bRD = createVector(1, 1);


  //NOTE: forward = (0,1) vector in R2


  //legs are relative to position = ( 0 , 0 );

  /*-------------------------------------------*/
  //forward left shoulder
  // forward rad, left rad
  fLS = p5.Vector.mult(fLD, rad);
  fLS = p5.Vector.add(fLS, pos);
  //fLL
  fLL = p5.Vector.add(
    fLS,
    p5.Vector.mult(fLD, lL)
  );
  /*-------------------------------------------*/

  /*-------------------------------------------*/
  //forward right shoulder
  //forward rad, right rad
  fRS = p5.Vector.mult(fRD, rad);
  fRS = p5.Vector.add(fRS, pos);
  //fRL
  fRL = p5.Vector.add(
    fRS,
    p5.Vector.mult(fRD, lL)
  );
  /*-------------------------------------------*/

  /*-------------------------------------------*/
  //back left shoulder
  //backward rad, left rad
  bLS = p5.Vector.mult(bLD, rad);
  bLS = p5.Vector.add(bLS, pos);
  //bLL
  bLL = p5.Vector.add(
    bLS,
    p5.Vector.mult(bLD, lL)
  );
  /*-------------------------------------------*/

  /*-------------------------------------------*/
  //back right shoulder
  //backward rad, right rad
  bRS = p5.Vector.mult(bRD, rad);
  bRS = p5.Vector.add(bRS, pos);
  //bRL
  bRL = p5.Vector.add(
    bRS,
    p5.Vector.mult(bRD, lL)
  );
  /*-------------------------------------------*/
  
  //start off screen
  pos.y = height +10;
}

function onLoadFN(){
  
  canvas.parent('#walking-robot-canvas');
  console.log("onALoad ran");
   //alert("BOOP");
}

function setup() {
  
  canvas = createCanvas(500, 500);
  
  
  configureSetup();


  //createCanvas(400, 400);
  
  

}

function draw() {
  background(255);
  /* we will need to recalculate each position for each frame
   *
   *
   **/
  //reCalculateLegPositions();
  /**/



  // Coord axes----------------------
  drawCoordinateAxis()
  //---------------------------------

  //draw the bot
  drawBot();

  //pos.y--;

  walk();

}

function walk() {
  if(pos.y > -100){
     
     
  bRLStep();
  fRLStep();
  moveBodyR();
  bLLStep();
  fLLStep();
  moveBodyL();
}
}
function bRLStep() {
  
  if (bRLW == true) {
    //console.log("back Right Leg Stepping...");
    if (bRL.y > pos.y) {
      bRL.y--;
    } else {
      bRLW = false;
      fRLW = true;
    }
  }
  
}

function fRLStep() {
  
  if (fRLW == true) {
   // console.log("front Right Leg Stepping...");
    if (fRL.y > pos.y -3*rad ) {
      fRL.y--;
    } else {
      fRLW = false;
      bodyMovingR = true;
    }
  }
   
}

function moveBodyR() {
 
  if (bodyMovingR == true) {
     //console.log("body Moving Forward");
    if (pos.y > fRL.y + 2 * rad) {
      pos.y--;

      reCalculateShoulderPositions();
    } else {
      bodyMovingR = false;
      bLLW = true;
    }
  }
   
  
}

function bLLStep() {
  
  if (bLLW == true) {
    //console.log("back Left Leg Stepping...");
    if (bLL.y > pos.y) {
      bLL.y--;
    } else {
      bLLW = false;
      fLLW = true;
    }
  }
   
}

function fLLStep() {
  
  if (fLLW == true) {
    //console.log("forward Left Leg Stepping...");
    if ( fLL.y > pos.y -3*rad) {
      fLL.y--;
    } else {
      fLLW = false;
      bodyMovingL = true;
    }
  }
   
}

function moveBodyL() {
  
  if (bodyMovingL == true) {
    //console.log("Moving Body Again...");
    if (pos.y > bLL.y -3*rad) {
      pos.y--;

      reCalculateShoulderPositions();
    } else {
      bodyMovingL = false;
      bRLW = true;
    }
    
  }
}





// draw an arrow for a vector at a given base position
function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(5);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

function reCalculateShoulderPositions() {
  /*-------------------------------------------*/
  //forward left shoulder
  // forward rad, left rad
  fLS = p5.Vector.mult(fLD, rad);
  fLS = p5.Vector.add(fLS, pos);

  /*-------------------------------------------*/
  //forward right shoulder
  //forward rad, right rad
  fRS = p5.Vector.mult(fRD, rad);
  fRS = p5.Vector.add(fRS, pos);

  /*-------------------------------------------*/
  //back left shoulder
  //backward rad, left rad
  bLS = p5.Vector.mult(bLD, rad);
  bLS = p5.Vector.add(bLS, pos);

  /*-------------------------------------------*/
  //back right shoulder
  //backward rad, right rad
  bRS = p5.Vector.mult(bRD, rad);
  bRS = p5.Vector.add(bRS, pos);


}


function reCalculateLegPositions() {

  //NOTE: forward = (0,1) vector in R2


  //legs are relative to position = ( 0 , 0 );

  //fLL
  fLL = p5.Vector.add(
    fLS,
    p5.Vector.mult(fLD, lL)
  );
  /*-------------------------------------------*/


  //fRL
  fRL = p5.Vector.add(
    fRS,
    p5.Vector.mult(fRD, lL)
  );
  /*-------------------------------------------*/


  //bLL
  bLL = p5.Vector.add(
    bLS,
    p5.Vector.mult(bLD, lL)
  );
  /*-------------------------------------------*/


  //bRL
  bRL = p5.Vector.add(
    bRS,
    p5.Vector.mult(bRD, lL)
  );
  /*-------------------------------------------*/

}

function drawCoordinateAxis() {
  push();
  translate(width / 2, height / 2);
  // Y dir
  drawArrow(
    createVector(0, 0),
    createVector(0, -height / 4),
    color(255, 0, 0)
  );
  text(`y`, 0, -height / 4);
  //

  //X Dir
  drawArrow(
    createVector(0, 0),
    createVector(width / 4, 0),
    color(0, 0, 255)
  );
  text(`x`, width / 4, 0);
  //
  pop();
}

/**
 *
 *
 */
function drawBot() {
  var s1, s2, s3, s4;
  strokeWeight(5);
  stroke(64);
  fill(120);

  //body
  square(pos.x, pos.y, 2 * rad);

  //legs
  fill(0);

  //fLL
  strokeWeight(5);
  stroke(64);
  line(fLS.x, fLS.y, fLL.x, fLL.y);

  strokeWeight(0);
  stroke(0);
  s1 = `${fLL.x},${fLL.y}`;
  text(s1, fLL.x, fLL.y);

  //fRL
  strokeWeight(5);
  stroke(64);
  line(fRS.x, fRS.y, fRL.x, fRL.y);

  strokeWeight(0);
  stroke(0);
  s2 = `${fRL.x},${fRL.y}`;
  text(s2, fRL.x, fRL.y);

  //bLL
  strokeWeight(5);
  stroke(64);
  line(bLS.x, bLS.y, bLL.x, bLL.y);

  strokeWeight(0);
  stroke(0);
  s3 = `${bLL.x},${bLL.y}`;
  text(s3, bLL.x, bLL.y);

  //bRL
  strokeWeight(5);
  stroke(64);
  line(bRS.x, bRS.y, bRL.x, bRL.y);

  strokeWeight(0);
  stroke(0);
  s4 = `${bRL.x},${bRL.y}`;
  text(s4, bRL.x, bRL.y);

  //shoulders get drawn OVERTOP of legs
  fill(120);
  circle(fLS.x, fLS.y, rad / 2);
  circle(fRS.x, fRS.y, rad / 2);
  circle(bLS.x, bLS.y, rad / 2);
  circle(bRS.x, bRS.y, rad / 2);


}