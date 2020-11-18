// port of Daniel Shiffman's Inverse Kinematics coding challenge
// by madacoo

let tentacle;
let vX;
let vY;
let pX;
let pY;

function setup() {
  //createCanvas(600, 400);
  var canvas = createCanvas(600, 600);
  canvas.parent('sketch-holder');
  // We set up point as a p5.Vector instead of passing Segment an x and a y
  // because JavaScript does not have function overloading.
  // See segment.js for more information.
  let point = new p5.Vector(300, 200);

  let current = new Segment(point, 10, 0);
  for (let i = 0; i < 20; i++) {
    let next = new Segment(current, 10, i);
    current.child = next;
    current = next;
  }
  tentacle = current;

  vX=random(-1,1);
  vY=random(-1,1);
  pX = width/2;
  pY = height/2;
}


  

function draw() {


  pX = pX+vX;
  pY = pY+vY;
  
  background(51);

  tentacle.follow(pX, pY);
  tentacle.update();
  tentacle.show();

  let next = tentacle.par;
  while (next) {
    next.follow();
    next.update();
    next.show();
    next = next.par;
  }

  collide();
}

function collide(){
  //check x
  if(pX < 0 || pX > width){
    vX*=-1;
  }
  //check y
  if(pY < 0 || pY > height){
    vY*=-1;
  }
}

