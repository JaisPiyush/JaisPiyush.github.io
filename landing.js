const canvas = document.getElementById("landing-canvas");

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


