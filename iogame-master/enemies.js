var preference = [360]; // variables voor kunos ai
var go;
var goMinus;
var goPlus;
var record;
var minusRecord;
var preferenceNumber;
var raycastbotX;
var raycastbotY;

function updateBots() {
  for (var i = 0; i < enemyX.length; i++) {
    //print("hoi");
    for (var j = 0; j < 360; j++) {
      preference[j] = 0;
    }
    for (var j=0; j<enemyX.length; j++) {
      if (enemyRadius[i]<enemyRadius[j]) {
      //  preference[int(degrees(atan2(enemyX[i]-enemyX[i], enemyY[i]-enemyY[i]))+180)]+=10;
        piramid(int(degrees(atan2(enemyX[i]-enemyX[j], enemyY[i]-enemyY[j]))+180),(1000/dist(enemyX[i],enemyY[i],enemyX[j],enemyY[j])),int(1000/enemyRadius[i]));
        print("hoi");
      }
      if (enemyRadius[i]>=enemyRadius[j]) {
       // preference[int(degrees(atan2(enemyX[i]-enemyX[i], enemyY[i]-enemyY[i]))+180)]-=10;
        piramid(int(degrees(atan2(enemyX[i]-enemyX[j], enemyY[i]-enemyY[j]))+180),-(1000/dist(enemyX[i],enemyY[i],enemyX[j],enemyY[j])),int(1000/enemyRadius[i]));
      }
    }
    for(var j=0;j<foodX;j++){
    //  preference[int(degrees(atan2(coinsX[i]-enemyX[i], coinsY[i]-enemyY[i]))+180)]+=1;
    }
    record=0;
    minusRecord=0;
    for(var j=0;j<360;j++){
      if(preference[j]>=record){
        record=preference[j];
        go=j;
      }
    }
    //print(go);
    var mouseDistX =  (sin(radians(go))*50)*-1;
    var mouseDistY =  (sin(radians(go+90))*50)*-1;
    //print((sin(radians(go))*50)*-1);
    //print((sin(radians(go+90))*50)*-1);
    if (mouseDistX > 0 && mouseDistY > 0) { // x greater, y greater
        raycastbotX = (mouseDistY / (mouseDistY + mouseDistX));
        raycastbotY = (mouseDistX / (mouseDistX + mouseDistY));

    } else if (mouseDistX > 0 && mouseDistY < 0) { // x greater, y smaller
        raycastbotX = (((mouseDistY * -1) / ((mouseDistY * -1) + mouseDistX)) * -1);
        raycastbotY = (mouseDistX / ((mouseDistY * -1) + mouseDistX));

    } else if (mouseDistX < 0 && mouseDistY > 0) { // x smaller, y greater
        raycastbotX = (mouseDistY / (mouseDistY + (mouseDistX * -1)));
        raycastbotY = (((mouseDistX * -1) / (mouseDistY + (mouseDistX * -1))) * -1);

    } else if (mouseDistX < 0 && mouseDistY < 0) { // x smaller, y smaller
        raycastbotX = ((mouseDistY/(mouseDistY + mouseDistX)) * -1);
        raycastbotY = ((mouseDistX / (mouseDistY + mouseDistX)) * -1);
    }
    //raycast(0, 0, sin(radians(go))*50, sin(radians(go+90))*50);
    //print(raycastbotX);
    //print(raycastbotY);
    enemyX[i]=enemyX[i]+(raycastbotY/**(((1/(enemyRadius[i]/100))/2)+1)*2*/);
    enemyY[i]=enemyY[i]+(raycastbotX/**(((1/(enemyRadius[i]/100))/2)+1)*2*/);
    if (i==0) {
      noStroke();
      fill(0);
      for (var j=0; j<360; j++) {
        rect(j,100,1,preference[j]*-1);
      }
    }/*
    for (var j=0; j<enemyX.length; j++) {
      if (i!=j) {
        if (enemyRadius[i] > enemyRadius[i]) {
          if (dist(enemyX[i], enemyY[i], enemyX[j], enemyY[j])<enemyRadius[i]/2) {
            enemyRadius[i] = sqrt(((((enemyRadius[i]/2)*(enemyRadius[i]/2))*Math.PI+((enemyRadius[j]/2)*(enemyRadius[j]/2))*Math.PI)/Math.PI)*2);
            enemyX[j] = int(random(-2000, 2000) + posX);
            enemyY[j] = int(random(-2000, 2000) + posY);
          }
        }
      }
    }*/
  }
}

function piramid(number, strength, length){
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
