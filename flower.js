class Flower {
    constructor(branch) {
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.pos = this.branch = branch;
        this.done = false;
        this.lifespan = 255;
        this.shape = "Circle";
    }
    draw() {
        var colour = document.getElementById("colour").jscolor.rgb;
        fill(colour[0], colour[1], colour[2], this.lifespan);
        noStroke();
        if (this.shape == "Circle") {
            ellipse(this.pos.x, this.pos.y, this.size, this.size);
        } 
        else if (this.shape == "Square") {
            rectMode(CENTER);
            rect(this.pos.x, this.pos.y, this.size, this.size);
        }
        else if (this.shape == "Wisp") {
            push();
                star(this.pos.x, this.pos.y, this.size/2, this.size, 8);
            pop();
        }
        else if (this.shape == "Triangle") {
            push();
                translate(this.pos.x, this.pos.y)
                triangle(0, -this.size, -this.size, this.size/2, this.size, this.size/2);
            pop();
        }
    }
    update() {
        this.pos.add(this.velocity);
        this.velocity.add(this.acceleration);

        this.acceleration.mult(0);
        if (this.done)
            this.lifespan -= 0.8;
    }
    shed() {
        this.applyForce(createVector(random(-1, 1), random(-1, -0.1)));
        this.update();
        this.draw();
        this.done = true;
        this.pos = this.branch.copy();
    }
    applyForce(force) {
        this.acceleration.add(force);
    }
}

function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}