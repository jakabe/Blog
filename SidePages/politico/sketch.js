var easycam;

let positionString = "";

var trans = 128; // 50%

let nott;

let ex;

let xGrid = true;
let yGrid = true;
let zGrid = true;

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

  //draw the data points
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

  
  //draw the axis
  fill(255, 1, 1, trans);//x = red
  rect(0, 0, 500, 500);

  if(xGrid){
    //now draw the lines
    stroke(128,0,0);
    for(let i = 0; i < 500/10 ; i++){
      line(i*10-250,0-250,i*10-250,250);
      line(0-250,i*10-250,250,i*10-250);
    }
    //
    stroke(0);
  }
  

  //y = green
  push();
  rotateX(PI / 2);
  fill(0, 255, 0, trans);
  rect(0, 0, 500, 500);
  //now the lines
  if(yGrid){
    stroke(0,255,0);
    strokeWeight(1);
    for(let i = 0; i < 500/10 ; i++){
      line(i*10-250,0-250,i*10-250,250);
      line(0-250,i*10-250,250,i*10-250);
    }
  }
  
  pop();
  //
  stroke(0);

  //z = blue
  push();
  rotateY(PI / 2);
  fill(0, 0, 255, trans);
  rect(0, 0, 500, 500);
  //now the lines
  if(zGrid){
    stroke(0,0,255);
    strokeWeight(1);
    for(let i = 0; i < 500/10 ; i++){
      line(i*10-250,0-250,i*10-250,250);
      line(0-250,i*10-250,250,i*10-250);
    }
  }
  
  pop();
  //
  stroke(0);
  



  positionString = "Camera position: <br>x = " + easycam.getPosition()[0] + " <br>y = " + easycam.getPosition()[1] + " <br>z = " + easycam.getPosition()[2] + " <br>";

  document.getElementById("XYZ").innerHTML = positionString;

  

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

  

  //   beginShape();
  //   vertex(-50, -50,0);
  //   vertex(-50, 100,0);  
  //   vertex(100, 100,0);
  //   vertex(100, -50,0);

  //   endShape();



}

function xGridToggle(){
  xGrid = !xGrid;
}

function yGridToggle(){
  yGrid = !yGrid;
}

function zGridToggle(){
  zGrid = !zGrid;
}

function gridToggle(){
  xGridToggle();
  yGridToggle();
  zGridToggle();
}