let s;
let w;
let h;
const r = 0.7;

function setup() {
    createCanvas(windowWidth, windowHeight);
    w = width;
    h = height;

    s = min(w, h);
    textFont("Times New Roman");
    textStyle(BOLD);

    if (localStorage.getItem("displayDate") === null) {
        localStorage.setItem("displayDate", "1");
    }
    if (localStorage.getItem("displayTime") === null) {
        localStorage.setItem("displayTime", "1");
    }

}


function pad(t) {
    if (t < 10) {
        return "0" + t;
    }
    return "" + t;
}

function draw() {
    displayDate = localStorage.getItem("displayDate") == "1";
    displayTime = localStorage.getItem("displayTime") == "1";

    const date = new Date();

    textSize(s / 24);
    background(0);

    fill(255);
    if (displayDate) {
        textAlign(LEFT, TOP);
        text(date.toLocaleDateString("HU-hu"), 20, 20);
    }
    if (displayTime) {
        textAlign(RIGHT, TOP);
        text(`${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`, width - 20, 20);
    }

    translate(w / 2, h / 2);
    noFill();
    stroke(255);
    strokeWeight(3);
    //circle(0,0, r*s);

    textAlign(CENTER, CENTER);

    for (let i = 1; i <= 12; i++) {
        let szog = i * TWO_PI / 12 - HALF_PI;
        let pos = createVector(cos(szog), sin(szog)).mult(r * s / 2);

        fill(255);
        circle(pos.x, pos.y, s / 50)

        noStroke();
        fill(255, 0, 0);

        let szamPos = pos.copy().mult(1.15);
        fill(255, 255, 0);
        text(i, szamPos.x, szamPos.y);
    }

    strokeWeight(2);
    for (let i = 1; i <= 60; i++) {
        let szog = i / 60 * TWO_PI - HALF_PI;

        let pos = createVector(cos(szog), sin(szog)).mult(r * s / 2);
        let pos1 = pos.copy().mult(1 / 1.01)
        let pos2 = pos.copy().mult(1.01);

        stroke(255);
        line(pos1.x, pos1.y, pos2.x, pos2.y);
    }

    drawMutato(date.getHours(), date.getMinutes(), date.getSeconds());
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    w = width;
    h = height;

    s = min(w, h);
}


document.addEventListener("contextmenu", e => {
    e.preventDefault();
    alert("F11 - teljes képernyő\nCtrl + D - dátum megjelenítése/elrejtése\nCtrl + I - idő megjelenítése/elrejtése\n\nAz eredeti, asztali verzió letölthető a https://download.szolda.hu/index_.html oldalról.\nForráskód: https://github.com/tothambrus11/siclo");
    return false;
});

function drawMutato(ora, perc, masodperc) {
    stroke(255);
    strokeWeight(8);
    const oraSzog = (ora % 12) * TWO_PI / 12 - HALF_PI;
    const posOra = createVector(cos(oraSzog), sin(oraSzog)).mult(r * s / 2 * 0.5);
    const posOra2 = createVector(cos(oraSzog), sin(oraSzog)).mult(-r * s / 2 * 0.13);
    line(posOra2.x, posOra2.y, posOra.x, posOra.y);

    strokeWeight(6);
    const percSzog = perc * TWO_PI / 60 - HALF_PI
    const posPerc = createVector(cos(percSzog), sin(percSzog)).mult(r * s / 2 * 0.7);
    const posPerc2 = createVector(cos(percSzog), sin(percSzog)).mult(-r * s / 2 * 0.15);
    line(posPerc2.x, posPerc2.y, posPerc.x, posPerc.y);

    strokeWeight(3);
    stroke(255, 255, 0);
    const mpszog = masodperc / 60 * TWO_PI - HALF_PI;
    const mppos = createVector(cos(mpszog), sin(mpszog)).mult(r * s / 2 * 0.7);
    const mppos2 = createVector(cos(mpszog), sin(mpszog)).mult(-r * s / 2 * 0.22);
    line(mppos2.x, mppos2.y, mppos.x, mppos.y);

    fill(140);
    noStroke();
    circle(0, 0, s * 0.03);


}


document.onkeydown = keyDownEvent;
document.onkeyup = keyUpEvent;

let isCtrl = false;

function keyDownEvent() {
    var keyid = event.keyCode;

    if (keyid == 17) {
        isCtrl = true;
    }
    const key = String(event.key).toLowerCase();

    if (key == "d" || key == "i") {
        event.preventDefault();
    }
}

function keyUpEvent() {
    var keyid = event.keyCode;

    if (keyid == 17) {
        isCtrl = false;
    }
    const key = String(event.key).toLowerCase();

    if (isCtrl) {
        if (key == 'd') {
            setState("displayDate", !displayDate);
            event.preventDefault();
        } else if (key == 'i') {
            setState("displayTime", !displayTime);
            event.preventDefault();
        }
    }
}

let displayDate = true;
let displayTime = true;

function setState(key, bool) {
    localStorage.setItem(key, bool ? "1" : "0");
}



window.addEventListener('load', () => {
    registerSW();
});

// Register the Service Worker 
async function registerSW() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator
                .serviceWorker
                .register('serviceworker.js');
        } catch (e) {
            console.log('SW registration failed');
        }
    }
}