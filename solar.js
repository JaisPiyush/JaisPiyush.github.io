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

  this.test_points = function ({ x, y, color, stroke = true }) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(x, y, 4, 0, 2 * PI);
    if (stroke) {
      this.ctx.strokeStyle = color;
      this.ctx.stroke();
    } else {
      this.ctx.fillStyle = color;
      this.ctx.fill();
    }
    this.ctx.restore();
  };

  this.createUniverse = null;
  this.drawUniverse = null;
  this.animateUniverse = null;

  this.executeAnimation = function (interval) {
    let self = this;
    if (interval !== undefined) {
      setInterval(() => {
        self.animateUniverse(self);
      }, interval);
    } else {
      self.animateUniverse(self);
    }
  };

  this.init = function (interval) {
    // console.log(interval);
    this.canvas = document.getElementById("that-is-it");
    this.ctx = this.createHiPPICanvas(
      document.body.clientWidth,
      document.body.clientHeight
    );
    this.createUniverse();
    this.executeAnimation(interval);
    let self = this;
    window.addEventListener("resize", function () {
      // console.log(self.canvas.style.width, document.body.clientWidth);
      self.ctx = self.createHiPPICanvas(
        document.body.clientWidth,
        document.body.clientHeight
      );
      // console.log("Resize", document.body.clientWidth, self.engine.widths, window.devicePixelRatio, document.body.clientWidth * window.devicePixelRatio);
      self.createUniverse();
      self.executeAnimation(interval);
    });
  };
}

function Sun(engine) {
  this.c_x = engine.width / 2;
  this.c_y = engine.height / 2;
  this.radius = engine.scale_x(140);

  this.get_conf = function () {
    return { c_x: this.c_x, c_y: this.c_y, radius: this.radius };
  };

  this.draw = function ({ ctx, canvas, engine }) {
    ctx.save();
    ctx.beginPath();

    ctx.arc(this.c_x, this.c_y, this.radius, 0, 2 * PI);
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
    return { c_x: this.c_x, c_y: this.c_y, radius: this.radius };
  };

  this.update = function ({ ctx, canvas, engine }) {
    return this.draw({ ctx, canvas, engine });
  };
}






function CreateOrbit({ center_x, center_y, sun_radius, radius_x, e }) {
  this.activeColor = "rgb(255,255,255)";
  this.inActiveColor = "rgba(255, 255, 255, 0.4)";
  this.color = this.inActiveColor;
  this.center_x = center_x;
  (this.center_y = center_y), (this.sun_radius = sun_radius);
  this.radius_x = radius_x;
  this.e = e;
  this.orbit_interaction_theta = 0

  this.getInteractionPoint = function () {
    let denom = Math.pow(this.radius_x, 2) - Math.pow(this.radius_x / e, 2);
    let x_i =
      this.radius_x *
      Math.sqrt(
        (Math.pow(this.sun_radius, 2) - Math.pow(this.radius_x / e, 2)) / denom
      );
    let y_i =
      (this.radius_x / e) *
      Math.sqrt(
        (Math.pow(this.radius_x, 2) - Math.pow(this.sun_radius, 2)) / denom
      );
    return [
      [this.center_x - x_i, this.center_y - y_i],
      [this.center_x + x_i, this.center_y - y_i],
      [this.center_x - x_i, this.center_y + y_i],
      [this.center_x + x_i, this.center_y + y_i],
    ];
  };

  this.orbitUsingEllipse = function ({
    xm,
    ym,
    radius_x,
    radius_y,
    interaction_points,
  }) {
    let theta_0 = Math.atan(
      (e * (ym - interaction_points[0][1])) / (xm - interaction_points[0][0])
    );
    let start_angle = PI + theta_0;
    let end_angle = -theta_0;

    if (isNaN(theta_0)) {
      start_angle = 0;
      end_angle = 2 * PI;
    }
    this.ctx.save();
    this.ctx.beginPath();

    this.ctx.ellipse(
      center_x,
      center_y,
      radius_x,
      radius_y,
      0,
      start_angle,
      end_angle,
      true
    );
    this.ctx.strokeStyle = this.color;
    this.orbit_interaction_theta = theta_0;
    this.ctx.stroke();
    this.ctx.restore();
  };

  this.draw = function ({ ctx, canvas, engine }) {
    this.ctx = ctx;
    this.engine = engine;
    let interaction_points = this.getInteractionPoint();
    this.ctx.restore();
    this.orbitUsingEllipse({
      xm: this.center_x,
      ym: this.center_y,
      radius_x: this.radius_x,
      radius_y: this.radius_x / this.e,
      interaction_points: interaction_points,
    });
  };

  this.update = function ({ ctx, canvas, engine, isActive = false }) {
    this.color = isActive ? this.activeColor : this.inActiveColor;
    this.draw({ ctx, canvas, engine });
  };
}



