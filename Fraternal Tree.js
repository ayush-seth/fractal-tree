var tree = [];
var flowers = [];
var branchNumber = 0;
var shrink, shake, intensity, grow = false,
    shed, grav, flsize;

function setup() {
    createCanvas(600, 600);
    var root = new Branch(createVector(width / 2, height), createVector(width / 2, height - 100));
    tree[0] = root;
    shake = createCheckbox('Shaking (Use slider for intensity)\n\n', false);

    intensity = createSlider(0.1, 2, 0.5, 0);
    flsize = createSlider(5, 15, 10, 0);
    flsize.parent("flsize");
    shrink = createSlider(0.30, 1, 0.75, 0);
    shrink.parent("shrink");

    var sheds = createButton("SHED FLOWERS");
    sheds.position(100, 400);
    sheds.mousePressed(shedFlowers);

    var grows = createButton("GROW FLOWERS")
    grows.position(100, 370);
    grows.mousePressed(growFlowers);

    grav = createVector(0, 2);

}

function draw() {
    background(51);
    fill(255);
    textSize(24);
    text("Number of branches = " + branchNumber, 15, 30);
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
        if (shed && tree[i].flower && !tree[i].flower.done) {
            console.log("shed");
            tree[i].flower.shed();
            tree[i].flower.applyForce(grav);
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


function mousePressed() {

    if (mouseX < width && mouseY < height && mouseX > 0 && mouseY > 0) {
        for (var i = tree.length - 1; i >= 0; i--) {
            if (!tree[i].grown) {
                tree.push(tree[i].spawnA(shrink.value()));
                tree.push(tree[i].spawnB(shrink.value()));
                branchNumber += 2;
            }
            tree[i].grown = true;
        }
    }
}
