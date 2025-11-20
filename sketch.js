let attention = 0;   // Satisfaction level
let icloud;          // 3D model
let mic;             // 麦克风
let distanceZ = -200; // 初始距离（负值在摄像机前）

function preload() {
  icloud = loadModel('icloud.obj', true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  describe('Blow at the phone to push the cloud away');

  // 启动麦克风
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(255);

  orbitControl();

  // 手机必须点击一次才能启用音频
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }

  // 获取麦克风音量
  let vol = mic.getLevel();

  // 吹气让云朵跑远（音量越大，移动越远）
  if (vol > 0.05) {
    distanceZ -= vol * 50; // 可以调整数值控制移动速度
  }

  // 白色高光材质
  specularMaterial(255);

  // 绘制云朵模型
  push();
  translate(0, 0, distanceZ);
  scale(5); // 放大模型，让手机上显示大一点
  model(icloud);
  pop();

  // 绘制 satisfaction 进度条
  drawSatisfactionBar();
}

// 顶部 satisfaction 条
function drawSatisfactionBar() {
  push();
  resetMatrix();
  noStroke();
  let barWidth = map(attention, 0, 20, 0, width * 0.8);
  if (attention < 13) fill(255, 180, 60);
  else fill(255, 60, 60);
  rect(width * 0.1, 30, barWidth, 12, 8);
  pop();
}

// 点击增加 satisfaction
function mousePressed() {
  attention = constrain(attention + 1, 0, 20);
}

function touchStarted() {
  attention = constrain(attention + 1, 0, 20);

  // 手机 Safari 需要用户触摸才能启用 mic
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}
