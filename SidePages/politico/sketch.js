var easycam;

let dataPointRadius = 15; 

let shadowCast=true;
let positionString = "";

var trans = 128; // 50%

let nott; //origin
let ex;//example point
let dataPoints;

let xGrid = true;
let yGrid = true;
let zGrid = true;

let xCol;
let yCol;
let zCol;

let pitch = 3;

let showAxisLabels = false;

let xAxisLabel = "x axis";
let yAxisLabel = "y axis";
let zAxisLabel = "z axis";

let showPlaneLabels = false;

let xyPlaneLabel = "xy plane";
let yzPlaneLabel = "yz plane";
let xzPlaneLabel = "xz plane";

//camera data
let oDistance = 661;
let oCameraCenter = [169.98921204946697, 121.1815578167203, 85.99056409122947];
let oCameraRotation = [0.8307845477006394, 0.40010155692603144, -0.20181231705386912, 0.33013265232715594];

//image information
let xyImg;
let yzImg;
let xzImg;

//highlighted point
let highLightedPoint;

function setup() {
  //set up text
  dataPoints =[];

  //
  xCol = createVector(255,0,0);
  yCol = createVector(0,255,0);
  zCol = createVector(0,0,255);

  nott = createVector(0, 0, 0);

  ex = createVector(random(-250, 250), random(-250, 250), random(-250, 250));
  dataPoints.push(ex);

  var canvas = createCanvas(600, 600, WEBGL);
  //createEasyCam();
  //document.oncontextmenu = ()=>false;

  //console.log(Dw.EasyCam.INFO);

  easycam = new Dw.EasyCam(this._renderer, {
    distance: oDistance, 
    center: oCameraCenter,
    rotation: oCameraRotation
  });

  canvas.parent('sketch-holder');

  rectMode(CENTER);


  

}

function resetCamera(){
  console.log("reseting view");
  //easycam.setCenter(oCameraCenter, 1);
  easycam.setRotation(oCameraRotation,500);
  easycam.setDistance(oDistance, 500);
  //console.log(easycam.getState());
  //easycam.update();

  // easycam.distance = oDistance;
  // easycam.center = oCameraCenter;
  // easycam.rotation = oCameraRotation;
}


