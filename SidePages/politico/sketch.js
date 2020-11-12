var easycam;

let positionString = "";

var trans = 128; // 50%

let nott;

let ex;

function setup() {


  nott = createVector(0, 0, 0);

  ex = createVector(random(-250, 250), random(-250, 250), random(-250, 250));

  var canvas = createCanvas(600, 600, WEBGL);
  //createEasyCam();
  //document.oncontextmenu = ()=>false;

  //console.log(Dw.EasyCam.INFO);

  easycam = new Dw.EasyCam(this._renderer, {
    distance: 300
  });

  canvas.parent('sketch-holder');

  rectMode(CENTER);


  let xt = document.getElementById("slider-x-value");
  let yt = document.getElementById("slider-y-value");
  let zt = document.getElementById("slider-z-value");
  xt.innerHTML = ex.x;
  yt.innerHTML = ex.y;
  zt.innerHTML = ex.z;

}




function draw() {
  //get the html stuff
  ex.x = parseInt(document.getElementById("myRange-x").value);
  ex.y = parseInt(document.getElementById("myRange-y").value);
  ex.z = parseInt(document.getElementById("myRange-z").value);
  //
  background(255);

  //get easycam stuff
  var state = easycam.getState();





  positionString = "Camera position: <br>x = " + easycam.getPosition()[0] + " <br>y = " + easycam.getPosition()[1] + " <br>z = " + easycam.getPosition()[2] + " <br>";

  document.getElementById("XYZ").innerHTML = positionString;

  fill(64);
  push();
  translate(nott);
  box(10);
  pop();

  fill(64);
  push();
  translate(ex);
  box(10);
  pop();


  line(nott.x, nott.y, nott.z, ex.x, ex.y, ex.z);

  strokeWeight(2);

  //red triangle
  //1 line on red axis, X
  stroke(255, 0, 0);
  line(nott.x, nott.y, nott.z, ex.x, 0, 0);


  //==============================
  //green triangle
  stroke(0, 255, 0);

  line(nott.x, nott.y, nott.z, 0, 0, ex.z);

  //============================== 
  //blue triangle
  stroke(0, 0, 255);
  line(nott.x, nott.y, nott.z, 0, ex.y, 0);


  //reset stroke weight
  strokeWeight(1);
  //reset stroke
  stroke(0, 0, 0);

  fill(255, 0, 0, trans);
  rect(0, 0, 500, 500);

  push();
  rotateX(PI / 2);
  fill(0, 255, 0, trans);
  rect(0, 0, 500, 500);
  pop();

  push();
  rotateY(PI / 2);
  fill(0, 0, 255, trans);
  rect(0, 0, 500, 500);
  pop();

  //   beginShape();
  //   vertex(-50, -50,0);
  //   vertex(-50, 100,0);  
  //   vertex(100, 100,0);
  //   vertex(100, -50,0);

  //   endShape();



}