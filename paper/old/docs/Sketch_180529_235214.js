//https://en.wikipedia.org/wiki/Spirograph
let 
    path = new Path.Circle({center:[200,200], radius:50, strokeColor:'black'}),
    isPaused = false
    roulette = new Path({strokeColor:"magenta"}),
    PI = Math.PI;


var circle = new Path.Circle({radius:12});
circle.strokeColor = 'red'

// s=r*degree
//_u noktada yar1 çap1 almam1z1n tek yolu, bir kez "path"olu_turuldu mu
//,üreticisine dair bütün veri yok oluyor, belki bunun için kendim bir
//wrapper metod yazabilirim.
//çember için snap metodu. radyan derece al1yor.
//snapToDegree asl1nda.
Path.prototype.snapTo = function(path, degree){
    degree = degree || 0;
    var radius = path.bounds.width / 2;
    this.position = path.getPointAt(radius*degree);
}
//herhangi bir yol için.
Path.prototype.snapToPoint = function(path, point){
    point = point || 0;
    this.position = path.getPointAt(point);
}
//herhangi bir yol için.
Path.prototype.snapToPercent = function(path, percent){
    //mod100 120% için önemli.
    percent = percent || 0;
    let pos = path.length * ((percent % 100) / 100);
    this.position = path.getPointAt(pos);
   
}

Path.prototype.animate = function(path, speed, draw, initial){
    initial = initial || 0;
    speed = speed || 1.4;
    draw = draw || false;
    
    this.onFrame = function(){
        if(isPaused) return;
        this.snapToPercent(path,initial);
        initial += 1 * speed;
        
        if(draw){
            // console.log(this.position);
            roulette.add(this.position);
            if(this.position === roulette.segments[0]){
                console.log("its same");
            }else{
                // console.log("not same");
            }
            // console.log(this.position, roulette.segments[0]);
        }
        
    }
}

Path.prototype.createPen = function(){
    var circle2 = new Path.Circle(0,0,4);
    circle2.strokeColor = 'blue';
    circle2.fillColor = 'blue';
    circle2.snapTo(this,12,true);
}

circle.snapTo(path,PI/2);
circle.animate(path, 0.25);

//var initial = 0;
// circle.onFrame = function(){
//     let speed = 1.2;
//     this.snapToPercent(path,initial);
//     initial += 0.5 * speed;
// }

var circ2 = new Path.Circle({radius:4, fillColor:"blue"});
circ2.snapTo(circle);
circ2.animate(circle, 8, true);


function onKeyDown(event) {
	if (event.key == 'space') {
		isPaused = !isPaused;
		console.log("isStopped:", isPaused)
	}
	
	if(event.key == "a"){
	    roulette.simplify(1);
	}
}


// console.log(Math.PI)