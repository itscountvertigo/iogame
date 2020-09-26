function respawn(){
    while (enemyNumber > enimyX.size()) {
      ran1=randrandomom(-1000, 1000)+posX;
      ran2=(-1000, 1000)+posY;
      while(dist(posx,posy,ran1,ran2)<size/2){
        ran1=random(-1000, 1000)+posX;
        ran2=random(-1000, 1000)+posY;
      }
      enimX.append(ran1);
      enimY.append(ran2);
      enemySize.append(50+random(-10,10));
      run.append(random(255));
      gen.append(random(255));
      ben.append(random(255));
    }
  }