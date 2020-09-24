const width = 600;
const height = 600;

const speed = 5;

// player variables
var posX;
var posY;
var posRasX;
var posRasY;
var playerRadius = 50;
var multi = 2;
var toobig = 125;

// coin variables/arrays
var coinNum = 300;
var coinsX = [];
var coinsY = [];
var coinsRadius = 20;

var coinColor = [];

// enemy variables/arrays
var enemyNum = 10;
var enemyX = [];
var enemyY = [];
var enemyRadius = [];

var enemyColor = [];

function setup() {
  background(200)
  createCanvas(width, height);

  posX = 0;
  posY = 0;

  //posRasX = 0;
  //posRasY = 0;
  for (var i = 0; i < coinNum; i++) {
    append(coinsX, random(-2000, 2000));
    append(coinsY, random(-2000, 2000));
    append(coinColor, [random(255), random(255), random(255)]);
  }
  for (var i = 0; i < enemyNum; i++) {
    append(enemyX, random(-2000, 2000));
    append(enemyY, random(-2000, 2000));
    append(enemyColor, [random(255), random(255), random(255)]);
    append(enemyRadius, int(random(50, 150)));
  }
}  

function draw() {
  background(200);
  raycast(width/2, height/2, mouseX, mouseY)
  //console.log("x = ", raycastX, "y = ", raycastY)

  //updating posX/posY with raycasting
  posX -= raycastY * speed;
  posY -= raycastX * speed;

  posRasX -= raycastY * speed;
  posRasY -= raycastX * speed;

  if (posRasX > 50) {
    posRasY -= 50;
  }
  if (posRasY > 50) {
    posRasX -= 50;
  }
  if (posRasX < 0) {
    posRasY += 50;
  }
  if (posRasY < 0) {
    posRasX += 50;
  }

  for (var i = 0; i < 13; i ++) { // grid tekenen/bewegen
    for (var j = 0; j < 13; j ++) {
      rect((i*50)-posRasX, (j*50)-posRasY, 50, 50);
    }
  } 

/*  for (horizontalSpacing = 0; horizontalSpacing < width; i += 50) {
    line()
  }*/

  for (var i = 0; i < coinNum; i++) {
    fill(coinColor[i][0], coinColor[i][1], coinColor[i][2]);
    circle(coinsX[i] - posX, coinsY[i] - posY, coinsRadius);
  }
  for (var i = 0; i < coinNum; i++) {
    if (dist(width/2, height/2, coinsX[i] - posX, coinsY[i] - posY) < playerRadius / 2) {
      coinsX[i] = int(random(-2000, 2000) + posX);
      coinsY[i] = int(random(-2000, 2000) + posY);
      playerRadius = sqrt((((((playerRadius / 2) * (playerRadius / 2)) * Math.PI) + ((coinsRadius / 2) * (coinsRadius / 2)) * Math.PI)) / Math.PI) * 2;
    }
  }

  for (var i = 0; i < enemyNum; i++) {
    fill(enemyColor[i][0], enemyColor[i][1], enemyColor[i][2]);
    circle(enemyX[i] - posX, enemyY[i] - posY, enemyRadius[i]);
    fill(0);
    text(i, enemyX[i] - posX, enemyY[i] - posY)
  }
  for (var i = 0; i < enemyNum; i++) {  
    if (dist(width/2, height/2, enemyX[i] - posX, enemyY[i] - posY) < playerRadius / 2 && playerRadius > enemyRadius[i]) {
      enemyX[i] = int(random(-2000, 2000) + posX);
      enemyY[i] = int(random(-2000, 2000) + posY);
      playerRadius = sqrt((((((playerRadius / 2) * (playerRadius / 2)) * Math.PI) + ((enemyRadius[i] / 2) * (enemyRadius[i] / 2)) * Math.PI)) / Math.PI) * 2;
      enemyRadius[i] = int(random(50, 150));
    }
  }
  for (var i = 0; i < enemyNum; i++) {
    if(dist(width/2, height/2, enemyX[i] - posX, enemyY[i] - posY) < enemyRadius[i] / 2 && enemyRadius[i] > playerRadius) {
      posX = 0;
      posY = 0;
      playerRadius = 50;
    }
  }
  for (var i = 0; i < enemyNum; i++) {
    if (dist(width/2, width/2, enemyX[i] - posX, enemyY[i] - posY) > 2000) {
      enemyX[i] = int(random(-2000, 2000) + posX);
      enemyY[i] = int(random(-2000, 2000) + posY);
      enemyRadius[i] = int(random(50, 150));
    }
  }
  for (var i = 0; i < coinNum; i++) {
    if (dist(width/2, width/2, coinsX[i] - posX, coinsY[i] - posY) > 2000) {
      coinsX[i] = int(random(-2000, 2000) + posX);
      coinsY[i] = int(random(-2000, 2000) + posY);;
    }
  }

  fill(0, 255, 0);
  circle((width/2), (height/2), playerRadius);
  //console.log(posX, posY)
}