let icloudImg;
let satisfaction = 0; // 满意度 0~100
let mic, micStarted = false;

function preload() {
icloudImg = loadImage("icloud.png"); // 第四次尝试
}

function setup() {
createCanvas(windowWidth, windowHeight);
imageMode(CENTER);

textAlign(CENTER, CENTER);
textSize(48);
fill(255);
}

function draw() {
background(0, 0, 0, 0);

// 云朵抖动+缩放效果（如果未达到100%）
if (satisfaction < 100) {
let offsetX = random(-5, 5);
let offsetY = random(-5, 5);
let scaleFactor = random(0.95, 1.05); // 轻微放大缩小
push();
translate(width/2 + offsetX, height/2 + offsetY);
scale(scaleFactor);
image(icloudImg, 0, 0, 200, 200);
pop();
} else {
// 满足100%时居中显示云朵
image(icloudImg, width / 2, height / 2, 200, 200);
}

// 满意度条
drawSatisfactionBar();

// 麦克风检测
if (micStarted) {
let vol = mic.getLevel();
if (vol > 0.05) { // 吹气阈值
increaseSatisfaction();
}
}

// 满意度100%时显示感谢文字
if (satisfaction >= 100) {
fill(255, 255, 0);
text("Thank you!", width / 2, height / 2);
}
}

function mousePressed() {
// 首次点击启动麦克风
if (!micStarted) {
mic = new p5.AudioIn();
mic.start();
micStarted = true;
let hintDiv = document.getElementById("hint");
if (hintDiv) hintDiv.style.display = "none";
}

increaseSatisfaction();
}

function increaseSatisfaction() {
if (satisfaction < 100) {
satisfaction += 1;
satisfaction = constrain(satisfaction, 0, 100);
}
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
textSize(24);
text("Satisfaction: " + floor(satisfaction) + "%", width / 2, y - 20);
}

function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}
