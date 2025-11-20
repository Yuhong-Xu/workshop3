let attention = 0;   // Satisfaction level
let icloud;          // 3D model

let mic;             // 麦克风
let distanceZ = 0;   // 云朵距离（越大越远）

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

  // 取得麦克风输入强度
  let vol = mic.getLevel();

  // 用吹气推动云朵（越大声 → 跑越远）
  if (vol > 0.05) {
    distanceZ -= vol * 50;   // 数值可调，越大越敏感
  }

  // 材质
  specularMaterial(255);

  // 位移到远方
  push();
  translate(0, 0, distanceZ); 
  scale(5);
  model(icloud);
  pop();

  drawSatisfactionBar();
}

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

// 点击也能让进度条动（不影响吹气功能）
function mousePressed() {
  attention = constrain(attention + 1, 0, 20);
}

function touchStarted() {
  attention = constrain(attention + 1, 0, 20);

  // 手机 Safari 需要用户触摸后才能启用 mic
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}
