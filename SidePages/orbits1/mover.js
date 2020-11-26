
class mover{
    constructor(x,y){
        if(x==null|| y==null){
            this.location = createVector(width/2, height/2);
        } else {
            this.location = createVector(x,y);
        }
        this.velocity = createVector(1,0);
        this.acceleration = createVector(0,0);

        this.mass = 20;
        // this.G = 1;
        // this.dragOffset = createVector(0,0);
        console.log("mover created");
    }

    display(){
        ellipseMode(CENTER);
        strokeWeight(4);
        stroke(255);
        ellipse(this.location.x,this.location.y,20,20);
    }

    update(){
        //calculate acceleration

        //update velocity
        this.velocity.add(this.acceleration);
        //this.velocity.limit(2);
        //update position
        this.location.add(this.velocity);
    }

    applyForce(f){
        f=f.div(this.mass);// A = F/ M
        this.acceleration.add(f); //acceleration is cummulative
    }
}

