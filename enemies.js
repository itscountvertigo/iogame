var preference = [360]; // variables voor kunos ai
var go;
var goMinus;
var goPlus;
var record;
var minusRecord;
var preferenceNumber;

function drawEnemies(enemyX, enemyY, enemyRadius, enemyRed, enemyGreen, enemyBlue) {
  var enemyColorDark = [enemyRed - 30, enemyGreen - 30, enemyBlue - 30];

  for (i = 0; i < enemyColorDark; i++) {
    if (enemyColorDark[i] < 0) {
      enemyColorDark[i] = 0;
    }
  }

  strokeWeight(5);
  stroke(enemyColorDark); // apply enemyColorDark, this makes the border of the circle a slightly darker version of the original for style purposes
  fill(enemyRed, enemyGreen, enemyBlue);
  circle(enemyX - posX, enemyY - posY, enemyRadius);
  fill(0);
  text(i, enemyX - posX, enemyY - posY); // show i on top of enemy
}

function updateBots() {
  for (var i = 0; i < enemyX.length; i++) {
    for (var j = 0; j < 360; j++) {
      preference[j] = 0;
    }
    for (var j=0; j<enemyX.length; j++) {
      if (enemySize[i]<enemySize[i]) {
      //  preference[int(degrees(atan2(enemyX[i]-enemyX[i], enemyY[i]-enemyY[i]))+180)]+=10;
        piramid(int(degrees(atan2(enemyX[i]-enemyX[i], enemyY[i]-enemyY[i]))+180),(1000/dist(enemyX[i],enemyY[i],enemyX[i],enemyY[i])),int(1000/enemySize[i]));
      }
      if (enemySize[i]>=enemySize[i]) {
       // preference[int(degrees(atan2(enemyX[i]-enemyX[i], enemyY[i]-enemyY[i]))+180)]-=10;
        piramid(int(degrees(atan2(enemyX[i]-enemyX[i], enemyY[i]-enemyY[i]))+180),-(1000/dist(enemyX[i],enemyY[i],enemyX[i],enemyY[i])),int(1000/enemySize[i]));
      }
    }
    for(var j=0;j<coinsX.size();j++){
    //  preference[int(degrees(atan2(coinsX[i]-enemyX[i], coinsY[i]-enemyY[i]))+180)]+=1;
    }
    record=0;
    minusRecord=0;
    for(var j=0;j<360;j++){
      if(preference[j]>record){
        record=preference[j];
        go=j;
      }
    }
    raycast(0, 0, sin(radians(go))*50, sin(radians(go+90))*50);
    enemyX.set(i,enemyX[i]+(raycasty*(((1/(enemySize[i]/100))/2)+1)*2));
    enemyY.set(i,enemyY[i]+(raycastx*(((1/(enemySize[i]/100))/2)+1)*2));
    if (i==0) {
      noStroke();
      fill(0);
      for (var j=0; j<360; j++) {
        rect(j,100,1,preference[j]*-1);
      }
    }
    for (var j=0; j<enemyX.length; j++) {
      if (i!=j) {
        if (enemySize[i] > enemySize[i]) {
          if (dist(enemyX[i], enemyY[i], enemyX[j], enemyY[j])<enemySize[i]/2) {
            enemyRadius[i] = sqrt(((((enemyRadius[i]/2)*(enemyRadius[i]/2))*Math.PI+((enemyRadius[j]/2)*(enemyRadius[j]/2))*Math.PI)/Math.PI)*2);
            enemyX[j] = int(random(-2000, 2000) + posX);
            enemyY[j] = int(random(-2000, 2000) + posY);
          }
        }
      }
    }
  }
}

function priamid(number, strength, length){
  for(var i = 0; i < length; i++ ){
    minus(i,number);
    preference[preferenceNumber] += strength * (length - i);
  }
  for(var i=1;i<length; i++){
    plus(i,number);
    preference[preferenceNumber] += strength * (length - i);
  }
}

function plus(add, digit){
  preferenceNumber = digit;
  while(add > 0){
    preferenceNumber++;
    add--;
    if(preferenceNumber == 360){
      preferenceNumber = 0;
    }
  }
}
function minus(add, digit){
  preferenceNumber = digit;
  while(add > 0){
    preferenceNumber--;
    add--;
    if(preferenceNumber ==- 1){
      preferenceNumber = 359;
    }
  }
}
