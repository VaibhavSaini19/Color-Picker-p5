let radius = 300;
let opacity = 0.25;

let colorDiv, colorBox, colorVal;

function setup(){
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    colorCode = select('.colorCode');
    colorBox = select('.colorBox');
    drawColorsMain();
}


function draw(){
    // drawColors();    
}

function mouseMoved(){
    background(255);
    let angle = Math.round(atan2(mouseY - height / 2, mouseX - width / 2))+90;
    if (angle < 0) angle = 360+angle;
    // background(color(angle, 100, 100));

    drawColorsBg(angle);
    drawColorsMain();

    stroke(255);
    strokeWeight(4);
    noFill();
    rotate(angle-180);
    circle(0, radius-20, 40);
    
    colorVal = HSVtoRGB(angle/360, 1, 1);
    colorCode.html('R: '+colorVal.r + ' G: '+colorVal.g + ' B: '+colorVal.b);
    colorBox.style('background-color', color(angle, 100, 100));
}


function drawColorsMain(){
    translate(width/2, height/2);
    noStroke();
    let hu=0;
    for(let i=0; i<360; i++){
        push();
        angleMode(DEGREES);
        rotate(i);
        fill(hu, 100, 100);
        hu += 1;
        rect(-5, -radius, 10, 40);
        pop();
    }
    fill(0, 0, 100);
    circle(0, 0, radius*2-80);
}

function drawColorsBg(angle){
    let hueStart = angle;
                
    push();
    noStroke();
    translate(width/2, height/2);
    rotate(-angle);
    for(let j=0; j<4; j++){
        push();
        rotate(j*90);
        fill((hueStart+j*120)%360, 100, 100, opacity);
        translate(25, 25);
        // translate(30, 30);
        circle(0, 0, radius*2);
        pop();
    }
    pop();
}

function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}