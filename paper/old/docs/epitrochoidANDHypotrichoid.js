let 
    path = new Path.Circle({center:[200,200], radius:50, strokeColor:'black'}),
    inner = new Path.Circle({radius:12, strokeColor:'red'});

Path.prototype.snapTo = function(path, degree){
    degree = degree || 0;
    
    var targetR = path.bounds.width / 2;
    var selfR = this.bounds.width / 2;
    
    
    var p = new Point(Math.cos(degree), Math.sin(degree));
    
    
    var centerPos = path.getPointAt((targetR)*degree);
    var outerPos = centerPos - p * selfR;
    var innerPos = centerPos + p * selfR;
    
    // var showPinner = new Path.Circle({position:innerPos, radius:2, strokeColor:"blue"});
    // var showPouter = new Path.Circle({position:outerPos, radius:2, strokeColor:"blue"});
    // var d = new Path.Line({from:innerPos, to:outerPos, strokeColor:"black"});
    var d = new Path.Line({from:innerPos, to:outerPos, strokeColor:"black"});
    d.rotate(degree*12, innerPos);
    
    this.position = innerPos;
}

var initialPercent = 0;
snap = Math.PI/4;
inner.snapTo(path, snap);
inner.onFrame = function(){
    // inner.snapTo(path,initialPercent%100/100 * 2 * Math.PI);
    // initialPercent += 0.5;
}


// //https://en.wikipedia.org/wiki/Spirograph
// let 
//     path = new Path.Circle({center:[200,200], radius:50, strokeColor:'black'}),
//     isPaused = false
//     roulette = new Path({strokeColor:"magenta"}),
//     PI = Math.PI;


// var circle = new Path.Circle({radius:12, strokeColor:'red'});
// circle.strokeColor = 'red'

// // s=r*degree
// //_u noktada yar1 çap1 almam1z1n tek yolu, bir kez "path"olu_turuldu mu
// //,üreticisine dair bütün veri yok oluyor, belki bunun için kendim bir
// //wrapper metod yazabilirim.
// //çember için snap metodu. radyan derece al1yor.
// //snapToDegree asl1nda.
// Path.prototype.snapTo = function(path, degree){
//     degree = degree || 0;
//     var radius = path.bounds.width / 2;
//     this.position = path.getPointAt(radius*degree);
// }
// //herhangi bir yol için.
// Path.prototype.snapToPoint = function(path, point){
//     point = point || 0;
//     this.position = path.getPointAt(point);
// }
// //herhangi bir yol için.
// Path.prototype.snapToPercent = function(path, percent){
//     //mod100 120% için önemli.
//     percent = percent || 0;
//     let pos = path.length * ((percent % 100) / 100);
//     this.position = path.getPointAt(pos);
   
// }

// Path.prototype.animate = function(path, speed, draw, initial){
//     initial = initial || 0;
//     speed = speed || 1.4;
//     draw = draw || false;
    
//     this.onFrame = function(){
//         if(isPaused) return;
//         this.snapToPercent(path,initial);
//         initial += 1 * speed;
        
//         if(draw){
//             roulette.add(this.position);
//         }
        
//     }
// }

// Path.prototype.createPen = function(){
//     var circle2 = new Path.Circle(0,0,4);
//     circle2.strokeColor = 'blue';
//     circle2.fillColor = 'blue';
//     circle2.snapTo(this,12,true);
// }

// circle.snapTo(path,PI/2);
// circle.animate(path, 0.25);

// //var initial = 0;
// // circle.onFrame = function(){
// //     let speed = 1.2;
// //     this.snapToPercent(path,initial);
// //     initial += 0.5 * speed;
// // }

// var circ2 = new Path.Circle({radius:4, fillColor:"blue"});
// circ2.snapTo(circle);
// circ2.animate(circle, 1, true);


// function onKeyDown(event) {
// 	if (event.key == 'space') {
// 		isPaused = !isPaused;
// 		console.log("isStopped:", isPaused)
// 	}
	
// 	if(event.key == "a"){
// 	    roulette.simplify(1);
// 	}
	
// 	if(event.key == "b"){
// 	    roulette.reduce() ;
// 	}
// }


// // console.log(Math.PI)