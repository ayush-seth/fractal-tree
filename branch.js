function Branch(start, end)
{
    this.start = start;
    this.end = end;
    this.grown = false;
    this.flower = null;
    Branch.prototype.shake = function (intensity)
    {

        this.end.x = constrain(this.end.x + random(-intensity, intensity), this.end.x - 2, this.end.x + 2);
        this.end.y = constrain(this.end.y + random(-intensity, intensity), this.end.y - 2, this.end.y + 2);
    }

    Branch.prototype.setFlower = function (flower)
    {
        this.flower = flower;
    }

    Branch.prototype.show = function ()
    {

        stroke(255);
        line(this.start.x, this.start.y, this.end.x, this.end.y);
    }
    Branch.prototype.spawnA = function (size)
    {

        var dir = p5.Vector.sub(this.end, this.start);
        dir.mult(size);
        dir.rotate(PI / 4);

        var newEnd = p5.Vector.add(dir, this.end);
        var right = new Branch(this.end, newEnd);
        return right;
    }
    Branch.prototype.spawnB = function (size)
    {

        var dir = p5.Vector.sub(this.end, this.start);
        dir.mult(size);
        dir.rotate(-PI / 4);

        var newEnd = p5.Vector.add(dir, this.end);
        var left = new Branch(this.end, newEnd);
        return left;
    }

    Branch.prototype.growFlower = function ()
    {

        this.flower.draw();
        this.flower.update();
    }


}
