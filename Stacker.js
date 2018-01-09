//Original code by A Game A Day https://github.com/Kaelinator/AGAD
//Modified by Neil Woodroffe
const DIMENSIONS = { width: 315, height: 765 }; //changed dimensions to better replicate arcade version

const WIDTH = 7; // how many cells can fit
const STARTING_WIDTH = 3; // base cell count

/* highest stack */
//const MID_HEIGHT = Math.floor(DIMENSIONS.height / (DIMENSIONS.width / WIDTH) / 2);
const HEIGHT = Math.floor(DIMENSIONS.height / (DIMENSIONS.width / WIDTH)/1.17); //changed height of play field

var grid = []; // the stack

var score;
var playing; // false = game over

function setup() {

  createCanvas(DIMENSIONS.width, DIMENSIONS.height);

	/* intialize values */
	initializeGrid();
	score = 0;
	playing = true;

	frameRate(5); // speed of the game
  textAlign(CENTER);
  //textSize(40);

  
  
}

function draw() {
  

  //frameRate(2); // speed of the game //used to test game at constant speed

  background(51);

  handleGrid();

  drawTitle(); //added function for title

	drawScore();

  drawGameOver();

  drawYouWin(); //added function to display You Win
  
  stroke(255);
  line(0, 90, 315, 90); //added a top line
  

}

/**
 * handles user input
 */
function keyPressed() {

  if (keyCode != 32)
		return;

  var y = grid.length - 1; // height of the stack
  var cellCount = grid[y].stop(grid[y - 1]); // how many cells are still stackable

  if (cellCount < 1) {
		// no more stackable cells

    endGame();
    return;
  }

  frameRate(5 + score); // increase difficulty

  //if (++y > MID_HEIGHT) {
    // too high to see new stacks
    if (++y > HEIGHT) { //Changed to HEIGHT

    for (var i = 0; i < y; i++) {
			// translate stack down

      grid[i].y--;
    }
  }

  score = y;

  //grid.push(new Row((y > MID_HEIGHT) ? MID_HEIGHT : y, cellCount)); // push new Row
  grid.push(new Row((y > HEIGHT) ? HEIGHT : y, cellCount)); // push new Row
}

/**
 * updates & draws Rows
 */
function handleGrid() {

  var size = width / WIDTH; // size of each cell

  fill("#FF0000");
  stroke(255);
  strokeWeight(3);

  for (var y = 0; y < grid.length; y++) {
		// loop through Rows

    if (grid[y].dynamic) {
			// only update if the Row is in focus

			grid[y].update();
		}

    grid[y].draw(size);
  }
}
/**
 * draws the title
 */
function drawTitle() {
  
    stroke(0);
    fill("#FFFF00");
    textSize(30);
    text("STACK TO THE TOP", width / 2, 45); 
  }


/**
 * draws the score
 */
function drawScore() {

	noStroke();
  fill("WHITE");
  textSize(30);
  //text(score, width / 1.1, 80);
  text(score, width / 2, 80);
}

/**
 * draws You Win message and ends game
 */
function drawYouWin() {
  if (score >= 15) {
    stroke(0);
    fill("#FFFF00");
    textSize(50);
    text("You Win!", width / 2, height / 2);
    textSize(20);
    text("Press F5 to replay", width / 2, height / 3);
    noLoop();
  }
  }

/**
 * ends the game
 */
function endGame() {

  noLoop();

  playing = false;
  
}

/**
 * draws game over message
 */
function drawGameOver() {

	if (!playing) {

    stroke(0);
    fill("#FFFF00");
    textSize(50);
    text("Game Over!", width / 2, height / 2);
    textSize(20);
    text("Press F5 to replay", width / 2, height / 3);
    textSize(50);
  }
}

/**
 * resets the grid
 */
function initializeGrid() {

  grid = [];

  grid.push(new Row(0, STARTING_WIDTH));
}
