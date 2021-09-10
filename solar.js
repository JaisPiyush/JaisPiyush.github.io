const canvas = document.getElementById("that-is-it");

function createHiPPICanvas(w, h, canvas) {
  let ratio = window.devicePixelRatio;
  canvas.width = w * ratio;
  canvas.height = h * ratio;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  let ctx = canvas.getContext("2d");
  ctx.scale(ratio, ratio);
  return ctx;
}

const ctx = createHiPPICanvas(
  document.body.clientWidth,
  document.body.clientHeight,
  canvas
);

const PI = Math.PI;

const sin = Math.sin;
const cos = Math.cos;

function randomNumber(min, max) { 
    return Math.random() * (max - min) + min;
} 
function randomIntegerNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
}

function Universe() {
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.clientHeight);
  ctx.fillStyle = "#08090A";
  ctx.fill();
  ctx.restore();
}

function Stars({x, y, r, op}) {
  ctx.beginPath();
  ctx.save();
  ctx.arc(x, y, r, 0, 2 * PI);
  ctx.fillStyle = `rgba(255,255,255,${op})`;
  ctx.fill();
  ctx.restore();
}


function Sun(){
    ctx.save();
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 120, 0, 2*PI);
    const yellow = '#FFC23C';
    const orange = '#ff8114';
    var gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 80, (canvas.width/2 ), (canvas.height/2), 150);
    gradient.addColorStop(0,yellow);
    gradient.addColorStop(1,orange);
    // ctx.fillStyle = gradient;
    ctx.shadowColor = orange;
    ctx.shadowBlur = 30;
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.restore();
}


function FillUniverseWithStars(){
    const maxX = canvas.width;
    const maxY = canvas.height;
    const iters = randomIntegerNumber(13000, 6000);
    for(let i=0; i < iters; i++){
        Stars({
            x: randomNumber(0, maxX),
            y: randomNumber(0, maxY),
            r: randomNumber(0.1, 0.5),
            op: randomNumber(0,1)
        });
    }

}


function createUniverse() {
  Universe();
  FillUniverseWithStars();
  Sun();

}

createUniverse();
