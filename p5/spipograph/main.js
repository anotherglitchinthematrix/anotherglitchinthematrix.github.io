var bg = "242, 242, 242";
var colors = ["red", "#ff0055", "#00aaff", "indigo", "teal"];
var a = 0, b = 0, c = 0;
var col = 0;
var path = [];
function setup(){
    // console.log("setup");
    createCanvas(windowWidth,windowHeight);
    background(bg);
    // noFill();
    // stroke("#cccccc");
    // strokeWeight(1);
    // smooth();
    // ellipse(windowWidth/2, windowHeight/2, 120, 120);
    //var x = new Circle(120);
    //x.draw();
    //x.radius = 20;
    //x.draw();
    colorMode(HSB, 255);
}

function draw(){
    
    background(bg);
    
    // push();
    var x = new Circle(256);
    x.draw();
    var y = new Circle(128);
    y.snap(x, a, 0).draw();
	var z = new Circle(64);
    z.snap(y, b, -1).draw();
    var q = new Circle(32);
    q.snap(z, c, 1).draw();
	b -= 0.0005*PI;
    a += 0.01*PI;
    c -= 0.01*PI;
    // point(z.position.x, z.position.y)
    // pop();

    path.push(createVector(q.position.x, q.position.y));
    beginShape();
    
    stroke(col%360, 255, 255);
    col++;
    noFill();
    for (var pos of path) {
      vertex(pos.x, pos.y);
    }
    endShape();
    // console.log(path.length);
}

var Circle = function (radius, position, color){
    this.radius = radius;
    this.position = position || {x:windowWidth/2, y:windowHeight/2};
    this.color = color || "#cccccc";
}

Circle.prototype.snap = function(circle, angle, mode){
    angle = angle||0;
    mode = Math.sign(mode) || 0 ; // -1: inside, 0:center, 1:outside
    var r = circle.radius + mode * this.radius,
        x = circle.position.x + r * Math.cos(angle),
        y = circle.position.y + r * Math.sin(angle);
    
    this.position = {
        x:x,
        y:y
    }
    return this;
}

Circle.prototype.draw = function(){
    noFill();
    smooth();
    stroke(this.color);
    ellipse(this.position.x,this.position.y,this.radius * 2,this.radius * 2);
    return this;
}
