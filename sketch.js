
// =======================================================
// ICLOUD IN YOUR PHONOE
// icould is inviting you to destroy it. The more attention you give to it, 
// the icloud will feel more satisfaction.
// =======================================================


let attention = 0;   // Satisfaction level
let icloud;          // 3D model

function preload() {
  // Make sure the model path is correct
  icloud = loadModel('Little icloud longing for attention.obj', true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  describe('A 3D model of a little icloud');
}

// 这里应该有个可以触碰&拉拽的函数可被调用
function draw() {
  background(255);

  // Rotate view with mouse or finger drag
  orbitControl();

  scale(5); 
  
  // This adds color to the model according to the angle of the surface
  normalMaterial();
  model(icloud);
}

// 这里应有个ML5的“抓手”的函数可被调用


// 这里应有个p5.js的“对着话筒吹风”的函数可被调用