/* Planet along with its orbit, earth and Saturn will have different treatment */

function Planet({
  sun_conf,
  radius,
  orbit_radius_x,
  orbit_radius_y,
  speed,
  isSaturn = false,
}) {
  this.base_no_of_orbit_per_second = 3;
  this.base_major_orbit_radius_factor = 160;
  this.base_major_orbit_radius = 69;
  this.base_radius_factor = 10;
  this.base_minor_orbit_radius_factor = this.base_major_orbit_radius * 2 + 20;
  this.base_radius = 2439.5;
  this.speed = speed;
  this.base_omega = 6378;
  this.no_of_orbit_per_second =
    (this.speed / this.base_omega) * this.base_no_of_orbit_per_second;
  this.omega = (2 * PI * this.no_of_orbit_per_second) / 100;

  this.theta = 0;

  this.planet_center_x = 0;
  this.planet_center_y = 0;

  this.aphelion = orbit_radius_x;
  this.perihelion = orbit_radius_y;
  this.real_radius = radius;

  this.radius = 0;
  this.orbit_radius_x = 0;

  this.isSaturn = isSaturn;
  this.sun_conf = sun_conf;
  this.center_x = sun_conf.c_x;
  this.center_y = sun_conf.c_y;

  this.drawPlanet = function ({ ctx, engine, color }) {
    ctx.save();
    ctx.beginPath();
    if (this.theta === 0) {
      this.planet_center_x = this.center_x - this.orbit_radius_x;
      this.planet_center_y = this.center_y;
    }
    let interaction_points = this.orbit.getInteractionPoint();
    if ((this.planet_center_x >= interaction_points[0][0] && this.planet_center_y <= interaction_points[1][0]) && this.planet_center_y < this.center_y
        ) {
      this.radius = 0;
    }
    // console.log(this.planet_center_x, this.planet_center_y, interaction_points);
    // console.log((this.planet_center_x >= interaction_points[0][0] && this.planet_center_y <= interaction_points[1][0]));
    ctx.arc(this.planet_center_x, this.planet_center_y, this.radius, 0, 2 * PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  };

  this.draw = function ({ ctx, canvas, engine }) {
    this.orbit_radius_x =
      engine.scale_x(this.base_major_orbit_radius_factor) *
      (this.aphelion / this.base_major_orbit_radius);
    this.e = this.base_minor_orbit_radius_factor / this.perihelion;
    this.radius =
        engine.scale_x(this.base_radius_factor) *
        (this.real_radius / this.base_radius);
  
    this.orbit = new CreateOrbit({
      sun_radius: this.sun_conf.radius,
      center_x: this.sun_conf.c_x,
      center_y: this.sun_conf.c_y,
      radius_x: this.orbit_radius_x,
      e: this.e,
    });

    this.orbit.draw({ ctx, canvas, engine });

    this.drawPlanet({ ctx, canvas, color: "green" });
  };

  this.update = function ({ ctx, canvas, engine }) {
    this.draw({ ctx, canvas, engine });

    this.theta += this.omega;
    if (this.theta === 2 * PI) {
      this.theta = 0;
    }

    this.planet_center_x =
      this.center_x - this.orbit_radius_x * cos(this.theta);
    this.planet_center_y =
      this.center_y + (this.orbit_radius_x / this.e) * sin(this.theta);
  };
}

let foundation = new CanvasFoundation();

foundation.createUniverse = function () {
  let data = this.get();
  this.sun = new Sun(data.engine);
  this.sun_conf = this.sun.get_conf();
  this.mercury = new Planet({
    sun_conf: this.sun_conf,
    radius: 2439.5,
    orbit_radius_x: 69,
    orbit_radius_y: 46,
    speed: 6378,
  });
};



foundation.animateUniverse = function (self) {
  let data = self.get();
  data.ctx.clearRect(0, 0, data.engine.width, data.engine.height);
  self.sun.update(data);
  self.mercury.update(data);
};

foundation.init();
