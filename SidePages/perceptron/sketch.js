//stop thinking after we get the answer
let thinking = true;


//debug mode for showing data points
let debug = true;
//we want some points to test the perceptron with
let training = new Array(2000);

//we need a perceptron object boi
let ptron;

//we need to train the perceptron with a point
let count = 0;

//we need a space to work with
let x_min = -1;
let y_min = -1;
let x_max = 1;
let y_max = 1;

//coefficients for eq
let m = 0.3;
let b = 0.4;
//we need some function to describe a line
function f(x) {
  let y = m * x + b;
  return y;
}

function debugOnOff(){
  if(debug === true){
   debug = false;  
  } else {
    debug = true;
  }
}

function setup() {
  var canvas = createCanvas(400, 400);
 
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');
  document.getElementById("results").innerHTML = "Thinking...";
  //the perceptron that we will use in this sketch will have 3 inputs
  //x, y, and the bias
  ptron = new Perceptron(3, 0.001); //

  //creat a random set of points to train with
  //then we calculate a known answer

  for (let i = 0; i < training.length; i++) {
    let x = random(x_min, x_max);
    let y = random(y_min, y_max);
    let answer = 1;
    if (y < f(x)) answer = -1;
    training[i] = {
      input: [x, y, 1],
      output: answer
    };
  }
}

function draw() {
  if (thinking === true) {
    background(0);
    //we need to draw the line
    strokeWeight(1);
    stroke(255, 0, 0);
    let x1 = map(x_min, x_min, x_max, 0, width);
    let y1 = map(f(x_min), y_min, y_max, height, 0);
    let x2 = map(x_max, x_min, x_max, 0, width);
    let y2 = map(f(x_max), y_min, y_max, height, 0);
    line(x1, y1, x2, y2);

    //draw the line based on the current weights
    //the formular is w_0 * x + w_1 * y + w_2 = 0 
    stroke(0, 0, 255);
    strokeWeight(2);
    let weights = ptron.getWeights();
    x1 = x_min;
    y1 = (-weights[2] - weights[0] * x1) / weights[1];
    x2 = x_max;
    y2 = (-weights[2] - weights[0] * x2) / weights[1];

    x1 = map(x1, x_min, x_max, 0, width);
    y1 = map(y1, y_min, y_max, height, 0);
    x2 = map(x2, x_min, x_max, 0, width);
    y2 = map(y2, y_min, y_max, height, 0);
    line(x1, y1, x2, y2);

    let slope = -(y2-y1)/(x2-x1);
    
    
    
    //now we train the perceptron with one point at a time
    ptron.train(training[count].input, training[count].output);
    count = (count + 1) % training.length;
    if(debug === true ){
        //draw all the points based on the guesses
        for (let i = 0; i < count; i++) {
          stroke(124);
          strokeWeight(1);
          fill(255);

          let guess = ptron.feedforward(training[i].input);
          if (guess > 0) noFill();

          let x = map(training[i].input[0], x_min, x_max, 0, width);
          let y = map(training[i].input[1], y_min, y_max, height, 0);
          ellipse(x, y, 5, 5);
        }
    }
    
    
    //check if slope is within tolerance
    if ( abs( slope - m) < 0.001 ){
      let intercept = ( (y2-y1) - slope * (x2-x1) )/width;
      console.log("Slope Found withing 0.001 tolerance: "+slope+", m = "+m+" , delta(m) = "+abs( slope - m));
      console.log("x1 = "+x1+", y1 = "+y1);
      console.log("x2 = "+x2+", y2 = "+y2);
      console.log("Rise = "+(y2 - y1));
      console.log("Run = "+ (x2 - x1));
      console.log("Intercept = "+intercept+", b = "+b+" , delta(b) = "+abs( intercept - b) );
      thinking = false; 
      document.getElementById("results").innerHTML = "<p>Slope Found withing 0.001 tolerance: "+slope+", m = "+m+" , delta(m) = "+abs( slope - m)+"</p>\n\r"+
        "<p>x1 = "+x1+", y1 = "+y1+"x2 = "+x2+", y2 = "+y2+"</p>\n\r"+
        "<p>Rise = "+(y2 - y1)+"</p>\n\r"+
        "<p>Run = "+ (x2 - x1)+"</p>\n\r"+
        "<p>Intercept = "+intercept+", b = "+b+" , delta(b) = "+abs( intercept - b);
    }
    
    
  }
}