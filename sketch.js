let cloudImg;
let lastInteractionTime;
let angry = false;
let messages = [
"Come and hit me. I really need your attention.",
"Attack me again! Why don't you keep attention on me?"
];

function preload() {
cloudImg = loadImage("icloud.jpg"); // 确保路径正确
}

function setup() {
createCanvas(windowWidth, windowHeight);
imageMode(CENTER);
lastInteractionTime = millis();

// 用鼠标点击模拟互动
canvas.addEventListener('click', () => {
interact();
});

// 用声音识别（可选）
if (ml5.soundClassifier) {
// 简单示例：声音触发互动
let options = { probabilityThreshold: 0.7 };
ml5.soundClassifier('[https://teachablemachine.withgoogle.com/models/xxxx/model.json](https://teachablemachine.withgoogle.com/models/xxxx/model.json)', options, modelReady);
}
}

function modelReady() {
classifier.classify(gotResult);
}

function gotResult(error, results) {
if (results && results[0].label === 'Clap') { // 假设模型识别拍手
interact();
}
}

function draw() {
background(0, 0, 0, 0); // canvas透明让背景图片显示

// 显示云朵
let x = width / 2;
let y = height / 2;
if (!angry) {
image(cloudImg, x, y, cloudImg.width / 2, cloudImg.height / 2);
} else {
push();
tint(255, 150, 150); // 红色提示生气
image(cloudImg, x, y, cloudImg.width / 2, cloudImg.height / 2);
pop();

```
fill(255, 0, 0);
textSize(32);
textAlign(CENTER, CENTER);
text(messages[int(millis() / 5000) % 2], width / 2, y + cloudImg.height / 2 + 50);
```

}

// 超过2秒没有互动则生气
if (millis() - lastInteractionTime > 2000) {
angry = true;
}
}

function interact() {
lastInteractionTime = millis();
angry = false;
}
