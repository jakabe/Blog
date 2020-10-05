let ball;

function setup()
{
    createCanvas(400,400);
    ball = new ball( width /2 , height /2, 20);
}

function draw()
{
    background(255);
    ball.show();
    ball.move();
}