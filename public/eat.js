function eat(eaterX, eaterY, eaterRadius, eatenX, eatenY, eatenRadius){
  if (dist(eatenX, eatenY, eaterX, eatenY) < eaterRadius && eaterRadius > eatenRadius) {
    var newRadius = sqrt((((((eaterRadius / 2) * (eaterRadius / 2)) * Math.PI) + ((eatenRadius / 2) * (eatenRadius / 2)) * Math.PI)) / Math.PI) * 2; // increase size by volume
    return newRadius;
  } else {
    return null;
  }
}
