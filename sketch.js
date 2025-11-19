let cam, poseNet, pose;
let mic;
let lighterOn = false;
let attention = 0;
let lastShoulderX = 0;

let flame; // p5.play sprite

function preload() {
  // 创建简单火苗动画帧
  // 这里直接用不同颜色圆形生成 animation
  flameAnim = new Animation();
  for (let i = 0; i < 3; i++) {
    let g = createGraphics(50, 80);
    g.noStroke();
    let c = color(50 + i*50, 100, 200 - i*50); // 蓝到橙
    g.fill(c);
    g.ellipse(25, 40, 50, 80);
    flameAnim.addImage(g);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // --- 启动摄像头 ---
  cam = createPhoneCamera('user', true, 'fitHeight');
  enableCameraTap();

  // --- 声音输入 ---
  mic = new p5.AudioIn();
  mic.start();

  // --- PoseNet ---
  cam.onReady(() => {
    poseNet = ml5.poseNet(cam.videoElement, modelReady);
    poseNet.on('pose', gotPoses);
  });

  // --- p5.play sprite ---
  flame = createSprite(width/2, height/2);
  flame.addAnimation('off', flameAnim);
  flame.addAnimation('on', flameAnim); // 用同一个动画，稍后可 tint
  flame.scale = 1;
}

function modelReady() {
  console.log('PoseNet loaded!');
}

function gotPoses(results) {
  if (results.length > 0) pose = results[0].pose;
}

function draw() {
  background(10);

  // ① 触摸点亮火焰
  if (touches.length > 0 && !lighterOn) {
    lighterOn = true;
    attention += 2;
  }

  // ② 声音控制火焰颜色亮度
  let level = mic.getLevel();
  if (lighterOn) {
    attention += level * 10;
    let brightness = map(level, 0, 0.2, 0, 255);
    brightness = constrain(brightness, 0, 255);
    flame.tint = color(200 + brightness / 2, 100 + brightness / 3, 50);
  } else {
    flame.tint = color(50, 100, 200);
  }

  // ③ 左右摇摆跳动
  if (pose) {
    let shouldersX = (pose.leftShoulder.x + pose.rightShoulder.x) / 2;
    if (abs(shouldersX - lastShoulderX) > 20) {
      flameJump();
      attention += 1;
    }
    lastShoulderX = shouldersX;
  }

  drawSprites();

  // ④ Satisfaction Bar
  drawSatisfactionBar();
}

function drawSatisfactionBar() {
  let barWidth = map(attention, 0, 20, 0, width * 0.8);
  noStroke();
  if (attention < 13) fill(255, 180, 60);
  else fill(255, 60, 60);
  rect(width * 0.1, 30, barWidth, 12, 8);
}

function flameJump() {
  // 火苗跳动动画
  flame.position.y = height/2 + random(-5, 5);
}
