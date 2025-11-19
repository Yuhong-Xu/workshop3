let attention = 0;   // 满意度
let icloud;          // 3D 模型

function preload() {
  // 确保模型路径正确，例如 models/cloud.obj
  icloud = loadModel('./models/cloud.obj', true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  describe('A 3D model of a little cloud');
}

function draw() {
  background(255);

  // 鼠标或手指拖动旋转视角
  orbitControl();

  // 根据角度给模型颜色
  normalMaterial();

  // 绘制 3D 模型
  model(icloud);

  // 绘制满意度进度条
  drawSatisfactionBar();
}

// 绘制屏幕上方满意度条
function drawSatisfactionBar() {
  push();
  resetMatrix();  // 保证进度条在屏幕坐标
  noStroke();
  let barWidth = map(attention, 0, 20, 0, width * 0.8);
  if (attention < 13) fill(255, 180, 60);
  else fill(255, 60, 60);
  rect(width * 0.1, 30, barWidth, 12, 8);
  pop();
}

// 示例：点击或触摸画布增加满意度
function mousePressed() {
  attention += 1;
  attention = constrain(attention, 0, 20);
}

function touchStarted() {
  attention += 1;
  attention = constrain(attention, 0, 20);
}
