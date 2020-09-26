function drawFood(foodX, foodY, foodRadius, foodRed, foodGreen, foodBlue) {
    var foodColorDark = [foodRed - 30, foodGreen - 30, foodBlue - 30]; // darken original coin color to make slightly darker border

    for (var i = 0; i < foodColorDark; i++) { // making sure none of the coinColorDark values go below zero
      if (coinColorDark[i] < 0) {
        coinColorDark[i] = 0;
      }
    }
    strokeWeight(5);
    stroke(foodColorDark); // apply foodColorDark, this makes the border of the circle a slightly darker version of the original for style purposes
    fill(foodRed, foodGreen, foodBlue);
    circle(foodX - posX, foodY - posY, foodRadius);
}