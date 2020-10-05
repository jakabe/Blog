import Ball from "./BallIM.js";

let ball;


new p5( 
    function(p5) 
    {
        p5.setup = function()
        {
            p5.createCanvas(400,400);
            ball = new ball( width /2 , height /2, 20);
        }
        p5.draw = function()
        {
            p5.background(255);
            ball.show( p5);
            ball.move( p5 );
        }
    }
);
