'use strict';
var cols, rows;
var scl = 60;
var w, h;

let box_num = 500;
var boxes = [];
var totalBox = 0;

var t1 = 0.0;
var t2 = 0.0;
var t3 = 0.0;

function canvasSetup(){
  background(255);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  canvasSetup();
}

function setup() {

  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.style('z-index','-100');
  w = windowWidth * 4;
  h = windowHeight * 4;
  cols = w / scl;
  rows = h / scl;

  for (let i = 0; i < point_num; i++) {
    points[i] = new Point();
  }
  console.log(radius);
}


function draw() {
  background(255);
  make_ball();

  camera(w * 0.2, -300, h, w * 0.5, 0, 0, 0, 1, 0);

  make_mesh();

  for (let i = 0; i < point_num; i++) {
    points[i].display();
    points[i].update();
  }

}

function make_mesh() {
  let wave_height = 30;
  let wave_pace = 40;
  for (var z = 0; z < rows - 1; z++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      fill(130);
      stroke(255);
      strokeWeight(1);
      var y = sin(sqrt((cols - x) * (cols - x) + (z * z)) + frameCount / wave_pace);
      vertex(x * scl + sin(frameCount), y * wave_height, z * scl);
      var y = sin(sqrt((cols - x) * (cols - x) + ((z + 1) * (z + 1))) + frameCount / wave_pace);
      vertex(x * scl, y * wave_height, (z + 1) * scl);
    }
    endShape();
  }
}

function make_ball() {
  push();
  fill(100, 0, 0);
  noStroke();
  translate(w * 0.9, -(w * 0.1) / 3);
  sphere(w * 0.15);
  pop();
}


let point_num = 150;
var radius;
var rotation_speed = 0.01;
var box_size;
let points = [];
class Point {
  constructor() {
    this.t = 0.0;
    this.radius = w / 2;
    this.box_size = w / 70;
    this.rad1 = random(PI * 2);
    this.rad2 = random(PI * 2);
    this.rad_speed1 = random(1) < 0.5 ? rotation_speed : -1 * rotation_speed;
    this.rad_speed2 = random(1) < 0.5 ? rotation_speed : -1 * rotation_speed;
  }
  display() {
    this.r = this.radius * sin(this.rad1);
    this.x = this.r * cos(this.rad2);
    this.y = this.r * sin(this.rad2);
    this.z = this.radius * cos(this.rad1);
    fill(0);
    strokeWeight(this.p);
    push();
    stroke(0);
    translate(w * 0.9, -(w * 0.1) / 3);
    translate(this.x, this.y, this.z);
    rotate(this.t);
    box(this.box_size);
    pop();
  }

  update() {
    this.rad1 += this.rad_speed1;
    this.rad2 += this.rad_speed2;
    this.t += 0.1;
    if (this.rad1 < 0) {
      this.rad1 += PI * 2;
    } else if (this.rad1 >= PI * 2) {
      this.rad1 -= PI * 2;
    }
    if (this.rad2 < 0) {
      this.rad2 += PI * 2;
    } else if (this.rad2 >= PI * 2) {
      this.rad2 -= PI * 2;
    }
  }
}