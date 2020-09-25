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

  posRasX = 0;
  posRasY = 0;
  for (var i = 0; i < coinNum; i++) { // add random values to coin arrays (random x, y, color and radius)
    append(coinsX, random(-2000, 2000));
    append(coinsY, random(-2000, 2000));
    append(coinColor, [random(255), random(255), random(255)]); // makes this an array of arrays
    append(enemyRadius, int(random(50, 150))); // thx cas
  }
  for (var i = 0; i < enemyNum; i++) { // add random values to enemy arrays (random x, y and color)
    append(enemyX, random(-2000, 2000));
    append(enemyY, random(-2000, 2000));
    append(enemyColor, [random(255), random(255), random(255)]); // makes this an array of arrays
  }
}  

function draw() { // this function loops every frame
  background(200);
  raycast(width/2, height/2, mouseX, mouseY)
  //console.log("x = ", raycastX, "y = ", raycastY)

  // updating posX/posY with raycasting
  posX -= raycastY * speed;
  posY -= raycastX * speed;

  // i have no idea what this does something with moving the grid
  posRasY -= raycastX * speed;
  posRasX -= raycastY * speed;
  
  if (posRasX > 50) {
    posRasX -= 50;
  }
  if (posRasX < 0) {
    posRasX += 50;
  }
  if (posRasY > 50) {
    posRasY -= 50;
  }
  if (posRasY < 0) {
    posRasY += 50;
  }

  for (var i = 0; i < (width/50)+1; i ++) { // drawing/moving grid
    for (var j = 0; j < (height/50)+1; j ++) {
      strokeWeight(1);
      stroke(200); // light gray lines
      fill(255);
      rect((i * 50) - posRasX, (j * 50) - posRasY, 50, 50); // draws a lot of rectangles as a grid
    }
  }

  for (var i = 0; i < coinNum; i++) { // drawing coins
    var coinColorDark = [coinColor[i][0] - 30, coinColor[i][1] - 30, coinColor[i][2] - 30]; // darken original coin color to make slightly darker border

    for (var j = 0; j < coinColorDark; j++) { // making sure none of the coinColorDark values go below zero
      if (coinColorDark[j] < 0) {
        coinColorDark[j] = 0;
      }
    }

    strokeWeight(5);
    stroke(coinColorDark); // apply coinColorDark, this makes the border of the circle a slightly darker version of the original for style purposes
    fill(coinColor[i][0], coinColor[i][1], coinColor[i][2]);
    circle(coinsX[i] - posX, coinsY[i] - posY, coinsRadius);
  }

  for (var i = 0; i < coinNum; i++) { // eating coins
    if (dist(width/2, height/2, coinsX[i] - posX, coinsY[i] - posY) < playerRadius / 2) {
      coinsX[i] = int(random(-2000, 2000) + posX);
      coinsY[i] = int(random(-2000, 2000) + posY);
      playerRadius = sqrt((((((playerRadius / 2) * (playerRadius / 2)) * Math.PI) + ((coinsRadius / 2) * (coinsRadius / 2)) * Math.PI)) / Math.PI) * 2; // kuno and luuk made this to increase player size by volume
    }
  }

  for (var i = 0; i < enemyNum; i++) { // drawing enemies with circle()
    var enemyColorDark = [enemyColor[i][0] - 30, enemyColor[i][1] - 30, enemyColor[i][2] - 30]; // darken original enemy color to make slightly darker border

    for (var j = 0; j < enemyColorDark; j++) { // making sure none of the enemyColorDark values go below zero
      if (enemyColorDark[j] < 0) {
        enemyColorDark[j] = 0;
      }
    }

    strokeWeight(5);
    stroke(enemyColorDark); // apply enemyColorDark, this makes the border of the circle a slightly darker version of the original for style purposes
    fill(enemyColor[i][0], enemyColor[i][1], enemyColor[i][2]);
    circle(enemyX[i] - posX, enemyY[i] - posY, enemyRadius[i]);
    fill(0);
    text(i, enemyX[i] - posX, enemyY[i] - posY); // show i on top of enemy
  }

  for (var i = 0; i < enemyNum; i++) {  
    if (dist(width/2, height/2, enemyX[i] - posX, enemyY[i] - posY) < playerRadius / 2 && playerRadius > enemyRadius[i]) {
      enemyX[i] = int(random(-2000, 2000) + posX);
      enemyY[i] = int(random(-2000, 2000) + posY);
      playerRadius = sqrt((((((playerRadius / 2) * (playerRadius / 2)) * Math.PI) + ((enemyRadius[i] / 2) * (enemyRadius[i] / 2)) * Math.PI)) / Math.PI) * 2; // kuno and luuk made this to increase player size by volume
      enemyRadius[i] = int(random(50, 150));
    }
  }

  for (var i = 0; i < enemyNum; i++) { // respawn
    if(dist(width/2, height/2, enemyX[i] - posX, enemyY[i] - posY) < enemyRadius[i] / 2 && enemyRadius[i] > playerRadius) {
      posX = 0;
      posY = 0;
      enemyRadius[i] = sqrt((((((playerRadius / 2) * (playerRadius / 2)) * Math.PI) + ((enemyRadius[i] / 2) * (enemyRadius[i] / 2)) * Math.PI)) / Math.PI) * 2; // kuno and luuk made this to increase player size by volume
      playerRadius = 50;
    }
  }

  for (var i = 0; i < enemyNum; i++) { // despawn and respawn enemies if they are too far away
    if (dist(width/2, width/2, enemyX[i] - posX, enemyY[i] - posY) > 2000) {
      enemyX[i] = int(random(-2000, 2000) + posX);
      enemyY[i] = int(random(-2000, 2000) + posY);
      enemyRadius[i] = int(random(50, 150));
    }
  }

  for (var i = 0; i < coinNum; i++) { // despawn and respawn coins if they are too far awaw
    if (dist(width/2, width/2, coinsX[i] - posX, coinsY[i] - posY) > 2000) {
      coinsX[i] = int(random(-2000, 2000) + posX);
      coinsY[i] = int(random(-2000, 2000) + posY);;
    }
  }

  var playerColor = [0, 255, 0];

  var playerColorDark = [playerColor[0] - 30, playerColor[1] - 30, playerColor[2] - 30];

  for (var j = 0; j < playerColorDark; j++) { // making sure none of the playerColorDark values go below zero
    if (playerColorDark[j] < 0) {
      playerColorDark[j] = 0;
    }
  }

  strokeWeight(5);
  stroke(playerColorDark);
  fill(playerColor);
  circle((width/2), (height/2), playerRadius);
  console.log(posX, posY)
}