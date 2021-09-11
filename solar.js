var canvas, ctx;

const PI = Math.PI;
const sin = Math.sin;
const cos = Math.cos;

function CanvasFoundation() {
  this.canvas = null;
  this.ctx = null;
  this.baseX = 1920;
  this.baseY = 949;
  this.height = null;
  this.width = null;

  this.createHiPPICanvas = function (w, h) {
    let ratio = window.devicePixelRatio;
    this.canvas.width = w * ratio;
    this.canvas.height = h * ratio;
    this.canvas.style.width = w + "px";
    this.canvas.style.height = h + "px";
    this.width = w;
    this.height = h;
    let ctx = this.canvas.getContext("2d");
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    // ctx.scale(ratio, ratio);
    return ctx;
  };

  this.scale_x = function (x) {
    return x * (document.body.clientWidth / this.baseX);
  };
  this.scale_y = function (y) {
    return y * (document.body.clientHeight / this.baseY);
  };
  this.randomNumber = function (min, max) {
    return Math.random() * (max - min) + min;
  };
  this.randomIntegerNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  this.get = function () {
    return { ctx: this.ctx, canvas: this.canvas, engine: this };
  };

  this.test_points = function({x,y, color, stroke=true}){
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(x,y, 4, 0, 2*PI);
    if (stroke){
      this.ctx.strokeStyle = color;
      this.ctx.stroke();
    }else{
      this.ctx.fillStyle = color;
      this.ctx.fill();
    }
    this.ctx.restore();
  }

  this.createUniverse = null;

  this.init = function () {
    this.canvas = document.getElementById("that-is-it");
    this.ctx = this.createHiPPICanvas(
      document.body.clientWidth,
      document.body.clientHeight
    );
    this.createUniverse(ctx);
    let self = this;
    window.addEventListener("resize", function () {
      // console.log(self.canvas.style.width, document.body.clientWidth);
      self.ctx = self.createHiPPICanvas(
        document.body.clientWidth,
        document.body.clientHeight
      );
      // console.log("Resize", document.body.clientWidth, self.engine.widt, window.devicePixelRatio, document.body.clientWidth * window.devicePixelRatio);
      self.createUniverse(ctx);
    });
  };
}

function Universe({ ctx, canvas, engine }) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, engine.width, engine.height);
  ctx.fillStyle = "#08090A";
  ctx.fill();
  ctx.restore();
}

function Stars({ ctx, x, y, r, op }) {
  ctx.beginPath();
  ctx.save();
  ctx.arc(x, y, r, 0, 2 * PI);
  ctx.fillStyle = `rgba(255,255,255,${op})`;
  ctx.fill();
  ctx.restore();
}

function Sun({ ctx, canvas, engine }) {
  ctx.save();
  ctx.beginPath();
  let c_x = engine.width / 2;
  let c_y = engine.height / 2;
  let radius = engine.scale_x(140);
  ctx.arc(c_x, c_y, radius, 0, 2 * PI);
  const yellow = "#FFC23C";
  // const paleOrangeI = "#fa7605";
  const orange = "#fc8e30"; // "#ff9f4d";
  var gradient = ctx.createRadialGradient(
    engine.width / 2 - engine.scale_x(4),
    engine.height / 2 - engine.scale_y(6),
    engine.scale_x(125),
    engine.width / 2,
    engine.height / 2,
    engine.scale_x(150)
  );
  // console.log(`Suns coord (${engine.width / 2}, ${engine.height / 2})`);
  gradient.addColorStop(0, yellow);
  // gradient.addColorStop(0.4, paleOrangeI)
  gradient.addColorStop(0.5, orange);
  // ctx.fillStyle = gradient;
  ctx.shadowColor = orange;
  ctx.shadowBlur = engine.scale_x(60);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.restore();
  return { c_x, c_y, radius };
}

function FillUniverseWithStars({ ctx, canvas, engine }) {
  const maxX = engine.width;
  const maxY = engine.height;
  const iters = engine.randomIntegerNumber(
    engine.scale_x(13000),
    engine.scale_y(6000)
  );
  for (let i = 0; i < iters; i++) {
    Stars({
      ctx: ctx,
      x: engine.randomNumber(0, maxX),
      y: engine.randomNumber(0, maxY),
      r: engine.randomNumber(0.1, 0.5),
      op: engine.randomNumber(0, 1),
    });
  }
}

function CreateOrbit({
  center_x,
  center_y,
  sun_radius,
  radius_x,
  e,
  color = "rgba(255, 255, 255, 0.2)",
}) {

  
  this.activeColor = "rgb(255,255,255)";
  this.inActiveColor = "rgba(255, 255, 255, 0.2)";
  this.color = this.inActiveColor;
  this.center_x = center_x;
  this.center_y = center_y,
  this.sun_radius = sun_radius;
  this.radius_x = radius_x;
  this.e = e;


  this.getInteractionPoint = function(){
    let denom = Math.pow(this.radius_x,2) - Math.pow(this.radius_x/e, 2);
    let x_i = this.radius_x * Math.sqrt((Math.pow(this.sun_radius, 2) - Math.pow(this.radius_x/e, 2))/ denom);
    let y_i = (this.radius_x/e) * Math.sqrt((Math.pow(this.radius_x,2) - Math.pow(this.sun_radius,2))/denom);
    return [[this.center_x - x_i, this.center_y - y_i], [this.center_x + x_i, this.center_y -  y_i], [this.center_x - x_i, this.center_y + y_i], [this.center_x + x_i, this.center_y + y_i]]
  }

  this.orbitUsingBezierCurve = function({xm, ym, radius_x, radius_y,interaction_points}){
    let theta_0 = Math.atan(e*(ym - interaction_points[0][1])/ (xm - interaction_points[0][0]));
    let start_angle = PI + theta_0; 
    let end_angle = -theta_0;
    
    if(isNaN(theta_0)){
      start_angle = 0;
      end_angle = 2 *PI;
    }
    this.ctx.save();
    this.ctx.beginPath();;

    this.ctx.ellipse(center_x, center_y,radius_x,radius_y,0, start_angle, end_angle, true);
    this.ctx.strokeStyle =  this.color;
    this.ctx.stroke();
    this.ctx.restore();
  }

  this.draw = function({ctx, canvas, engine}){
    this.ctx = ctx;
    this.engine = engine;
    let interaction_points = this.getInteractionPoint();
    this.ctx.restore();
    this.orbitUsingBezierCurve({
      xm: this.center_x, ym: this.center_y, radius_x: this.radius_x, radius_y: this.radius_x /this.e, interaction_points: interaction_points
    });
  }
  
}


function Planet({radius, radius_x, e, speed, isSaturn=false}){
  this.radius = radius;
  this.radius_x = radius_x
}

let foundation = new CanvasFoundation();

foundation.createUniverse = function () {
  let data = foundation.get();
  Universe(data);
  FillUniverseWithStars(data);
  let sun_conf = Sun(data);
  // console.log(sun_conf);
  let mercuryOrbit = new CreateOrbit({
    sun_radius: sun_conf.radius,
    center_x: sun_conf.c_x,
    center_y: sun_conf.c_y,
    radius_x: foundation.scale_x(660),
    e: (180/46)
  });
  mercuryOrbit.draw(data);
};

foundation.init();
