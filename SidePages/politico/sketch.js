var easycam;

let shadowCast=true;
let positionString = "";

var trans = 128; // 50%

let nott;

let ex;

let xGrid = true;
let yGrid = true;
let zGrid = true;

let xCol;
let yCol;
let zCol;

let pitch = 3;


let fontBoi;
function preload() {
  fontBoi = loadFont('Data/Literal.otf');
}



function setup() {
  //set up text
  textFont(fontBoi);
  textSize(width / 3);
  textAlign(CENTER, CENTER);

  //
  xCol = createVector(255,0,0);
  yCol = createVector(0,255,0);
  zCol = createVector(0,0,255);

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
  positionString = "Camera position: <br>x = " + easycam.getPosition()[0] + " <br>y = " + easycam.getPosition()[1] + " <br>z = " + easycam.getPosition()[2] + " <br>";
  document.getElementById("XYZ").innerHTML = positionString;
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

  //cast some shadows
  if(shadowCast){
    stroke(xCol.x,xCol.y,xCol.z);//from red to point should be blue or green
    line(ex.x,ex.y,0, ex.x, ex.y, ex.z);

    stroke(yCol.x,yCol.y,yCol.z);//from green
    line( ex.x, 0, ex.z, ex.x, ex.y, ex.z );

    stroke(zCol.x,zCol.y,zCol.z);//from blue
    line(0, ex.y, ex.z, ex.x, ex.y, ex.z);
  }
  //
  stroke(0);
  line(nott.x, nott.y, nott.z, ex.x, ex.y, ex.z);

  
  //draw the axis
  fill(xCol.x, xCol.y, xCol.z, trans);//x = red
  rect(0, 0, 500, 500);

  if(xGrid){
    //now draw the lines
    stroke(xCol.x,xCol.y,xCol.z);
    //map(value, start1, stop1, start2, stop2, [withinBounds])
    
    
    for(let i = 1; i < pitch ; i++){
      line(i*500/pitch-250,0-250,i*500/pitch-250,250);
      line(0-250,i*500/pitch-250,250,i*500/pitch-250);
    }
    
    
  }

  
  //
  stroke(0);

  //y = green
  push();
  rotateX(PI / 2);
  fill(yCol.x,yCol.y,yCol.z, trans);
  rect(0, 0, 500, 500);
  //now the lines
  if(yGrid){
    stroke(yCol.x,yCol.y,yCol.z);
    strokeWeight(1);
    for(let i = 0; i < pitch ; i++){
      line(i*500/pitch-250,0-250,i*500/pitch-250,250);
      line(0-250,i*500/pitch-250,250,i*500/pitch-250);
    }
  }
  
  pop();
  //
  stroke(0);

  //z = blue
  push();
  rotateY(PI / 2);
  fill(zCol.x,zCol.y,zCol.z, trans);
  rect(0, 0, 500, 500);
  //now the lines
  if(zGrid){
    stroke(zCol.x,zCol.y,zCol.z);
    strokeWeight(1);
    for(let i = 0; i < pitch ; i++){
      line(i*500/pitch-250,0-250,i*500/pitch-250,250);
      line(0-250,i*500/pitch-250,250,i*500/pitch-250);
    }
  }
  
  pop();

  


  //
  stroke(0);
  


  

  

  

  strokeWeight(2);

  //red
  //1 line on red axis, X
  stroke(255, 0, 0);
  line(nott.x, nott.y, nott.z, ex.x, 0, 0);


  //==============================
  //green
  stroke(0, 255, 0);

  line(nott.x, nott.y, nott.z, 0, 0, ex.z);

  //============================== 
  //blue
  stroke(0, 0, 255);
  line(nott.x, nott.y, nott.z, 0, ex.y, 0);


  //reset stroke weight
  strokeWeight(1);
  //reset stroke
  stroke(0, 0, 0);





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

function setPitch(){
  pitch = document.getElementById("pitch-input").value;
  
}

function shadowToggle(){
  shadowCast = !shadowCast;
}

function setXCol(){
  let tempC = document.getElementById("xCol-input").value;
 
  xCol.x = red(tempC);
  xCol.y = green(tempC);
  xCol.z = blue(tempC);
}
function setYCol(){
  let tempC = document.getElementById("yCol-input").value;
  yCol.x = red(tempC);
  yCol.y = green(tempC);
  yCol.z = blue(tempC);
  
}
function setZCol(){
  let tempC = document.getElementById("zCol-input").value;
  zCol.x = red(tempC);
  zCol.y = green(tempC);
  zCol.z = blue(tempC);
}