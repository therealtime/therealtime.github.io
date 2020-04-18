var streams = 4;

var maxRadius;
var destPointX;
var destPointY;
var beginX = new Array(streams); // Initial x-coordinate
var beginY = new Array(streams); //Current y-coordinate
var rad = new Array(streams);
var deg = new Array(streams);
var pulses;
var dynRad = 1;
var first = false;

//this can be second dimension of an array for multiple looping radii
var radius; //Radius of initial circle

let bgCount = 0;
let numDots = 0;//if 0, doesn't delete any dots
var eclDimStart = 40;
var eclDim;
let degStep = .3;
let frameStart = 5;
let frameBump = 1.2;
let margin = 0.85;
var radSwitch = (1-margin);
let newFrame;
let decel = .8;
let accel = 1.1;

var canvas;

function calibrate(){

	destPointX = windowWidth/2;
	destPointY = windowHeight/2;
	if(windowWidth < windowHeight)
	{
		maxRadius = margin*destPointX;
	}else{
		maxRadius = margin*destPointY;
	}
	radius = maxRadius;
	newFrame = frameStart;
	eclDim = eclDimStart;

	//the problem with 3 streams is somewhere here with beginX/beginY
	var i;
	for(i = 0; i < streams; i++){
		rad[i] = ((2*PI/streams) * i) + (2*PI/3); //center at 3PI/2
		deg[i] = round(rad[i]*(180/PI));
		if(deg[i] >= 360){
			deg[i] -= 360;
		}

		beginX[i] = (cos(deg[i]) * radius) + destPointX;
		beginY[i] = (sin(deg[i]) * radius) + destPointY;
	}
}

function windowResized() {

	first = true;
	resizeCanvas(windowWidth, windowHeight);
	background(0);
	calibrate();
}

function setup() {

	first = true;
	canvas = createCanvas(windowWidth, windowHeight);
	background(0);
	frameRate(frameStart);
	calibrate();
	console.log("Got to graphic")

}

function draw() {

	  radius = radius * decel;

  if(frameBump != 1){
	  newFrame = newFrame * frameBump;
	  frameRate(newFrame);
  }

  if(numDots != 0)
	{
	  if(bgCount == numDots){
		bgCount = 0;
		background(0);
	  }
	    bgCount++;
	}
	eclDim = eclDim * decel;

	var j, oldX, oldY;
	for(j = 0; j < (streams-1); j++){

		oldX = beginX[j];
		oldY = beginY[j];

		beginX[j] = (cos(deg[j]) * radius) + destPointX;
		beginY[j] = (sin(deg[j]) * radius) + destPointY;
		stroke(240, 248, 255);

		fill(color(240,248,255));
		ellipse(beginX[j], beginY[j], eclDim, eclDim);

		deg[j] -= degStep;
		if(deg[j] >= 360){
			deg[j] -= 360;
		}
	}
}
