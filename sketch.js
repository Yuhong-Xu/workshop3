
let attention = 0;   // Satisfaction level
let icloud;          // 3D model

function preload() {
  // Make sure the model path is correct, e.g., models/cloud.obj
  icloud = loadModel('icloud.obj', true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  describe('A 3D model of a little icloud');
}

function draw() {
  background(255);

  // Rotate view with mouse or finger drag
  orbitControl();

  // Add color to the model based on the surface angle
  normalMaterial();


  scale(5); 
  
  // Draw 3D model
  model(icloud);

  // Draw satisfaction progress bar
  drawSatisfactionBar();
}

// Draw the satisfaction bar at the top of the screen
function drawSatisfactionBar() {
  push();
  resetMatrix();  // Ensure the progress bar is in screen coordinates
  noStroke();
  let barWidth = map(attention, 0, 20, 0, width * 0.8);
  if (attention < 13) fill(255, 180, 60);
  else fill(255, 60, 60);
  rect(width * 0.1, 30, barWidth, 12, 8);
  pop();
}

// Example: click or touch the canvas to increase satisfaction
function mousePressed() {
  attention += 1;
  attention = constrain(attention, 0, 20);
}

function touchStarted() {
  attention += 1;
  attention = constrain(attention, 0, 20);
}

