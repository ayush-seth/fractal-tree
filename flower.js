function Flower(branch)
{

    this.size = 10;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.pos = branch.end.copy();
    this.done = false;
    this.lifespan = 255;

    Flower.prototype.draw = function ()
    {

        var colour = document.getElementById("colour").jscolor.rgb;
        fill(colour[0], colour[1], colour[2], this.lifespan);
        // fill(document.getElementById("colour").jscolor.toHEXString(),,,this.lifespan);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
    Flower.prototype.update = function ()
    {
        if (!this.done)
            this.pos = branch.end.copy();

        this.pos.add(this.velocity);
        this.velocity.add(this.acceleration);

        this.acceleration.mult(0);
        if (this.done)
            this.lifespan -= 0.8;
    }
    Flower.prototype.shed = function ()
    {
        this.applyForce(createVector(random(-1, 1), random(-1, -0.1)));
        this.update();
        this.draw();
        this.done = true;
    }
    Flower.prototype.applyForce = function (force)
    {
        this.acceleration.add(force);
    }
}
