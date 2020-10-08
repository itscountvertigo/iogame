function eat(eaterx, eatery, eaterradius, eatenx, eateny,){
    for (var i = 0; i < eaterx.length; i++) { // check if food is eaten by enemy
        if (dist(enemyX[i] - posX, enemyY[j] - posY, eatenx[i] - posX, eateny[i] - posY) < eaterradius[j] / 2) {
          eatenx[i] = int(random(-2000, 2000) + posX);
          eateny[i] = int(random(-2000, 2000) + posY);
          eaterradius[j] = sqrt((((((eaterradius[j] / 2) * (eaterradius[j] / 2)) * Math.PI) + ((eatenradius / 2) * (eatenradius / 2)) * Math.PI)) / Math.PI) * 2; // increase size by volume
          //print(j)
          }
        }
}