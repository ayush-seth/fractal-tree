class Branch
{
    constructor(start, end)
    {
        this.start = start;
        this.end = end;
        this.grown = false;
        this.flower = null;
        this.thickness = 2.5;
    }
    setFlower(flower)
    {
        this.flower = flower;
    }
    show()
    {
        stroke(255);
        strokeWeight(this.thickness);
        line(this.start.x, this.start.y, this.end.x, this.end.y);
    }
    spawnA(size, angle)
    {
        var dir = p5.Vector.sub(this.end, this.start);
        dir.mult(size);
        dir.rotate(angle);

        var newEnd = p5.Vector.add(dir, this.end);
        var right = new Branch(this.end, newEnd);
        return right;
    }
    spawnB(size, angle)
    {
        var dir = p5.Vector.sub(this.end, this.start);
        dir.mult(size);
        dir.rotate(-angle);

        var newEnd = p5.Vector.add(dir, this.end);
        var left = new Branch(this.end, newEnd);
        return left;
    }
    growFlower()
    {
        this.flower.draw();
        this.flower.update();
    }
    shake(intensity)
    {
        this.end.x = constrain(this.end.x + random(-intensity, intensity), this.end.x - 2, this.end.x + 2);
        this.end.y = constrain(this.end.y + random(-intensity, intensity), this.end.y - 2, this.end.y + 2);
    }
}
