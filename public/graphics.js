var cx, cy;
var t = 0;
var x, y;
var rows, cols;
var scl = 100;
var sAxis = [];
var gAxis = [];
var lightness, darkness;

var high = [];
var step = [];

var cs;

function preload() {

}

function setup() {
	cx = windowWidth;
	cy = windowHeight;

	canvas = createCanvas(cx, cy);

	rows = cy/scl;
	cols = cx/scl;

	cs = cx>900 ? cx/6.4 : cy/5.6;

	for(i=0; i<50; i++) {
		sAxis[i] = {
			"x": random(0, cx),
			"y": random(0, cy/1.5)
		}
	}

	for (i=0; i<=50; i++) {
		high[i] = map(noise(i), 0, 1, -0.3, 0.1)
		// step[i] = random(0.1, 0.2);
	}

}

function draw(){
	lightness = map(y(t), 0, cy, 10, 30)
	darkness = map(lightness, 5, 15, 0, 10)
	var c = color('hsl(218, 52%,' + lightness +'%)')
	background(c);
  stroke(255);
	noFill();

	stars();
	moon(1);
	sun(1);
	fakeTerrain();
	t += 0.005

  tm(1);
}

function stars() {

	for(i=0; i<sAxis.length; i++) {
		push()
			var a = (map(y(t), 0, cy, 0, 1))
			var color = ('rgba(255, 255, 255, ' + a +')')
			fill(color)
			noStroke();
			ellipse(sAxis[i].x, sAxis[i].y, 1)
		pop()
	}
}

function fakeTerrain() {
	push()
		translate(0, (cy/2) + 100)
		noStroke();
		fill(0)
		beginShape();
			vertex(0, 0);
			for(i=1; i<=50; i++) {
				push()
					vertex(cx * i * 0.1, cy*high[i]);
				pop()
			}
			vertex(cx, 0)
			vertex(cx, cy/2)
			vertex(0, cy/2)
		endShape();
	pop()
}

function moon(size) {
	push()
		translate(cx/2, cy/2+100);
		stroke(255);
		ellipse(x(t), y(t), size);
	pop()
	if (size<cs) {
		moon(size+cs/15);
	}
}

function sun(size) {
	var quantity = 20;
	push()
		translate(cx/2, cy/2+100);
		stroke('#ffb728');
		ellipse(-x(t), -y(t), size);
		push()
			translate(-x(t),-y(t));
			for(i=0; i<=quantity; i++) {
				rotate(TWO_PI/quantity)
				line(cs/2 + 2, 0, cs/1.6, (cs/3))
				line(cs/2 + 2, 0, cs/1.6, -(cs/3))
			}
		pop()
	pop()
		if (size<cs) {
			sun(size+cs/15)
		}
}

function x(t) {
	return sin(-t)*cy/1.5
}

function y(t) {
	return cos(t)*cy/2.5
}


function tm(size) {
	translate(0,0)
  push()
    stroke('#202020')
    strokeWeight(2)
    translate(cx-50, cy-50);
    ellipse(0, 0, size)
  pop()
  if(size<45) {
    tm(size+15)
  }
}
