let 
    path = new Path.Circle({center:[0,0], radius:50, strokeColor:'black'}),
    inner = new Path.Circle({radius:12, strokeColor:'red'})
    group = new Group([path,inner]);
    
    group.position = view.center;

Path.prototype.snapTo = function(path, degree){
    degree = degree || 0;
    
    var targetR = path.bounds.width / 2;
    var selfR = this.bounds.width / 2;
    
    
    var p = new Point(Math.cos(degree), Math.sin(degree));
    
    
    var centerPos = path.getPointAt((targetR)*degree);
    var outerPos = centerPos - p * selfR;
    var innerPos = centerPos + p * selfR;
    
    var d = 50*2;
    var x = (targetR-selfR)*Math.cos(degree)+d*Math.cos(((targetR-selfR)/selfR)*degree);
    var y = (targetR-selfR)*Math.sin(degree)-d*Math.sin(((targetR-selfR)/selfR)*degree);
    
    var dr = new Path.Circle({position:new Point(this.position.x-x,this.position.y-y), radius:2, fillColor:"blue"});
    
    
    // var showPinner = new Path.Circle({position:innerPos, radius:2, strokeColor:"blue"});
    // var showPouter = new Path.Circle({position:outerPos, radius:2, strokeColor:"blue"});
    // var d = new Path.Line({from:innerPos, to:outerPos, strokeColor:"black"});
    // var d = new Path.Line({from:innerPos, to:outerPos, strokeColor:"black"});
    // d.rotate(degree*12, innerPos);
    
    this.position = innerPos;
}

var initialPercent = 0;
snap = Math.PI/4;
inner.snapTo(path, snap);
inner.onFrame = function(){
    inner.snapTo(path,initialPercent%100/100 * 2 * Math.PI);
    initialPercent += 0.5;
}
