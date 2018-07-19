paper.install(window);
window.onload = function(){
    var canvas = document.getElementById('canvas');
    paper.setup(canvas);

    let playground = (factor) => {
        factor = factor || 0.5;

        let bounds = new Path.Rectangle({
            size:[view.bounds.width*factor, view.bounds.height*factor],
            position:view.center,
            strokeColor:"red",
            strokeWidth:2
        });
        
        bounds.hypotenuse = Math.sqrt(Math.pow(view.bounds.width*factor,2)+Math.pow(view.bounds.height*factor,2));

        return bounds;
    }
    //over-write to old method
    Point.prototype.getAngle = function(p){
        return Math.atan2(p.y-this.y, p.x-this.x);
    }
    let m = playground();

    let Ray = function(v,p,a,c){
        c = c||"green";
        p = p || v.position;
        a = a || 0;

        this.path = new Path({strokeColor:c});
        this.path.add(p);

        this.p = p;
        this.angle = a;
        this.verge = v;
        this.maxLength = v.hypotenuse;
    }

    Ray.prototype.removed = function(){
        this.path.remove();
    }
    var engel = new Path.Line({from:[0,0], to:[250,0], strokeColor:"red"});
    engel.position = [view.center.x-200, view.center.y-200];
    let ang = Math.PI/8;
    engel.rotate(ang*180/Math.PI);
    var goal = new Path.Line({from:[0,0], to:[20,0], strokeColor:"black", strokeWidth:5});
    goal.position =[view.center.x-300, view.center.y+200];
    goal.rotate(30);
    Ray.prototype.init = function(){
        this.path.add([this.p.x+this.maxLength * Math.cos(this.angle), this.p.y+this.maxLength * Math.sin(this.angle)]);
        
        
        var iP = this.path.getIntersections(engel)[0];
        // console.log(typeof(iP)!=="undefined"?iP.point:null);

       
        if(typeof(iP)!=="undefined"){
            var c = 2 * Math.PI-this.p.getAngle(iP.point)-ang;
            this.path.segments[this.path.lastSegment.index].point = iP.point;
            this.path.add([iP.point.x + this.maxLength * Math.cos(c), iP.point.y + this.maxLength * Math.sin(c)]);


            var gP = this.path.getIntersections(goal)[0];
        if(typeof(gP)!=="undefined"){
           goal.strokeColor = "red";
           var text = new PointText(new Point(view.center.x, view.center.y));
        text.fillColor = 'black';
        text.fontSize=50;

        // Set the content of the text item:
        text.content = 'Kazandın!?';
        }
        }

       
        
        

        // this.path.segments[this.path.lastSegment.index].point = iP;


        //  var diP = this.path.getIntersections(this.verge);
        // this.path.segments[this.path.lastSegment.index].point = diP[diP.length-1].point;


    }

    let p = view.center,
        a = 2*Math.PI*5/100;
    let r = new Ray(m, p, a);
    r.init();
    a=0;
    console.log(r);
    // view.onFrame = ()=>{
    //     a += 1;
    //     a = a % 100;
    //     let theta = (2*Math.PI)*(a/100);
    //     r.removed();
    //     r = new Ray(m, p, theta);
    //     r.init();
    // }

    view.onMouseMove = (e)=>{
        // console.log(e.point);
        r.removed();
        r = new Ray(m, p, p.getAngle(e.point));
        r.init();
    }

    view.onMouseDown = (e)=>{
        p = e.point;
        r.removed();
        r = new Ray(m, p, p.getAngle(e.point));
        r.init();
    }

    view.draw();
}