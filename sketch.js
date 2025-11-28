// =======================================================
// ICLOUD IN YOUR PHONE
// icloud is inviting you to destroy it. The more attention you give to it, 
// the icloud will feel more satisfaction.
// =======================================================

let attention = 0;   // Satisfaction level
let icloud;          // 3D model
let jumpOffset = 0;  // So icloud could jump
let mic;             // When user blows air towards the microphone

// ML5 Handpose variables
let handpose;
let predictions = [];
let grabBoost = 0;   // 手抓触发跳跃

// -------- 新增：状态机控制 --------
let idleTimer = 0;
let lastInteractionTime = 0;
let stage = 0;   // 0=初始 1=第一次10秒后 2=第二次10秒后 3=按钮阶段 4=拳击 5=庆祝
let showText = "";
let button;

// 彩带用
let confettiParticles = [];
let celebrationTriggered = false;


function preload() {
  icloud = loadModel('little_icloud_models/good_icloud.obj', true);
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // ---- 摄像头 ----
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // ---- Handpose ----
  handpose = ml5.handpose(video, () => {
    console.log("Handpose ready");
  });

  handpose.on("predict", results => {
    predictions = results;
  });

  // ---- Mic ----
  mic = new p5.AudioIn();
  mic.start();

  // ---- HTML 按钮（先隐藏） ----
  button = createButton("点击屏幕");
  button.id("actionBtn");
  button.style("position", "absolute");
  button.style("bottom", "30px");
  button.style("left", "50%");
  button.style("transform", "translateX(-50%)");
  button.style("padding", "16px 28px");
  button.style("font-size", "20px");
  button.style("display", "none");
  button.mousePressed(onButtonPressed);

  lastInteractionTime = millis();
}



// ---------------------- MAIN DRAW -------------------------
function draw() {
  background(255);

  // ============ 检测抓手 =============
  let userInteracted = false;

  if (predictions.length > 0) {
    let hand = predictions[0];
    let dx = hand.landmarks[20][0] - hand.landmarks[0][0];
    let dy = hand.landmarks[20][1] - hand.landmarks[0][1];
    let dist = sqrt(dx*dx + dy*dy);

    if (dist < 80) {
      grabBoost = 20;
      userInteracted = true;
    }
  }

  // ============ 检测吹气 =============
  let vol = mic.getLevel();
  if (vol > 0.15) {
    grabBoost = 20;
    userInteracted = true;
  }

  // 记录互动时间
  if (userInteracted) {
    lastInteractionTime = millis();

    if (stage === 3) {
      stage = 4; // 进入拳击阶段
      showText = "现在试着拳击一下它！";
    }
  }

  grabBoost *= 0.9;

  // ============ 状态机：10 秒不理逻辑 =============
  let noTouchTime = millis() - lastInteractionTime;

  if (stage === 0 && noTouchTime > 10000) {
    stage = 1;
    showText = "来打我吧！我真的很需要你的关注！";
  }

  else if (stage === 1 && noTouchTime > 20000) {
    stage = 2;
    showText = "试一试继续不理它个10秒";
  }

  else if (stage === 2 && noTouchTime > 30000) {
    stage = 3;
    showText = "点击下方按钮继续";
    button.style("display", "block");
  }

  // ============ 点击按钮 → 拳击阶段 ============
  if (stage === 4) {
    // 等用户拳击（ML5手靠近屏幕）
    if (predictions.length > 0) {
      let hand = predictions[0];
      let z = hand.landmarks[0][2];

      if (z < -40) {  // 往前推
        triggerCelebration();
        stage = 5;
      }
    }
  }

  // ============ 云朵跳跃 ============
  let yMove = sin(frameCount * 0.05) * 10 + grabBoost;
  translate(0, yMove, 0);

  // scale(5);
  normalMaterial();
  model(icloud);

  // ============ 显示文字 ============
  resetMatrix();
  translate(-width/2, -height/2);

  fill(0);
  textSize(26);
  if (stage === 0) text("试着用手凭空抓一下它", 20, height - 40);
  if (showText !== "") text(showText, 20, height - 80);

  // 彩带绘制
  drawConfetti();
}



// ---------------------- 按钮逻辑 -------------------------
function onButtonPressed() {
  button.style("display", "none");
  showText = "现在试着拳击一下它";
  stage = 4;
}



// ---------------------- 彩带触发 -------------------------
function triggerCelebration() {
  if (!celebrationTriggered) {
    celebrationTriggered = true;

    for (let i = 0; i < 200; i++) {
      confettiParticles.push({
        x: random(width),
        y: random(-200, -20),
        speed: random(2, 6),
        size: random(6, 12)
      });
    }

    showText = "恭喜你满足了这个可爱的小云朵！";
  }
}



// ---------------------- 彩带绘制 -------------------------
function drawConfetti() {
  if (!celebrationTriggered) return;

  for (let c of confettiParticles) {
    fill(random(255), random(255), random(255));
    ellipse(c.x, c.y, c.size);

    c.y += c.speed;
    if (c.y > height) c.y = random(-200, -20);
  }
}
