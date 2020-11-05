const s = ( p ) => {

  //legs in motion?
  let bRLW = true;
  let fRLW = false;
  let bodyMovingR = false;
  let bodyMovingL = false;
  let bLLW = false;
  let fLLW = false;
    //
    let nextPosition;
    let pos;
    let rad;

    //leg length is 50,50 for now
    let lL;

    //NOTE: forward = (1,0) vector in R2


    //legs are relative to position = ( 0 , 0 );

    //forward left shoulder
    // forward rad, left rad
    let fLS = p.createVector(0, 0);

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
    // p.canvas;
    // p.animate;



  p.configureSetup =function(){
    console.log("configuring setup...");
    p.rectMode(p.CENTER);
    p.textSize(32);

    p.nextPosition = p.createVector(0, 60);

    pos = p.createVector(150, 300);
    rad = 25;
    lL = p.createVector(rad, rad);

    //direction vectors
    fLD = p.createVector(-1, -1);
    fRD = p.createVector(1, -1);
    bLD = p.createVector(-1, 1);
    bRD = p.createVector(1, 1);


    //NOTE: forward = (0,1) vector in R2


    //legs are relative to position = ( 0 , 0 );

    /*-------------------------------------------*/
    //forward left shoulder
    // forward rad, left rad
    fLS = p5.Vector.mult(fLD, rad);
    fLS = p5.Vector.add(fLS, pos);
    //adjust for starting off screen
    fLS.y += p.height +10;


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
    //
    fRS.y+= p.height +10;


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
    //
    bLS.y+= p.height +10;


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
    //
    bRS.y+= p.height +10;


    //bRL
    bRL = p5.Vector.add(
      bRS,
      p5.Vector.mult(bRD, lL)
    );
    /*-------------------------------------------*/
    
    //start off screen
    pos.y = p.height +10;
    //p.reCalculateShoulderPositions();
    console.log("configuration setup completed");
  };

  p.onLoadFN = function(){
    
    p.canvas.parent('#walking-robot-canvas');
    console.log("onALoad ran");
    //alert("BOOP");
  };

  p.setup = function() {
    
    p.canvas = p.createCanvas(500, 500);
    
    
    p.configureSetup();


    //createCanvas(400, 400);
    
    

  };

  p.draw = function() {
    p.background(255);
    /* we will need to recalculate each position for each frame
    *
    *
    **/
    //reCalculateLegPositions();
    /**/



    // Coord axes----------------------
    p.drawCoordinateAxis();
    //---------------------------------

    //draw the bot
    p.drawBot();

    //pos.y--;

    p.walk();

  };

  p.walk = function() {
    // console.log("walking...");
    // console.log("Position y is currently "+pos.y+" ");
    if(pos.y > -100){
      
      
      p.bRLStep();
      p.fRLStep();
      p.moveBodyR();
      p.bLLStep();
      p.fLLStep();
      p.moveBodyL();
    }
  };
  p.bRLStep=function() {
    
    if (bRLW == true) 
    {
      // console.log("--back Right Leg Stepping...");
      if (bRL.y > pos.y) {
        bRL.y--;
        // console.log("bRL = "+bRL);
      } else {
        // console.log("bRL step completed..."+bRL.y);
        bRLW = false;
        fRLW = true;
      }
    }
    
  };

  p.fRLStep=function() {
    
    if (fRLW == true) 
    {
    // console.log("--front Right Leg Stepping...");
      if (fRL.y > pos.y -3*rad ) {
        fRL.y--;
      } else {
        fRLW = false;
        bodyMovingR = true;
      }
    }
    
  };

  p.moveBodyR=function() {
  
    if (bodyMovingR == true) 
    {
      // console.log("--body Moving Forward");
      if (pos.y > fRL.y + 2 * rad) {
        pos.y--;

        p.reCalculateShoulderPositions();
      } else {
        bodyMovingR = false;
        bLLW = true;
      }
    }
    
    
  };

  p.bLLStep=function() {
    
    if (bLLW == true) {
      // console.log("--back Left Leg Stepping...");
      if (bLL.y > pos.y) {
        bLL.y--;
      } else {
        bLLW = false;
        fLLW = true;
      }
    }
    
  };

  p.fLLStep=function() {
    
    if (fLLW == true) {
      // console.log("--forward Left Leg Stepping...");
      if ( fLL.y > pos.y -3*rad) {
        fLL.y--;
      } else {
        fLLW = false;
        bodyMovingL = true;
      }
    }
    
  };

  p.moveBodyL=function() {
    
    if (bodyMovingL == true) {
      // console.log("Moving Body Again...");
      if (pos.y > bLL.y -3*rad) {
        pos.y--;

        p.reCalculateShoulderPositions();
      } else {
        bodyMovingL = false;
        bRLW = true;
      }
      
    }
  };
  // draw an arrow for a vector at a given base position
  p.drawArrow=function(base, vec, myColor) {

    p.push();
    p.stroke(myColor);
    p.strokeWeight(5);
    p.fill(myColor);
    p.translate(base.x, base.y);
    p.line(0, 0, vec.x, vec.y);
    p.rotate(vec.heading());
    let arrowSize = 7;
    p.translate(vec.mag() - arrowSize, 0);
    p.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    p.pop();
  };

  p.reCalculateShoulderPositions=function() {
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


  };

  p.drawCoordinateAxis=function() {
    p.push();
    p.translate(p.width / 2, p.height / 2);
    // Y dir
    p.drawArrow(
      p.createVector(0, 0),
      p.createVector(0, -p.height / 4),
      p.color(255, 0, 0)
    );
    p.text(`y`, 0, -p.height / 4);
    //

    //X Dir
    p.drawArrow(
      p.createVector(0, 0),
      p.createVector(p.width / 4, 0),
      p.color(0, 0, 255)
    );
    p.text(`x`, p.width / 4, 0);
    //
    p.pop();
  };

  /**
   *
   *
   */
  p.drawBot = function() {
    var s1, s2, s3, s4;
    p.strokeWeight(5);
    p.stroke(64);
    p.fill(120);

    //body
    p.square(pos.x, pos.y, 2 * rad);

    //legs
    p.fill(0);

    //fLL
    p.strokeWeight(5);
    p.stroke(64);
    p.line(fLS.x, fLS.y, fLL.x, fLL.y);

    p.strokeWeight(0);
    p.stroke(0);
    s1 = `x=${fLL.x},y=${fLL.y}`;
    p.text(s1, fLL.x, fLL.y);

    //fRL
    p.strokeWeight(5);
    p.stroke(64);
    p.line(fRS.x, fRS.y, fRL.x, fRL.y);

    p.strokeWeight(0);
    p.stroke(0);
    s2 = `x=${fRL.x},y=${fRL.y}`;
    p.text(s2, fRL.x, fRL.y);

    //bLL
    p.strokeWeight(5);
    p.stroke(64);
    p.line(bLS.x, bLS.y, bLL.x, bLL.y);

    p.strokeWeight(0);
    p.stroke(0);
    s3 = `x=${bLL.x},y=${bLL.y}`;
    p.text(s3, bLL.x, bLL.y);

    //bRL
    p.strokeWeight(5);
    p.stroke(64);
    p.line(bRS.x, bRS.y, bRL.x, bRL.y);

    p.strokeWeight(0);
    p.stroke(0);
    s4 = `x=${bRL.x},y=${bRL.y}`;
    p.text(s4, bRL.x, bRL.y);

    //shoulders get drawn OVERTOP of legs
    p.fill(120);
    p.circle(fLS.x, fLS.y, rad / 2);
    p.circle(fRS.x, fRS.y, rad / 2);
    p.circle(bLS.x, bLS.y, rad / 2);
    p.circle(bRS.x, bRS.y, rad / 2);


  };
};

let myp5 = new p5(s);