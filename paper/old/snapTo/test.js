//https://en.wikipedia.org/wiki/Spirograph
//import snap from 'paper.snap.js';

//     //for any given path.
//     Path.prototype.snaptoPoint = function(path, point){
//         this.position = path.getPointAt(point);
//     };
//     //for a circle.
//     Path.prototype.snaptoDegree = function(path, degree){
//         var radius = path.bounds.width / 2;
//         this.position = path.getPointAt(radius * degree);
//         // console.log(radius);
//     };
//     //for any given path.
//     Path.prototype.snaptoPercent = function(path, percent){
//         var position = path.length * ((percent % 100) / 100);
//         this.position = path.getPointAt(position);
//     };


// var
//     Circle = new Path.Circle({center:view.center, radius:50, strokeColor:'black'}),
//     aPoint = new Path.Circle({center:[0,0,], radius:4, strokeColor:'red'});
//     PI = Math.PI;
// var laPath = new Path({strokeColor:"red"});
//     aPoint.snaptoDegree(Circle, PI/2);
// var degreee=0;
//     aPoint.on("frame", function(){
//         degreee += 0.5;
//         this.snaptoPercent(Circle, degreee);
//         // console.log("bu metod ile bir den fazla onframe kullanabiliriz, animate ve draw farklı yerlerdeo labilir yani");
//     });

//     aPoint.on("frame", function(){
//         laPath.add(this.position);
//     });

var colors = ["red", "#ff0055", "#00aaff", "indigo", "teal"];

Path.prototype.snap = function(path){
    // console.log(this);
    var that = this;
    this.snappedPath = path;
    return {
        toPoint: function(point){
            that.position = path.getPointAt(point);
        },
        toDegree: function(degree){
            var radius = that.bounds.width / 2;
            that.position = path.getPointAt(radius * degree);
        },
        toPercent: function(percent){
            var position = path.length * ((percent % 100) / 100);
            that.position = path.getPointAt(position);
        }
    }
};





//aşağıdaki animasyonu yani 3,7,3 lü animasyonda 7 yi 3/7 yaparsak
//ikinci zamana bağıl metodda ki 3000,7000,3000' e dönüşüyor o halde diğeri de buna benzero larak dönüşebilir
var isStopped = false;
var globspeed = 0.6;
// Path.prototype.animate = function(speed){
//     var percent = 0;
//     speed = speed || 1;
//     this.on("frame", function(e){
//         if(!isStopped){
//             percent += 1 * speed * globspeed;
//             this.snap(this.snappedPath).toPercent(percent);
//         }
//     });
// }




Path.prototype.animate = function(speed){
    var percent = 0;
    speed = speed*1020 || 1;
    var starttime = new Date().getTime();
    var debug  = new PointText(new Point(30, 30));
    this.on("frame", function(e){
        var timestamp =  new Date().getTime();
        var runtime = timestamp - starttime;

        if( !isStopped){
            var progress = runtime / speed;
            // percent +=   100 * progress;
            this.snap(this.snappedPath).toPercent(100 * progress);
            // if(percent>=100) isStopped = true
            debug.content = e.time;
            if(e.time>=10) isStopped = true;
        }
    });
    // var time = speed * globspeed
}

// belki her draw için farklı bir roulet path'ı oluştururuz.
Path.prototype.scratch = function(){
    this.drawEnd = false; //ypamak isteidğim bununla şey, eğer drawEnd true ise artık çizmesin hatta alttaki .on metodunu iptal etsin.
    this.roulette = new Path({strokeColor:colors[Math.round(Math.random()*(colors.length-1))]});
    this.on("frame",function(){
        this.roulette.add(this.position);
    });
}

var Group = new Group({position:view.center}),
    Circle = new Path.Circle({radius:50, strokeColor:'#cccccc'}),
    voyagerCircle = new Path.Circle({radius:40, strokeColor:'#cccccc'})
    innerCirclex = new Path.Circle({radius:20, strokeColor:"#cccccc"})
    innerCircle = new Path.Circle({radius:4, strokeColor:"#00aaff"}),
    roulette = new Path({strokeColor:"#ff0055"});
    Group.children = [Circle, voyagerCircle, innerCirclex, innerCircle];
// Group.addChild(Circle);
// Group.addChild(voyagerCircle);
// Group.addChild(innerCircle);
voyagerCircle.snap(Circle).toPercent(0);
innerCirclex.snap(voyagerCircle).toPercent(0);
innerCircle.snap(innerCirclex).toPercent(0);

//try:3,7,3 / 3,8,3 / 3,10,3 / 3,6.5,3 / 3,6.8,3 / 3,6.9,3
// voyagerCircle.animate(3);
// innerCirclex.animate(7);
// innerCircle.animate(3);

//zamana bağıl metodda süper :D : xspeedo olmadan
// voyagerCircle.animate(7/3);
// innerCirclex.animate(3/7);
// innerCircle.animate(7/3);
var xspeedo = 5; //sanırım 7saniyede bitecek toplam anim// hemen hemen ykın oluyor buna

voyagerCircle.animate(xspeedo*1/3);
innerCirclex.animate(xspeedo*1/7);
innerCircle.animate(xspeedo*1/3);



// voyagerCircle.scratch();
innerCircle.scratch();
// innerCirclex.scratch();


// roulette.on("frame", function(){
//     if(!isStopped){
//         if(this.firstSegment.point === this.lastSegment.point){
//             console.log("itsSame");
//             // isStopped = true;
//         }
//     }
// })

function onKeyDown(event) {
	if (event.key == 'space') {
		isStopped = !isStopped;
		console.log("isStopped:", isStopped)
    }
    if(event.key == "a"){
        var firstcount = innerCircle.roulette.segments.length;
        innerCircle.roulette.reduce();
        innerCircle.roulette.simplify(1);
        var lastcount = innerCircle.roulette.segments.length;
        console.log(firstcount, lastcount)
        // roulette.smooth({ type: 'catmull-rom', factor: 0.5 });
    }
}

// roulette.on("resize", function(){
//      console.log(this.segments);
// });
function onResize(e){
    Group.position =  view.center;
    roulette.segments = [];
}



// aPoint.snap(Circle).toDegree(20);
// lol:
// var deg = 0;
// Circle.on("frame", function(){
//     this.snap(Circle).toPercent(deg);
//     deg+=100;
// });