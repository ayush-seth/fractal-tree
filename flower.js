function Flower(branch) {

    this.size = 10;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.pos = branch.end.copy();
    this.done = false;
    this.lifespan = 255;

    this.draw = function() {
        fill(255, 0, 110, this.lifespan);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
    this.update = function() {
        if (!this.done)
            this.pos = branch.end.copy();

        this.pos.add(this.velocity);
        this.velocity.add(this.acceleration);

        this.acceleration.mult(0);
        if (this.done)
            this.lifespan-- ;
    }
    this.shed = function() {
        this.applyForce(createVector(random(-1, 1), random(-3,-2)));
        this.update();
        this.draw();
        this.done = true;
    }
    this.applyForce = function(force) {
        this.acceleration.add(force);
    }
}
