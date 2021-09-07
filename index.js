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

class DrawElement {
  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
  }

  load() {
    return this;
  }

  drawTestPoint(x, y, color = "red") {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 4, 0, 2 * PI);
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  draw() {}

  animate() {}
}

class HeadElement extends DrawElement {


  draw() {
    // this.ctx.beginPath();
  }
}

class ChildElement extends DrawElement {

  load(){
      let head = new HeadElement(this.ctx, this.canvas).load();
      return this;
  }
  draw({ upper_y, lower_y }) {
      this.head.draw();
  }
}

class RoadElement extends DrawElement {
  draw(fc = 200, strokeStyle = "black") {
    this.ctx.beginPath();
    let y = this.canvas.height - fc;
    this.ctx.moveTo(0, y);
    this.ctx.lineTo(window.innerWidth, y);
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.stroke();
    return y;
  }
}

class FrameElement extends DrawElement {
  load() {
    this.lower_road = new RoadElement(this.ctx, this.canvas).load();
    this.upper_road = new RoadElement(this.ctx, this.canvas).load();
    this.child = new ChildElement(this.ctx, this.canvas).load();
    return this;
  }

  draw() {
    let road_y = this.lower_road.draw();
    // Upper line
    let road_y_up = this.upper_road.draw(450, "blue");
    this.child.draw({ upper_y: road_y_up, lower_y: road_y });
  }
}

let el = new FrameElement(ctx, canvas).load();
// el.load();
el.draw();
