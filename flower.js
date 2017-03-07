class Flower
{
    constructor(branch)
    {
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.pos = this.branch = branch;
        this.done = false;
        this.lifespan = 255;
    }
    draw()
    {
        var colour = document.getElementById("colour").jscolor.rgb;
        fill(colour[0], colour[1], colour[2], this.lifespan);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
    update()
    {
        this.pos.add(this.velocity);
        this.velocity.add(this.acceleration);

        this.acceleration.mult(0);
        if (this.done)
            this.lifespan -= 0.8;
    }
    shed()
    {
        this.applyForce(createVector(random(-1, 1), random(-1, -0.1)));
        this.update();
        this.draw();
        this.done = true;
        this.pos = this.branch.copy();
    }
    applyForce(force)
    {
        this.acceleration.add(force);
    }
}
