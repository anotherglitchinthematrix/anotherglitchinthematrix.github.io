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


        // bounds = new Path.Circle({
        //     radius:200,
        //     position:view.center,
        //     strokeColor:"red",
        //     strokeWidth:2
        // });
        // bounds.hypotenuse = 250;

        return bounds;
    }
    //over-write to old method
    Point.prototype.getAngle = function(p){
        return Math.atan2(p.y-this.y, p.x-this.x);
    }
    let m = playground();
    // let p = new Point(view.center);
    // let q = new Point([view.center.x+250, view.center.y]);
    
    // new Path.Circle({radius:3, fillColor:"red", position:p});
    // new Path.Circle({radius:3, fillColor:"red", position:q});
    // let r = p.getDistance(q);
    // let teta = p.getAngle(q);
    // new Path.Circle({radius:8, strokeColor:"blue", position:[p.x + r*Math.cos(teta), p.y + r * Math.sin(teta)]});


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

    Ray.prototype.init = function(){
        this.path.add([this.p.x+this.maxLength * Math.cos(this.angle), this.p.y+this.maxLength * Math.sin(this.angle)]);
        
        var iP = this.path.getIntersections(this.verge)[0].point;
        this.path.segments[this.path.lastSegment.index].point = iP;

        var d = (
            (this.angle >= 0 && this.angle < Math.PI/2) 
            ||
            (this.angle >= Math.PI && this.angle < 3* Math.PI/2)
        ) ?  Math.PI :  2*Math.PI;
        console.log(this.angle);
        // console.log(d);
        // var c =  2*Math.PI-this.p.getAngle(iP);//açı.
        var c =  Math.PI-this.p.getAngle(iP);//açı.
        // console.log(c);
        this.path.add([iP.x+this.maxLength * Math.cos(c), iP.y+this.maxLength * Math.sin(c)]);

        //  var diP = this.path.getIntersections(this.verge);
        // this.path.segments[this.path.lastSegment.index].point = diP[diP.length-1].point;


    }

    let p = new Point(view.center.x, view.center.y-100),
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