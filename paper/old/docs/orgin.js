var path = new Path();
path.strokeColor = 'black';
path.add(new Point(100, 100), new Point(100, 200), new Point(200, 200),new Point(300, 400));



var circle = new Path.Circle(100,100,10);
circle.strokeColor = 'red'

path.closed = true
path.smooth()

var offset = 0;

circle.onFrame = function (event) {
  if (offset< path.length){
    circle.position =path.getPointAt(offset);
    offset+=event.delta*150; // speed - 150px/second
  }
  else {
    offset=0;
  }
}