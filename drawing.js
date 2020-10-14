function drawCircle(circleX, circleY, circleRadius, circleRed, circleGreen, circleBlue, circleName) {
  var circleColorDark = [circleRed - 30, circleGreen - 30, circleBlue - 30];
  for (var i = 0; i < circleColorDark; i++) { // making sure none of the circleColorDark values go below zero
    if (circleColorDark[i] < 0) {
      circleColorDark[i] = 0;
    }
  }

  strokeWeight(5);
  stroke(circleColorDark); // apply foodColorDark, this makes the border of the circle a slightly darker version of the original for style purposes
  fill(circleRed, circleGreen, circleBlue);
  circle(circleX, circleY, circleRadius);
  strokeWeight(1);
  if (circleRed + circleGreen + circleBlue > 380) {
    fill(0);
  } else {
    fill(255);
  }
  textAlign(CENTER);
  text(circleName, circleX, circleY);
  }