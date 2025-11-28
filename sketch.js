let icloud;

function preload() {
  icloud = loadModel('little_icloud_models/good_icloud.obj', true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(255);
  orbitControl();
  normalMaterial();
  model(icloud);
}