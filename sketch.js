let icloud;          // 3D model
let mic;             // 麦克风
let distanceZ = -200; // 初始距离（负值在摄像机前）
let micEnabled = false; // 麦克风是否启用

function preload() {
  icloud = loadModel('icloud.obj', true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  describe('Blow at the phone to push the cloud away');

  // 创建麦克风对象，但不要立刻启动
  mic = new p5.AudioIn();
}

function draw() {
  background(255);

  orbitControl();

  // 只有麦克风启用后才读取音量
  if (micEnabled) {
    let vol = mic.getLevel();

    // 吹气让云朵跑远（音量越大，移动越远）
    if (vol > 0.05) {
      distanceZ -= vol * 50; // 可调节速度
    }
  }

  // 白色高光材质
  specularMaterial(255);

  // 绘制云朵模型
  push();
  translate(0, 0, distanceZ);
  scale(5); // 放大模型
  model(icloud);
  pop();
}

// 点击/触摸启用麦克风
function mousePressed() {
  enableMic();
}

function touchStarted() {
  enableMic();
}

// 启用麦克风函数（手机必须点击一次）
function enableMic() {
  if (!micEnabled) {
    mic.start();
    micEnabled = true;

    // 确保音频上下文激活（手机 Safari 必须）
    if (getAudioContext().state !== 'running') {
      getAudioContext().resume();
    }
  }
}
