var tree = [];
var flowers = [];
var branchNumber = 0;
var shrink, shake, intensity, grow = false,
    shed, gravity, flsize, grav, wind_dir, windcheck;

function setup() {
    createCanvas(600, 600);
    var root = new Branch(createVector(width / 2, height), createVector(width / 2, height - 100));
    tree[0] = root;
    shake = createCheckbox("Shaking", false);
    shake.position(100, 330);

    intensity = createSlider(0.1, 2, 0.5, 0);
    intensity.parent("shake");
    
    flsize = createSlider(5, 15, 7, 0);
    flsize.parent("flsize");
    
    shrink = createSlider(0.30, 1, 0.75, 0);
    shrink.parent("shrink");

    var sheds = createButton("SHED LEAVES");
    sheds.position(100, 400);
    sheds.mousePressed(shedFlowers);

    var grows = createButton("GROW LEAVES")
    grows.position(100, 370);
    grows.mousePressed(growFlowers);

    gravity = createVector(0, 0.3);
    grav = createCheckbox("Gravity ON/OFF", true);
    grav.position(100, 430);

    windcheck = createCheckbox("Wind ON/OFF", false);
    windcheck.position(100, 460);   

    wind_dir = createRadio();
    wind_dir.position(250, 460);
    wind_dir.option("Left");
    wind_dir.option("Right");
    wind_dir.value("Right");


}
var wind;

function draw() {
    
    background(51);
    fill(255);
    textSize(24);
    text("Number of branches = " + branchNumber, 15, 30);
    
    if(windcheck.checked()) {
        if(wind_dir.value() == "Left")
            wind = createVector(-0.2, 0);
        else if(wind_dir.value() == "Right")
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
            if(grav.checked()) {
                tree[i].flower.applyForce(gravity);
            }
            if(windcheck.checked())
                tree[i].flower.applyForce(wind);         
            if(!tree[i].flower.done)
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
