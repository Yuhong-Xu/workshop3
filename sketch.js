// =======================================================
// ICLOUD IN YOUR PHONOE
// icould is inviting you to destroy it. The more attention you give to it, 
// the icloud will feel more satisfaction.
// =======================================================


let attention = 0;   // Satisfaction level
let icloud;          // 3D model
let jumpOffset = 0;  // So icloud could jump
let mic;            // So when user blows air towards the microphone

// ML5 Handpose model variables
let handpose;
let predictions = [];
let grabBoost = 0;  // 抓手触发的跳跃增强值

function preload() {
  // Make sure the model path is correct
  icloud = loadModel('little_icloud_models/good_icloud.obj', true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  describe('A 3D model of a little icloud');

    // 启动摄像头
    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();
  
    // handpose
    handpose = ml5.handpose(video, () => {
      console.log("Handpose ready");
    });
  
    // 监听识别到的手部关键点
    handpose.on("predict", results => {
    predictions = results;

    // 麦克风输入
      mic = new p5.AudioIn();
      mic.start();
    });
  
}

// 【input1】这里应该有个可以触碰&拉拽的函数可被调用
function draw() {
  background(255);

  // 【input2】这里应有个ML5的“抓手”的函数可被调用
  // ============ 检测抓手动作 =============
    if (predictions.length > 0) {
      let hand = predictions[0];
      // 手指尖（20）与手掌根部（0）的距离
      let dx = hand.landmarks[20][0] - hand.landmarks[0][0];
      let dy = hand.landmarks[20][1] - hand.landmarks[0][1];
      let dist = sqrt(dx*dx + dy*dy);
  
      // 小于80像素 → 认为是“抓手”
      if (dist < 80) {
        grabBoost = 20;  // 触发一次“额外跳动”
      }
    }
  
    // 让 grabBoost 逐渐减弱
    grabBoost *= 0.9;
  

  // Click and drag to look around the shape
  orbitControl();

    // ============ 检测“吹气”（通过音量提升）============
    let vol = mic.getLevel();  // 0~1

    // 【input3】这里应有个p5.js的“对着话筒吹风”的函数可被调用
    // 阈值可以自己调，比如 0.15 比较容易触发
    if (vol > 0.15) {
      grabBoost = 20;  // 和“抓手”一样，触发额外跳动
    }
  

  //【feedback1】这里应有个“云朵在跳跃“的feedback
  // ==== 添加：让云朵上下浮动（模拟跳跃） ====
    let yMove = sin(frameCount * 0.05) * 10 + grabBoost;  // 振幅10，可调大可调小
    translate(0, yMove, 0);

  scale(5); 

  
  // This adds color to the model according to the angle of the surface
    normalMaterial();
    model(icloud);

    // ===== 在屏幕上显示文字 =====
    // "试着用手凭空抓一下它"
    resetMatrix();
    translate(-width/2, -height/2);
  
    fill(0);
    textSize(24);
    text("Try to grab it with your hands in the air.", 20, height - 40);

}