function draw() {
  
  
  //
  positionString = "Camera position: <br>x = " + easycam.getPosition()[0] + " <br>y = " + easycam.getPosition()[1] + " <br>z = " + easycam.getPosition()[2] + " <br>";
  
  //
  background(255);

  //get easycam stuff
  var state = easycam.getState();
  

  //draw the data points
  fill(64);
  push();
  translate(nott);
  strokeWeight(dataPointRadius);
  point(0,0);
  pop();

  // fill(64);
  // push();
  // translate(ex);
  // strokeWeight(dataPointRadius);
  // point(0,0);
  // pop();

  for(let i = 0 ; i< dataPoints.length; i++){
    fill(64);
    push();
    translate(dataPoints[i]);
    if(dataPoints[i]!=highLightedPoint){
      strokeWeight(dataPointRadius);
      point(0,0);
    } else {
      stroke(255,0,0);
      let tx;
      let ty;
      strokeWeight(4);
      for(let j = 0 ; j < 8 ; j++){
        tx = dataPointRadius*cos(frameCount/30+j*PI/4);
        ty = dataPointRadius*sin(frameCount/30+j*PI/4);
        point(tx,ty);
      }
      
      
      
      stroke(255);
      strokeWeight(dataPointRadius+5);
      point(0,0);
      stroke(0);
      strokeWeight(dataPointRadius);
      point(0,0);
      
      
      

    }

    
    pop();
  }
      
      //cast some shadows
      if(shadowCast && highLightedPoint != null){
        stroke(xCol.x,xCol.y,xCol.z);//from red to point should be blue or green
        line(highLightedPoint.x,highLightedPoint.y,0, highLightedPoint.x, highLightedPoint.y, highLightedPoint.z);

        stroke(yCol.x,yCol.y,yCol.z);//from green
        line( highLightedPoint.x, 0, highLightedPoint.z, highLightedPoint.x, highLightedPoint.y, highLightedPoint.z );

        stroke(zCol.x,zCol.y,zCol.z);//from blue
        line(0, highLightedPoint.y, highLightedPoint.z, highLightedPoint.x, highLightedPoint.y, highLightedPoint.z);
        
        stroke(0);
        line(0,0,0,highLightedPoint.x,highLightedPoint.y,highLightedPoint.z);
      }

  //reset stroke weight
  strokeWeight(1);

  
  

  
  //draw the axis
  if(xyImg == null){
    fill(xCol.x, xCol.y, xCol.z, trans);//x = red
    rect(0, 0, 500, 500);
  } else {
    tint(255, trans);
    image(xyImg,-250,-250,500,500);

  }
  
  

  if(xGrid){
    //now draw the lines
    stroke(xCol.x,xCol.y,xCol.z);
    //map(value, start1, stop1, start2, stop2, [withinBounds])
    
    
    for(let i = 1; i < pitch ; i++){
      line(i*500/pitch-250,0-250,i*500/pitch-250,250);
      line(0-250,i*500/pitch-250,250,i*500/pitch-250);
    }
    
    
  }

  if(showAxisLabels){
    //labels!
    //x
    push();
    translate(300,0,0);
    
    fill(0);
    stroke(0);
    drawString3D(xAxisLabel,1);
    pop();

    //y
    push();
    translate(0,300,0);
    fill(0);
    stroke(0);
    drawString3D(yAxisLabel,1);
    pop();

    //z
    push();
    translate(0,0,300);
    rotateY(PI / 2);
    rotateX(-PI / 4);
    fill(0);
    stroke(0);
    drawString3D(zAxisLabel,1);
    pop();
  }

  if(showPlaneLabels){
    //plane labels
    //xy
    push();
    translate(300,300,0);
    rotateZ(PI / 4);
    fill(0);
    stroke(0);
    drawString3D(xyPlaneLabel,1);
    pop();

    //yz
    push();
    
    translate(0,300,300);
    
    //rotateX(PI / 2);
    rotateY(PI / 2);
    fill(0);
    stroke(0);
    drawString3D(yzPlaneLabel,1);
    pop();

    //xz
    push();
    translate(300,0,300);

    rotateY(PI / 2);
    rotateX(-PI / 2);
    //rotateX(PI / 4);

    fill(0);
    stroke(0);
    drawString3D(xzPlaneLabel,1);
    pop();
  }
  
  
  //
  stroke(0);

  //xz = green
  
  push();
  rotateX(PI / 2);
  if(xzImg ==null){
    fill(yCol.x,yCol.y,yCol.z, trans);
    rect(0, 0, 500, 500);
  } else {
    tint(255, trans);
    image(xzImg,-250,-250,500,500);
  }

  

  //drawString3D("y axis",1);

  //now the lines
  if(yGrid){
    stroke(yCol.x,yCol.y,yCol.z);
    strokeWeight(1);
    for(let i = 1; i < pitch ; i++){
      line(i*500/pitch-250,0-250,i*500/pitch-250,250);
      line(0-250,i*500/pitch-250,250,i*500/pitch-250);
    }
  }
  
  pop();
  //
  stroke(0);

  //yz = blue
  push();
  rotateY(PI / 2);
  if(yzImg==null){
    fill(zCol.x,zCol.y,zCol.z, trans);
    rect(0, 0, 500, 500);
  } else {
    tint(255, trans);
    image(yzImg,-250,-250,500,500);
  }
  
  //drawString3D("z axis",1);
  //now the lines
  if(zGrid){
    stroke(zCol.x,zCol.y,zCol.z);
    strokeWeight(1);
    for(let i = 1; i < pitch ; i++){
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

function setXLabel(){
  xAxisLabel =  document.getElementById("xAx-input").value;
}

function setYLabel(){
  yAxisLabel =  document.getElementById("yAx-input").value;
}

function setZLabel(){
  zAxisLabel =  document.getElementById("zAx-input").value;
}

function setXYPlaneLabel(){
  xyPlaneLabel =  document.getElementById("xy-Plane-input").value;
}

function setYZPlaneLabel(){
  yzPlaneLabel =  document.getElementById("yz-Plane-input").value;
}

function setXZPlaneLabel(){
  xzPlaneLabel =  document.getElementById("xz-Plane-input").value;
}

function addDataPoint(){
  
  let xc = document.getElementById("dataPoint-x-input").value;
  let yc = document.getElementById("dataPoint-y-input").value;
  let zc = document.getElementById("dataPoint-z-input").value;
  let newPoint = createVector(xc,yc,zc);
  dataPoints.push(newPoint);
  //console.log("adding point ["+xc+", "+yc+", "+zc+"]");

  for(let i = 0 ; i < dataPoints.length ; i++){
    console.log(dataPoints[i]);
  }
  document.getElementById("dataPointSelector-input").setAttribute("max",dataPoints.length);
  
}

function axLaToggle(){ showAxisLabels = !showAxisLabels;}
function plLaToggle(){ showPlaneLabels= !showPlaneLabels;}

function loadxyImg(){
  let tempImg = document.getElementById("plane-img-tag").src;
  xyImg = loadImage(tempImg);
}

function loadyzImg(){
  let tempImg = document.getElementById("plane-img-tag").src;
  yzImg = loadImage(tempImg);
}

function loadxzImg(){
  let tempImg = document.getElementById("plane-img-tag").src;
  xzImg = loadImage(tempImg);
}

//stolen from the web
function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.onload = function (e) {
          $('#plane-img-tag').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
  }
}
$("#plane-img").change(function(){
  readURL(this);
});
//selecting points and getting their info
function selectDataPoint(){
  
  let n = document.getElementById("dataPointSelector-input").value;
  let d = dataPoints[n];
  //
  
  //highlighting the point
  highLightedPoint = d;

  let pData = document.getElementById("dpi");

  pData.innerHTML = "<div> x= "+d.x+"</div><div>y= "+d.y+"</div><div>z= "+d.z+"</div>";
}
