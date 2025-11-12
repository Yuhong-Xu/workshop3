let cam, poseNet, pose;
let mic;
let lighterOn = false;
let attention = 0;
let flameColor;
let lastShoulderX = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  flameColor = color(50, 100, 200); // 初始暗蓝色（未点亮）

  // --- 启动摄像头（前置） ---
  cam = createPhoneCamera('user', true, 'fitHeight');
  enableCameraTap();

  // --- 声音输入 ---
  mic = new p5.AudioIn();
  mic.start();

  // --- 当摄像头就绪后启动 PoseNet ---
  cam.onReady(() => {
    console.log('Camera ready!');
    poseNet = ml5.poseNet(cam.videoElement, modelReady);
    poseNet.on('pose', gotPoses);
  });
}

function modelReady() {
  console.log('PoseNet loaded!');
}

function gotPoses(results) {
  if (results.length > 0) {
    pose = results[0].pose;
  }
}

function draw() {
  background(10);

  // 摄像头画面可选显示（可隐藏）
  // image(cam.videoElement, 0, 0, width, height);

  // ① 触摸点亮火焰
  if (touchIsDown && !lighterOn) {
    lighterOn = true;
    attention += 2;
  }

  // ② 声音控制火焰颜色亮度
  let level = mic.getLevel();
  if (lighterOn) {
    let brightness = map(level, 0, 0.2, 0, 255);
    brightness = constrain(brightness, 0, 255);
    flameColor = color(200 + brightness / 2, 100 + brightness / 3, 50);
    attention += level * 10;
  }

  // ③ 检测身体左右摇摆
  if (pose) {
    let shouldersX = (pose.leftShoulder.x + pose.rightShoulder.x) / 2;
    if (abs(shouldersX - lastShoulderX) > 20) {
      flameBounce(); // 火苗跳动
      attention += 1;
    }
    lastShoulderX = shouldersX;
  }

  // --- 绘制火焰 ---
  drawFlame();

  // --- 绘制满足度条（沿用你原本的样式） ---
  drawSatisfactionBar();
}

function drawFlame() {
  if (!lighterOn) {
    fill(60, 100, 200, 100);
    ellipse(width / 2, height / 2, 40, 60);
    return;
  }

  let flicker = random(-5, 5);
  noStroke();
  fill(flameColor);
  ellipse(width / 2, height / 2 + flicker, 50, 80 + flicker);
  fill(255, 200, 50, 150);
  ellipse(width / 2, height / 2 + flicker / 2, 30, 50 + flicker);
}

function drawSatisfactionBar() {
  let barWidth = map(attention, 0, 20, 0, width * 0.8);
  noStroke();
  if (attention < 13) fill(255, 180, 60);
  else fill(255, 60, 60);
  rect(width * 0.1, 30, barWidth, 12, 8);
}

function flameBounce() {
  // 让火焰稍微“蹦跳”
  push();
  translate(width / 2, height / 2);
  rotate(radians(random(-5, 5)));
  pop();
}
