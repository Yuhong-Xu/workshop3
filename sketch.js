let icloudImg;
let state = "idle"; // idle / angry
let lastInteraction = 0;
let angryText = [
"Come and hit me. I really need your attention.",
"Attack me again! Why don't you keep attention on me?"
];
let angryTimeout = 7000; // 7秒没互动就生气
let startTime;
let statusDiv;

let satisfaction = 0; // 满意度 0~100
let mic, micStarted = false;

function preload() {
icloudImg = loadImage("icloud.png");
}

function setup() {
createCanvas(windowWidth, windowHeight);
imageMode(CENTER);
statusDiv = document.getElementById("status");
lastInteraction = millis();
startTime = millis();

textAlign(CENTER, CENTER);
textSize(24);
fill(255);
}

function draw() {
background(0, 0, 0, 0); // 保持透明

// 显示云朵
if (state === "idle") {
image(icloudImg, width / 2, height / 2, 200, 200);
statusDiv.innerText = "";
} else if (state === "angry") {
let offsetX = random(-5, 5);
let offsetY = random(-5, 5);
image(icloudImg, width / 2 + offsetX, height / 2 + offsetY, 200, 200);
statusDiv.innerText = angryText.join("\n");
}

// 显示满意度条
drawSatisfactionBar();

// 超过一定时间没互动就生气
if (millis() - lastInteraction > angryTimeout) {
state = "angry";
}

// 如果麦克风启动了，根据声音提高满意度
if (micStarted) {
let vol = mic.getLevel();
if (vol > 0.05) { // 吹气音量阈值，可调
satisfaction += vol * 5;
satisfaction = constrain(satisfaction, 0, 100);
lastInteraction = millis();
state = "idle";
}
}

// 2分钟后停止交互
if (millis() - startTime > 120000) {
noLoop();
}
}

function mousePressed() {
if (!micStarted) {
// 第一次点击启动麦克风
mic = new p5.AudioIn();
mic.start();
micStarted = true;
}
lastInteraction = millis();
state = "idle";
}

function drawSatisfactionBar() {
let barWidth = 300;
let barHeight = 25;
let x = width / 2 - barWidth / 2;
let y = height - 100;

noFill();
stroke(255);
rect(x, y, barWidth, barHeight, 5);

noStroke();
fill(0, 255, 0);
let w = map(satisfaction, 0, 100, 0, barWidth);
rect(x, y, w, barHeight, 5);

fill(255);
text("Satisfaction: " + floor(satisfaction) + "%", width / 2, y - 20);
}

function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}
