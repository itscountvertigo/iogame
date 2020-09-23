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

var coinColor = [];

// enemy variables/arrays
var enemyNum = 10;
var enemyX = [];
var enemyY = [];
var enemyRadius = [];

var enemyColor = [];

function setup() {
  createCanvas(width, height);

  posX = 0;
  posY = 0;

  for (var i = 0; i < coinNum; i++) {
    append(coinsX, random(-2000, 2000));
    append(coinsY, random(-2000, 2000));
    append(coinColor, [random(255), random(255), random(255)])
    
  }
  for (var i = 0; i < enemyNum; i++) {
    append(enemyX, random(-2000, 2000));
    append(enemyY, random(-2000, 2000));
    append(enemyColor, [random(255), random(255), random(255)])
  }
}  

function draw() {
  background(100);
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

  /* for (var i = 0; i < 21; i++) {
    fill(255, 0, 0);
    rect((i * 50) - posRasX, (i * 50) - posRasY, 50, 50);
  } */

  for (var i = 0; i < coinNum; i++) {
    fill(coinColor[i][0], coinColor[i][1], coinColor[i][2]);
    circle(coinsX[i] - posX, coinsY[i] - posY, 40);
  }

  for (var i = 0; i < enemyNum; i++) {
    fill(enemyColor[i][0], enemyColor[i][1], enemyColor[i][2]);
    circle(enemyX[i] - posX, enemyY[i] - posY, enemyRadius[i]);
    fill(0);
    text(i, enemyX[i] - posX, enemyY[i] - posY)
    
    if (dist(500, 500, enemyX[i] - posX, enemyY[i] - posY) < playerRadius / 2 && playerRadius > enemyRadius[i]) {
      enemyX[i] = int(random(-2000, 2000) + posX);
      enemyY[i] = int(random(-2000, 2000) + posY);
      eaten += 1;
      playerRadius = sqrt((((((playerRadius / 2) * (playerRadius / 2)) * Math.PI) + ((enemyRadius[i] / 2) * (enemyRadius[i] / 2)) * Math.PI)) / Math.PI) * 2; //sorry voor deze abomination van een regel code, luuk's fout
      enemyradius[i]=int(random(50, 150));
    }

    if(dist(500, 500, enemyX[i] - posX, enemyY[i] - posY) < enemyRadius[i] / 2 && enemyRadius[i] > playerRadius) {
      posX = 0;
      posY = 0;
      playerRadius = 50;
    }

    if (dist(500, 500, enemyX[i] - posX, enemyY[i] - posY) > 3000) {
      enemyX[i] = int(random(-2000, 2000) + posX);
      enemyY[i] = int(random(-2000, 2000) + posY);
      enemyRadius[i] = int(random(50, 150));
    }
  }

  fill(0, 255, 0);
  circle((width/2), (height/2), playerRadius);
  //console.log(posX, posY)
}