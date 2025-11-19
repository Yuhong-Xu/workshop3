let attention = 0;
let icloud;


function preload() {
  icloud = loadModel('/models/还不知道是啥.obj', true);
  // 记住哈，还不知道是啥
}
function setup() {
  createCanvas(200, 200, WEBGL);
  describe('A model of a icloud');
}

function gotPoses(results) {
  if (results.length > 0) pose = results[0].pose;
}

function draw(){
  background(255);
 
  // Click and drag to look around the shape
  orbitControl();
 
  // This adds color to the model according to the angle of the surface
  normalMaterial();
  model(icloud);

  // “满意条” Satisfaction Bar
  drawSatisfactionBar();
}



// 角色可以看一下“小云朵”的心情态度。也就是“满意条”
function drawSatisfactionBar() {
  let barWidth = map(attention, 0, 20, 0, width * 0.8);
  noStroke();
  if (attention < 13) fill(255, 180, 60);
  else fill(255, 60, 60);
  rect(width * 0.1, 30, barWidth, 12, 8);
}