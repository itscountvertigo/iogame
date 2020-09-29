const speed = 5;

// player variables
var posX;
var posY;
var posRasX;
var posRasY;
var posDrawX;
var posDrawY;
var playerRadius = 50;
var multi = 2;
var toobig = 125;

// food variables/arrays
var foodNum = 300;
var foodX = [];
var foodY = [];
var foodRadius = 20;

var foodColor = [];

// enemy variables/arrays
var enemyNum = 10;
var enemyX = [];
var enemyY = [];
var enemyRadius = [];

var enemyColor = [];

function windowResized() {
  console.log('resized');
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  background(200)
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1')

  posX = 0;
  posY = 0;

  posRasX = 0;
  posRasY = 0;

  for (var i = 0; i < foodNum; i++) { // add random values to food arrays (random x, y, color and radius)
    append(foodX, random(-2000, 2000));
    append(foodY, random(-2000, 2000));
    append(foodColor, [random(255), random(255), random(255)]); // makes this an array of arrays
  }
  
  for (var i = 0; i < enemyNum; i++) { // add random values to enemy arrays (random x, y and color)
    append(enemyX, random(-2000, 2000));
    append(enemyY, random(-2000, 2000));
    append(enemyColor, [random(255), random(255), random(255)]); // makes this an array of arrays
    append(enemyRadius, random(50, 150));
  }
}  

function draw() { // this function loops every frame
  background(200);
  raycast(windowWidth/2, windowHeight/2, mouseX, mouseY)
  console.log("x = ", raycastX, "y = ", raycastY)

  // updating posX/posY with raycasting
  posX -= (raycastY * 5);
  posY -= (raycastX * 5);

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

  for (var i = 0; i < (windowWidth/50)+1; i ++) { // drawing/moving grid
    for (var j = 0; j < (windowHeight/50)+1; j ++) {
      strokeWeight(1);
      stroke(200); // light gray lines
      fill(255);
      rect((i * 50) - posRasX, (j * 50) - posRasY, 50, 50); // draws a lot of rectangles as a grid
    }
  }

  for (var i = 0; i < foodNum; i++) { // FOOD LOOP
    drawCircle(foodX[i] - posX, foodY[i] - posY, foodRadius, foodColor[i][0], foodColor[i][1], foodColor[i][2]); // draw food
  }

  for (var i = 0; i < foodNum; i++) { // FOOD LOOP
    if (dist(windowWidth/2, windowHeight/2, foodX[i] - posX, foodY[i] - posY) < playerRadius / 2) { // check if food is eaten by player
      foodX[i] = int(random(-2000, 2000) + posX);
      foodY[i] = int(random(-2000, 2000) + posY);
      playerRadius = sqrt((((((playerRadius / 2) * (playerRadius / 2)) * Math.PI) + ((foodRadius / 2) * (foodRadius / 2)) * Math.PI)) / Math.PI) * 2; // increase size by volume
    }
  }

  for (var j = 0; j < enemyNum; j++) { // check if food is eaten by enemy
    if (dist(enemyX[j] - posX, enemyY[j] - posY, foodX[i] - posX, foodY[i] - posY) < enemyRadius[j] / 2) {
      foodX[i] = int(random(-2000, 2000) + posX);
      foodY[i] = int(random(-2000, 2000) + posY);
      enemyRadius[j] = sqrt((((((enemyRadius[j] / 2) * (enemyRadius[j] / 2)) * Math.PI) + ((foodRadius / 2) * (foodRadius / 2)) * Math.PI)) / Math.PI) * 2; // increase size by volume
      //print(j)
      }
    }

  for (var i = 0; i < foodNum; i++) { // despawn and respawn food if they are too far awaw
    if (dist(windowWidth/2, windowHeight/2, foodX[i] - posX, foodY[i] - posY) > 2000) {
      foodX[i] = int(random(-2000, 2000) + posX);
      foodY[i] = int(random(-2000, 2000) + posY);;
      }
    }

  for (var i = 0; i < enemyNum; i++) {  // ENEMY LOOP
    drawCircle(enemyX[i] - posX, enemyY[i] - posY, enemyRadius[i], enemyColor[i][0], enemyColor[i][1], enemyColor[i][2]);

    if (dist(width/2, height/2, enemyX[i] - posX, enemyY[i] - posY) < playerRadius / 2 && playerRadius > enemyRadius[i]) { // check if enemy is eaten by player
      enemyX[i] = int(random(-2000, 2000) + posX);
      enemyY[i] = int(random(-2000, 2000) + posY);
      playerRadius = sqrt((((((playerRadius / 2) * (playerRadius / 2)) * Math.PI) + ((enemyRadius[i] / 2) * (enemyRadius[i] / 2)) * Math.PI)) / Math.PI) * 2; // increase size by volume
    }
  }

  for (var j = 0; j < enemyNum; j++) { // check if enemy is eaten by other enemy 
      if (dist(enemyX[j] - posX, enemyY[j] - posY, enemyX[i] - posX, enemyY[i] - posY) < enemyRadius[j] / 2) {
        enemyX[i] = int(random(-2000, 2000) + posX);
        enemyY[i] = int(random(-2000, 2000) + posY);
        enemyRadius[j] = sqrt((((((enemyRadius[j] / 2) * (enemyRadius[j] / 2)) * Math.PI) + ((enemyRadius[i] / 2) * (enemyRadius[i] / 2)) * Math.PI)) / Math.PI) * 2; // increase size by volume
        //print(j)
        }
      }

  for (var i = 0; i < enemyNum; i++) { 
    if(dist(windowWidth/2, windowHeight/2, enemyX[i] - posX, enemyY[i] - posY) < enemyRadius[i] / 2 && enemyRadius[i] > playerRadius) { // check if player is being eaten by enemy (RESPAWN!)
      enemyRadius[i] = sqrt((((((playerRadius / 2) * (playerRadius / 2)) * Math.PI) + ((enemyRadius[i] / 2) * (enemyRadius[i] / 2)) * Math.PI)) / Math.PI) * 2; // increase size by volume
      alert("You dead boy");
      posX = 0;
      posY = 0;
      playerRadius[i] = 50;
    } 
  }

  for (var i = 0; i < enemyNum; i++) { // despawn and respawn enemies if they are too far away
    if (dist(windowWidth/2, windowWidth/2, enemyX[i] - posX, enemyY[i] - posY) > 2000) {
      enemyX[i] = int(random(-2000, 2000) + posX);
      enemyY[i] = int(random(-2000, 2000) + posY);
      enemyRadius[i] = int(random(50, 150));
    }
  }

  drawCircle(windowWidth / 2, windowHeight / 2, playerRadius, 0, 255, 0);
}