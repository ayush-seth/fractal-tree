var tree = [];
var flowers = [];
var branchNumber = 0;
var shrink, shake, intensity, grow = false,
    shed, gravity, flsize, grav, wind_dir, windcheck;
var cnv;

function setup() {
    cnv = createCanvas(500, 500);
    var root = new Branch(createVector(width / 2, height), createVector(width / 2, height - 100));
    tree[0] = root;
    shake = createCheckbox("Shaking", false);
    shake.parent("shaking");
    //shake.position(windowWidth-470, 1000);

    intensity = createSlider(0.1, 2, 0.5, 0);
    intensity.parent("shake");
    cnv.parent("canvasParent");
    flsize = createSlider(5, 15, 7, 0);
    flsize.parent("flsize");

    shrink = createSlider(0.30, 1, 0.75, 0);
    shrink.parent("shrink");


    var grows = createButton("Grow leaves");
    grows.mousePressed(growFlowers);
    grows.parent("butHolder");

    var sheds = createButton("Shed Leaves");
    sheds.mousePressed(shedFlowers);
    sheds.parent("butHolder");

    var save = createButton("Save Tree as png");
    save.mousePressed(saveTree);
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

    cnv.mousePressed(branchIt);
}
var wind;

function draw() {

    background(51);
    fill(255);
    textSize(24);
    text("Number of branches = " + branchNumber, 15, 30);

    if (windcheck.checked()) {
        if (wind_dir.value() == "Left")
            wind = createVector(-0.2, 0);
        else if (wind_dir.value() == "Right")
            wind = createVector(0.2, 0);
    }
    for (var i = 0; i < tree.length; i++) {
        tree[i].show();
        if (tree[i].flower)
            tree[i].flower.size = flsize.value();
        if (shake.checked()) {
            tree[i].shake(intensity.value());
        }
        if (!tree[i].grown && grow && tree[i].flower) {
            tree[i].growFlower();
        }
        if (shed && tree[i].flower) {
            if (grav.checked()) {
                tree[i].flower.applyForce(gravity);
            }
            if (windcheck.checked())
                tree[i].flower.applyForce(wind);
            if (!tree[i].flower.done)
                tree[i].flower.shed();
        }
    }
}

function shedFlowers() {
    if (grow)
        shed = true;
    flowers.splice(0, flowers.length);
}

function growFlowers() {
    grow = true;
    for (var i = 0; i < tree.length; i++) {
        if (!tree[i].grown) {
            var flower = new Flower(tree[i]);
            flowers.push(flower);
            tree[i].setFlower(flower);
        }
    }
    shed = false;
}

function saveTree() {
    saveCanvas(cnv, "tree", "png");

}


function branchIt() {

    for (var i = tree.length - 1; i >= 0; i--) {
        if (!tree[i].grown) {
            tree.push(tree[i].spawnA(shrink.value()));
            tree.push(tree[i].spawnB(shrink.value()));
            branchNumber += 2;
        }
        tree[i].grown = true;
    }
}
