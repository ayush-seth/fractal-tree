var tree = [];
var flowers = [];
var branchNumber = 0;
var shrink, shake, intensity, grow = false,
    shed, gravity, flsize, grav, wind_dir, windcheck, angleBox, angle, shape;
var cnv;

function setup() {
    cnv = createCanvas(500, 500);
    angle = PI / 4;

    var root = new Branch(createVector(width / 2, height), createVector(width / 2, height - 100));
    root.thickness = 2.5;
    tree[0] = root;

    shape = createRadio();
    shape.option("Circle");
    shape.option("Square");
    shape.option("Wisp");
    shape.option("Triangle");
    shape.value("Circle");
    shape.parent("shape");

    shake = createCheckbox("Shaking", false);
    shake.parent("shaking");

    intensity = createSlider(0.1, 2, 0.5, 0);
    intensity.parent("shake");

    cnv.parent("canvasParent");

    flsize = createSlider(5, 15, 5, 0);
    flsize.parent("flsize");

    shrink = createSlider(0.30, 1, 0.75, 0);
    shrink.parent("shrink");

    var grows = createButton("Grow leaves");
    grows.mouseClicked(growFlowers);
    grows.parent("butHolder");

    var sheds = createButton("Shed Leaves");
    sheds.mouseClicked(shedFlowers);
    sheds.parent("butHolder");

    var save = createButton("Save Tree as png");
    save.mouseClicked(saveTree);
    save.parent("butHolder");

    gravity = createVector(0, 0.3);
    grav = createCheckbox("Gravity", true);
    grav.parent("gravity");

    windcheck = createCheckbox("Wind", false);
    windcheck.parent("wind");

    wind_dir = createRadio();
    wind_dir.option("Left");
    wind_dir.option("Right");
    wind_dir.value("Right");
    wind_dir.parent("wind");

    angleBox = createInput();
    angleBox.input(
        function() {
            angle = radians(angleBox.value());
        }
    )
    angleBox.parent("butHolder")
    angleBox.elt.placeholder = "Branch angle";

    cnv.mouseClicked(branchIt);
}
var wind;

function draw() {

    background(51);

    push();
    fill(255);
    textSize(20);
    strokeWeight(0);
    text("Number of branches = " + branchNumber, 15, 30);
    pop();

    if (windcheck.checked()) {
        if (wind_dir.value() == "Left")
            wind = createVector(-0.2, 0);
        else if (wind_dir.value() == "Right")
            wind = createVector(0.2, 0);
    }

    if (shape.value() == "Square") {
        flowers.forEach(function(flower) {
            flower.shape = "Square";
        });
    } 
    else if (shape.value() == "Wisp") {
        flowers.forEach(function(flower) {
            flower.shape = "Wisp";
        });
    } 
    else if (shape.value() == "Triangle") {
        flowers.forEach(function(flower) {
            flower.shape = "Triangle";
        });
    }
    else {
        flowers.forEach(function(flower) {
            flower.shape = "Circle";
        });
    }


    tree.forEach(function(branch) {
        branch.show();
        if (branch.flower)
            branch.flower.size = flsize.value();
        if (shake.checked()) {
            branch.shake(intensity.value());
        }
        if (!branch.grown && grow && branch.flower) {
            branch.growFlower();
        }
        if (shed && branch.flower) {
            if (grav.checked()) {
                branch.flower.applyForce(gravity);
            }
            if (windcheck.checked())
                branch.flower.applyForce(wind);
            if (!branch.flower.done)
                branch.flower.shed();
        }
    });
}

function shedFlowers() {
    if (grow)
        shed = true;
    flowers.splice(0, flowers.length);
}

function growFlowers() {
    grow = true;
    tree.forEach(function(branch) {
        if (!branch.grown) {
            var flower = new Flower(branch.end);
            flowers.push(flower);
            branch.setFlower(flower);
        }
    });
    shed = false;
}

function saveTree() {
    saveCanvas(cnv, "tree", "png");

}

var thickness = 2.5;

function branchIt() {
    for (var i = tree.length - 1; i >= 0; i--) {
        var branch = tree[i];
        if (!branch.grown) {
            var a = branch.spawnA(shrink.value(), angle);
            var b = branch.spawnB(shrink.value(), angle);

            a.thickness = thickness - 0.25;
            b.thickness = thickness - 0.25;

            tree.push(a);
            tree.push(b);
            branchNumber += 2;
        }
        tree[i].grown = true;
    }
    if (thickness != 0)
        thickness -= 0.25;

    if (grow && !shed) growFlowers();
}
