var path = new Path.Circle(200,200,100);
path.strokeColor = 'black';
// path.add(new Point(100, 100), new Point(100, 200), new Point(200, 200),new Point(300, 400));



var circle = new Path.Circle(0,0,50);
circle.strokeColor = 'red'

//path.closed = true
//path.smooth()

var circle2 = new Path.Circle(0,0,20);
circle2.strokeColor = 'blue';

// circle.onFrame = function (event) {
//     circle.position = path.getPointAt(offset);
//     offset += event.delta*150; // speed - 150px/second
//     if(offset > path.length) offset = 0;
// }

Path.prototype.snapTo = function(o, v){
    v = 200;
    var offset = 500000;
    this.onFrame = function (event) {
        this.position = o.getPointAt(offset);
       offset += event.delta*v; // speed - 150px/second
        //console.log(offset);
        // console.log(offset, o.length);
        if(offset > o.length) {console.log(offset);offset = 0;} 
    }
}

circle.snapTo(path,20);
// circle2.snapTo(circle,20);

// var b = new Path.RegularPolygon({
//     center: [0, 0],
//     sides: 5,
//     radius: 10,
//     strokeColor: 'black'
// });
// b.snapTo(circle2);
