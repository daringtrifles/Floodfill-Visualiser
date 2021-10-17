let img;
linex = [];
liney = [];
let input, button, length;
length = 0;
count = 0;
distance = 0;
var area = 0;
jump = 4

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function preload() {
  img = loadImage('Screenshot 2020-05-20 at 12.01.01 PM.png');
}

function setup() {
  createCanvas(img.width, img.height);
  coords = new Array(img.width);
  visited = new Array(img.width);

  for (var i = 0; i < img.width * 2; i++) {
    coords[i] = new Array(img.height * 2);
    visited[i] = new Array(img.height * 2);
  }

  for (var a = 0; a < img.width * 2; a++) {
    for (var b = 0; b < img.height * 2; b++) {
      coords[a][b] = 0;
      visited[a][b] = 0;

    }

  }






  background(220);
  image(img, 0, 0);
  loadPixels();
}



function mouseClicked() {

  linex.push(mouseX);
  liney.push(mouseY);
  if (count == 0) {
    area_();
    count++;
  }
  floodfill(jump * floor(mouseX / jump), jump * floor(mouseY / jump));
  

}


function draw() {
  val = 1
  for (i = 0; i < 2; i++) {
    //ellipse(linex[i], liney[i], 5);
  }
  //distance = dist(linex[0], liney[0], linex[1], liney[1]);

}




function area_() {

  angleMode(DEGREES);

  const d = pixelDensity();

  for (let x = 0; x < img.width; x = x + 1) {
    for (let y = 0; y < img.height; y = y + 1) {
      const i = 4 * d * (y * d * img.width + x);
      const [r, g, b] = [pixels[i], pixels[i + 1], pixels[i + 2]]; // get colors
      if (r <= 150 || b <= 150 || g <= 150) { // if r g b all less than 150 then color will appear black


        fill('red');
        ellipse(x, y, 10);
        if (x > 0 && y > 0) {
          visited[x - 1][y] = 1;
          visited[x][y + 1] = 1;
          visited[x - 1][y + 1] = 1;
        }
        coords[x][y] = 1;
        visited[x][y] = 1;

      }
    }
  }
  //floodfill(floor(img.width / 2), floor(img.height / 2))
  //  print(area*(length/distance)*(length/distance))
}


function floodfill(a, b) {

  setTimeout(function() {
    if (a >= img.width || a < 0 || b >= img.height || b < 0 || visited[a][b] != 0) {

      return;

    } else {
      visited[a][b] = 2;
      bl = color('rgb(0,0,255)');
      set(a, b, bl);
      set(a, b + 1, bl);
      set(a + 1, b + 1, bl);
      set(a + 2, b + 1, bl);
      set(a + 1, b, bl);
      set(a - 1, b, bl);
      set(a, b - 1, bl);
      set(a + 1, b - 1, bl)
      set(a - 1, b - 1, bl);
      set(a - 1, b + 1, bl);







      updatePixels();
      area += jump * jump;
      floodfill(a - jump, b);
      floodfill(a + jump, b);
      floodfill(a, b + jump);
      floodfill(a, b - jump);
      //sleep(0.0000001)

    }
  }, 0);
  document.getElementById("area").innerHTML = "The area is " + area + ' pixels.'


}
