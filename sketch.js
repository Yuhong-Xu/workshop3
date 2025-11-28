let video;
let handpose;
let predictions = [];
let cloudImg;
let state = 'friendly';
let lastInteractionTime = 0;
let mic;

function preload() {
// 这里替换为你自己小云朵的图片
cloudImg = loadImage('icloud.jpg'); // 可爱云朵
}

function setup() {
createCanvas(640, 480);
video = createCapture(VIDEO);
video.size(width, height);
video.hide();

handpose = ml5.handpose(video, modelReady);
handpose.on('predict', results => predictions = results);

mic = new p5.AudioIn();
mic.start();
}

function modelReady() {
console.log('Handpose model ready!');
}

function draw() {
background('#a0d8f1');

// 显示云朵（只有一个状态）
image(cloudImg, width/2 - 100, height/2 - 100, 200, 200);

// 检测手势是否接近云朵中心
if (predictions.length > 0) {
let hand = predictions[0].landmarks[0]; // 手腕位置
let d = dist(hand[0], hand[1], width/2, height/2);
if (d < 100) {
lastInteractionTime = millis();
document.getElementById('status').innerText = "Come and hit me! I need your attention!";
}
}

// 声音触发互动
let vol = mic.getLevel();
if (vol > 0.1) { // 声音阈值，可以调整
lastInteractionTime = millis();
document.getElementById('status').innerText = "Attack me again! Why don't you keep attention on me?";
}

// 超过 10 秒没有互动，仍然保留文字提示（云朵状态不变）
if (millis() - lastInteractionTime > 10000) {
document.getElementById('status').innerText = "I'm waiting for your attention!";
}
}
