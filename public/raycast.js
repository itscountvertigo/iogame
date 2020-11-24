var raycastX;
var raycastY;

function raycast(pointX, pointY, mouseX, mouseY) {
    var mouseDistX = pointX - mouseX;
    var mouseDistY = pointY - mouseY;

    if (mouseDistX > 0 && mouseDistY > 0) { // x greater, y greater
        raycastX = (mouseDistY / (mouseDistY + mouseDistX));
        raycastY = (mouseDistX / (mouseDistX + mouseDistY));

    } else if (mouseDistX > 0 && mouseDistY < 0) { // x greater, y smaller
        raycastX = (((mouseDistY * -1) / ((mouseDistY * -1) + mouseDistX)) * -1);
        raycastY = (mouseDistX / ((mouseDistY * -1) + mouseDistX));

    } else if (mouseDistX < 0 && mouseDistY > 0) { // x smaller, y greater
        raycastX = (mouseDistY / (mouseDistY + (mouseDistX * -1)));
        raycastY = (((mouseDistX * -1) / (mouseDistY + (mouseDistX * -1))) * -1);

    } else if (mouseDistX < 0 && mouseDistY < 0) { // x smaller, y smaller
        raycastX = ((mouseDistY/(mouseDistY + mouseDistX)) * -1);
        raycastY = ((mouseDistX / (mouseDistY + mouseDistX)) * -1);
    }
}
