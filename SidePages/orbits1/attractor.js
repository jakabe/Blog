
class attractor{
    constructor(x,y){
        if(x==null|| y==null){
            this.location = createVector(100,100);
        } else {
            this.location = createVector(x,y);
        }
        this.velocity=0.0;
        this.acceleration=0.0;
        this.mass = 20.0;
        //"realism"
        //this.mass = 5.97*Math.pow(10,24);
        //this.G = 6.67*Math.pow(10,-11);
        this.G = 0.4;
        //this.dragOffset = createVector(0,0);
        console.log("attractor creater");
        console.log(this.location);
    }


    display(){
        ellipseMode(CENTER);
        strokeWeight(4);
        stroke(255);
        //console.log("drawing attractor at...");
        //console.log(this.location.x);
        //console.log(this.location.y)
        ellipse(this.location.x,this.location.y,50,50);
        
    }

    attract(mover){
        //dir of force
        let force = this.location.copy();//sub(mover.location);
        force = force.sub(mover.location);
        let mag = force.mag();
        mag = constrain(mag,5.0,25.0);
        force.normalize();
    
        //magnitude
        let strength = ( this.G * this.mass *mover.mass) / (mag*mag);
        //console.log(strength);
        //dir*mag
        force.mult(strength);
        //console.log(force);    
        return force;
    }



}


