function drawCircle(circleX, circleY, circleRadius, circleRed, circleGreen, circleBlue) {
  var circleColorDark = [circleRed - 30, circleGreen - 30, circleBlue - 30]
  for (var i = 0; i < circleColorDark; i++) { // making sure none of the circleColorDark values go below zero
    if (circleColorDark[i] < 0) {
      circleColorDark[i] = 0;
    }
  }

  strokeWeight(5);
  stroke(circleColorDark); // apply foodColorDark, this makes the border of the circle a slightly darker version of the original for style purposes
  fill(circleRed, circleGreen, circleBlue);
  circle(circleX, circleY, circleRadius);
  }