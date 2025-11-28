let icloudImg;
let state = "idle"; // idle / angry
let lastInteraction = 0;
let angryText = [
"Come and hit me. I really need your attention.",
"Attack me again! Why don't you keep attention on me?"
];
let angryTimeout = 2000; // 2秒后开始生气
let startTime;
let statusDiv;

function preload() {
icloudImg = loadImage("icloud.jpg");
}

function setup() {
createCanvas(windowWidth, windowHeight);
imageMode(CENTER);
lastInteraction = millis();
startTime = millis();
statusDiv = document.getElementById("status");
}

function draw() {
background(0, 0, 0, 0); // 保持透明，让背景可见

// 显示云朵
if (state === "idle") {
image(icloudImg, width / 2, height / 2, 200, 200);
statusDiv.innerText = ""; // idle状态不显示文字
} else if (state === "angry") {
// 生气状态抖动效果
let offsetX = random(-5, 5);
let offsetY = random(-5, 5);
image(icloudImg, width / 2 + offsetX, height / 2 + offsetY, 200, 200);
statusDiv.innerText = angryText.join("\n");
}

// 超过一定时间没互动就生气
if (millis() - lastInteraction > angryTimeout) {
state = "angry";
}

// 2分钟后停止交互
if (millis() - startTime > 120000) {
noLoop();
}
}

function mousePressed() {
lastInteraction = millis();
state = "idle";
}

function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}
