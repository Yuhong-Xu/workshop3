// =======================================================
// ICLOUD IN YOUR PHONOE
// icould is inviting you to destroy it. The more attention you give to it, 
// the icloud will feel more satisfaction.
// =======================================================


let attention = 0;   // Satisfaction level
let icloud;          // 3D model

function preload() {
  // Make sure the model path is correct
  icloud = loadModel('/little_icloud_models/good_icloud.obj', true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  describe('A 3D model of a little icloud');
}

// 【input1】这里应该有个可以触碰&拉拽的函数可被调用
function draw() {
  background(255);

  // Click and drag to look around the shape
  orbitControl();

  scale(5); 
  
  // This adds color to the model according to the angle of the surface
  normalMaterial();
  model(icloud);
}


// 这里应有个“试着用手凭空抓一下它” 的文字出现在屏幕上

// 【input2】这里应有个ML5的“抓手”的函数可被调用


// 【input3】这里应有个p5.js的“对着话筒吹风”的函数可被调用


// 【feedback1]这里应有个“云朵在跳跃“的feedback


// 【feedback2】这里应有个“云朵旁边会有彩带蹦出来”的feedback





