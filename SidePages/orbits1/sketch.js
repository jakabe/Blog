


let position;
let p;
let a;
let b;
//tools
var easycam;
//camera data
let oDistance = 661;
let oCameraCenter = [169.98921204946697, 121.1815578167203, 85.99056409122947];
let oCameraRotation = [0.8307845477006394, 0.40010155692603144, -0.20181231705386912, 0.33013265232715594];

//movers and attractors

function setup(){
    
    //var canvas = createCanvas(300, 300, WEBGL);
    var canvas = createCanvas(400,400);
    
    // easycam = new Dw.EasyCam(this._renderer, {
    //     distance: oDistance, 
    //     center: oCameraCenter,
    //     rotation: oCameraRotation
    // });

    
    canvas.parent('sketch-holder');
    position = createVector(width/2,height/2);
    p = createVector(0,0);
    a = 100;
    b = 150;
    

}



function draw(){
    strokeWeight(1);
    background(0);
    fill(0);
    stroke(255);
    
    ellipse(position.x,position.y,2*a,2*b);
    strokeWeight(7);
    calculatePoint();
    point(position);
    point(p);
    
    
    
    
}

function calculatePoint(){
    let th = frameCount/30;
    let r = Math.sqrt( 
        Math.pow(
            a*b,2
        ) / ( 
                (Math.pow( (b*cos(th) ),2)) + (Math.pow ( (a*sin(th) ),2) ) 
            ) 
    );
    p.x = position.x+ r*cos(th);
    p.y = position.y+ r*sin(th);
    
}