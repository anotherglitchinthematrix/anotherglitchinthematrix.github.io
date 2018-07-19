var path = new Path.Circle(200,200,50);
path.strokeColor = 'black';
// path.add(new Point(100, 100), new Point(100, 200), new Point(200, 200),new Point(300, 400));

var os = new Path();
// os.fullySelected = true;
os.strokeColor = "magenta";

// os.add(new Point(0,0));
// os.add(new Point(100,100));

var circle = new Path.Circle({radius:12});
circle.strokeColor = 'red'

//path.closed = true
//path.smooth()

// var circle2 = new Path.Circle(0,0,20);
// circle2.strokeColor = 'blue';

// circle.onFrame = function (event) {
//     circle.position = path.getPointAt(offset);
//     offset += event.delta*150; // speed - 150px/second
//     if(offset > path.length) offset = 0;
// }

Path.prototype.snapTo = function(o, v, c){
    v = 300;
    c = c || false;
    var offset = 0;
    //bunu yapmaz isek ilk olusturdugumuz yerde olur.
    this.position = o.getPointAt(offset);
    this.onFrame = function (event) {
        this.position = o.getPointAt(offset);
       offset += event.delta*v; // speed - 150px/second
        //console.log(offset);
        // console.log(offset, o.length);
        if(offset > o.length) {offset = 0;} 
        
        if(c){
            // console.log("drawing");
            os.add(this.position);
        }
        
    }
}

Path.prototype.createPen = function(){
    var circle2 = new Path.Circle(0,0,4);
    circle2.strokeColor = 'blue';
    circle2.fillColor = 'blue';
    // circle2.position = this.getPointAt(0);
    circle2.snapTo(this,12,true);
}

circle.snapTo(path,20);
circle.createPen();

// circle2.snapTo(circle,20);

// var b = new Path.RegularPolygon({
//     center: [0, 0],
//     sides: 5,
//     radius: 20,
//     strokeColor: 'black'
// });
// b.snapTo(path);
// b.onFrame = function(event){
//     this.rotate(3);
// }

// 
