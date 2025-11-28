let icloudImg;
let satisfaction = 0; // 满意度 0~100
let mic, micStarted = false;

let angryText = [
"Come and hit me. I really need your attention.",
"Attack me again! Why don't you keep attention on me?"
];

let startTime;
let lastInteraction = 0;
let angryTimeout = 7000; // 7秒没互动触发生气
let hintDiv, statusDiv;

function preload() {
icloudImg = loadImage("icloud.png");
}

function setup() {
createCanvas(windowWidth, windowHeight);
imageMode(CENTER);

startTime = millis();
lastInteraction = millis();

hintDiv = document.getElementById("hint");
statusDiv = document.getElementById("status");

textAlign(CENTER, CENTER);
textSize(24);
}

function draw() {
background(0, 0, 0, 0);

// 显示云朵
image(icloudImg, width / 2, height / 2, 200, 200);

// 满意度条
drawSatisfactionBar();

// 检测麦克风音量
if (micStarted) {
let vol = mic.getLevel();
if (vol > 0.05) { // 吹气阈值
satisfaction += vol * 10; // 吹气增加满意度
satisfaction = constrain(satisfaction, 0, 100);
lastInteraction = millis();
}
}

// 点击或吹气超过 7 秒没操作显示生气文字
if (millis() - lastInteraction > angryTimeout) {
if (satisfaction < 50) {
statusDiv.innerText = angryText.join("\n");
statusDiv.style.color = "red";
} else if (satisfaction < 100) {
statusDiv.innerText = "Please, just make me happy!";
statusDiv.style.color = "lime";
}
} else {
if (satisfaction >= 50 && satisfaction < 100) {
statusDiv.innerText = "Please, just make me happy!";
statusDiv.style.color = "lime";
} else if (satisfaction < 50) {
statusDiv.innerText = "";
}
}

// 满意度达到 100%
if (satisfaction >= 100) {
statusDiv.innerText = "Thank you!";
statusDiv.style.color = "yellow";
}

// 2分钟后停止交互
if (millis() - startTime > 120000) {
noLoop();
}
}

function mousePressed() {
lastInteraction = millis();

// 首次点击启动麦克风
if (!micStarted) {
mic = new p5.AudioIn();
mic.start();
micStarted = true;
hintDiv.style.display = "none";
}

// 点击增加满意度
satisfaction += 2;
satisfaction = constrain(satisfaction, 0, 100);
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
