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


var Group = new Group({position:view.center}),
    Circle = new Path.Circle({radius:50, strokeColor:'#cccccc'}),
    planet = new Path.Circle({radius:3, strokeColor:"red"});
    Group.children = [Circle, planet];

planet.snap(Circle).toPercent(20);

//t:time = 1 tur ms
Path.prototype.animate = function(t){
    // var s = 0;
    // this.on("frame", function(e){
    //     this.snap(this.snappedPath).toPercent(s);
    //     s += e.delta * 10 / 20;
    // });
}

planet.animate(100);







function onKeyDown(event) {
	if (event.key == 'space') {

    }
}

function onResize(e){
    Group.position =  view.center;
}
