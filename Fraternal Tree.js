var tree = [];
var branchNumber = 0;
var shrink, shake, flowers, intensity;

function setup() {
    createCanvas(400, 400);
    var root = new Branch(createVector(width / 2, height), createVector(width / 2, height - 100));
    shake = createCheckbox('Shaking (Use slider for intensity)', false);
    shake.position(450, 300);
    intensity = createSlider(0.1, 2, 0.5, 0);
    intensity.position(450, 330);
    shrink = createSlider(0.30, 1, 0.75, 0);
    shrink.parent("shrink");
    flowers = createCheckbox("Flowers", false);
    flowers.position(450, 360);
    tree[0] = root;
}

function draw() {
    background(51);
    fill(255);
    textSize(24);
    text("Number of branches = " + branchNumber, 15, 30);
    for (var i = 0; i < tree.length; i++) {
        tree[i].show();
        if (shake.checked()) {
            tree[i].shake(intensity.value());
        }
        if (flowers.checked() && !tree[i].grown) {
            tree[i].growFlower();
        }
    }
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
