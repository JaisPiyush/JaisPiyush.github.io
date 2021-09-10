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

let scale_y = (y) => canvas.height - 400 + y;

// Vars
var toy_vars = {};

var road_vars = {
  start_x: 0,
  start_y: scale_y(250),
  end_x: canvas.width,
  end_y: scale_y(250),
};

var child_vars = {
  start_x: 200,
  start_y: scale_y(183),
  head_radius: 30,
  neck_cpx: 4,
  neck_cpy: 2,
  neck_length: 10,
  chest_radius_x: 20,
  chest_radius_y: 15,
  bottom_radius: 19,
  leg_radius: 11,
  leg_dist: 40,
};

// Functions
function drawGrass(x, y) {
  let tips = Math.floor(Math.random() * 3) + 1;
  let angle = Math.floor(Math.random() * 9) + 2;
  // if(tips === 3){
  ctx.beginPath();
  ctx.strokeStyle = "green";
  ctx.moveTo(x, y);
  ctx.lineTo(x + 8, y + 26);
  ctx.moveTo(x, y);
  ctx.lineTo(x + 2, y + 26);
  ctx.rotate(PI / 4);
  ctx.stroke();
  // }
}

function drawRoad() {
  // console.log(canvas.width + '  ' + scale_y(400));
  ctx.beginPath();
  ctx.moveTo(road_vars.start_x, road_vars.start_y);
  ctx.lineTo(road_vars.end_x, road_vars.end_y);
  ctx.stroke();

  drawGrass(280, scale_y(300));
}

var initConfig = {};

function init() {
  initConfig.lineWidth = ctx.lineWidth;
  initConfig.strokeStyle = ctx.strokeStyle;
  initConfig.fillStyle = ctx.fillStyle;
}

function resetConfigs() {
  ctx.lineWidth = initConfig.lineWidth;
  ctx.strokeStyle = initConfig.strokeStyle;
  ctx.fillStyle = initConfig.fillStyle;
}

function drawChild() {
  resetConfigs();
  ctx.beginPath();
  ctx.arc(
    child_vars.start_x,
    child_vars.start_y,
    child_vars.head_radius,
    0,
    2 * PI
  );
  ctx.fill();

  // Neck
  function get_neck_vars() {
    let angle = PI / 4;
    return {
      start_x: child_vars.start_x - child_vars.head_radius * cos(angle) + 2,
      start_y: child_vars.start_y + child_vars.head_radius * sin(angle) - 2,
      end_x:
        child_vars.start_x -
        (child_vars.head_radius + child_vars.neck_length) * cos(angle),
      end_y:
        child_vars.start_y +
        (child_vars.head_radius + child_vars.neck_length) * sin(angle),
      cpx:
        child_vars.neck_cpx +
        child_vars.start_x -
        (child_vars.head_radius + child_vars.neck_length / 2) * cos(angle),
      cpy:
        child_vars.neck_cpy +
        child_vars.start_y +
        (child_vars.head_radius + child_vars.neck_length / 2) * sin(angle),
    };
  }
  ctx.beginPath();
  let neck_vars = get_neck_vars();
  ctx.moveTo(neck_vars.start_x, neck_vars.start_y);
  ctx.quadraticCurveTo(
    neck_vars.cpx,
    neck_vars.cpy,
    neck_vars.end_x,
    neck_vars.end_y
  );
  ctx.lineWidth = 8;
  ctx.stroke();
  resetConfigs();

  // Chest
  function get_chest_vars(start_x, start_y) {
    let angle = PI / 4;
    return {
      c_x: start_x - child_vars.chest_radius_x * cos(angle),
      c_y: start_y + child_vars.chest_radius_x * sin(angle),
    };
  }
  ctx.beginPath();
  let chest_vars = get_chest_vars(neck_vars.end_x, neck_vars.end_y);
  ctx.ellipse(
    chest_vars.c_x,
    chest_vars.c_y,
    child_vars.chest_radius_x + 2,
    child_vars.chest_radius_y,
    -PI / 4,
    0,
    2 * PI
  );
  ctx.fill();

  // Bottom Body
  function get_bottom_vars(e_x, e_y) {
    let angle = PI / 6;
    return {
      c_x: e_x - ((2 * child_vars.chest_radius_x) / 3) * cos(angle),
      c_y: e_y + ((2 * child_vars.chest_radius_x) / 3) * sin(angle),
    };
  }
  ctx.beginPath();
  let bottom_vars = get_bottom_vars(chest_vars.c_x, chest_vars.c_y);
  ctx.arc(
    bottom_vars.c_x,
    bottom_vars.c_y,
    child_vars.bottom_radius,
    0,
    2 * PI
  );
  ctx.fill();

  // Legs
  function get_leg_vars(b_x, b_y) {
    return {
      c_x: b_x - child_vars.leg_dist,
      c_y: b_y - child_vars.leg_radius,
      top_x: b_x - child_vars.leg_dist + child_vars.leg_radius * sin(PI / 4),
      top_y: b_y - child_vars.leg_radius + child_vars.leg_radius * cos(PI / 4),
    };
  }
  ctx.beginPath();
  let leg_vars = get_leg_vars(
    bottom_vars.c_x,
    bottom_vars.c_y + child_vars.bottom_radius
  );
  ctx.arc(
    leg_vars.c_x,
    leg_vars.c_y,
    child_vars.leg_radius,
    -PI / 6,
    (3 * PI) / 4
  );
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(
    bottom_vars.c_x,
    bottom_vars.c_y + child_vars.bottom_radius / 2 - 2
  );
  ctx.lineTo(leg_vars.top_x, leg_vars.top_y - 2);
  ctx.lineTo(leg_vars.top_x - 1, leg_vars.top_y + 0.5);
  ctx.lineTo(bottom_vars.c_x, bottom_vars.c_y + child_vars.bottom_radius - 1);
  ctx.closePath();
  ctx.fill();

  resetConfigs();

  let data = {
    x: leg_vars.c_x - child_vars.leg_radius * sin(PI / 4),
    y: child_vars.start_y - child_vars.head_radius,
    width:
      child_vars.start_x +
      child_vars.head_radius -
      (leg_vars.c_x - child_vars.leg_radius * sin(PI / 4)),
    height: road_vars.start_y - (child_vars.start_y - child_vars.head_radius),
  };

  // clearRect(data)
  return data;
}

function clearRect({ x, y, width, height }) {
  // console.log(x, y, width, height)
  ctx.clearRect(x, y, width, height);
}

init();

function animate() {
  let childRect = drawChild();
  drawRoad();
}
animate();
