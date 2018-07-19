paper.install(window);

window.onload = function() {
    var canvas = document.getElementById('canvas');
    paper.setup(canvas);

    
    // var k = Path.Arc({
    //     from:[20,20],
    //     through:[60,20],
    //     to:[80,80],
    //     strokeColor:"black"
    // });

    // console.log(k.segments);
    // k.visible = false;
    // var l = new Path();
    // l.strokeColor = "red";
    // // l.insertSegments(0, k.segments);

    // l.position = view.center;
    // console.log(l.segments);

    let Gear = function(n,p,t){
        var g = new Path();
        g.strokeColor="blue";
        let r = 100, h = 10;
         n = n||16; 
        for(var i=0; i<n; i+=2){
            let p1 = [r*Math.cos(i*2*Math.PI/n), r*Math.sin(i*2*Math.PI/n)];
            let p2 = [r*Math.cos((i+1)*2*Math.PI/n), r*Math.sin((i+1)*2*Math.PI/n)];
            let h1 = [r*Math.cos(((i+1+i)/2)*2*Math.PI/n), r*Math.sin(((i+1+i)/2)*2*Math.PI/n)];
    
            let arc1 = new Path.Arc(p1,h1,p2);
                
            let p3 = [(r+h)*Math.cos((i+1)*2*Math.PI/n), (r+h)*Math.sin((i+1)*2*Math.PI/n)];
            let p4 = [(r+h)*Math.cos((i+2)*2*Math.PI/n), (r+h)*Math.sin((i+2)*2*Math.PI/n)];
            let h2 = [(r+h)*Math.cos(((i+3+i)/2)*2*Math.PI/n), (r+h)*Math.sin(((i+3+i)/2)*2*Math.PI/n)];
                
            let arc2 = new Path.Arc(p3,h2,p4);
    
            g.insertSegments(i*3,arc1.segments);
            g.insertSegments((i+1)*3,arc2.segments);
        }
        g.closed = true;
        g.position = p||view.center;
        g.on("frame",function(){
            this.rotate(t||1);
        });
    }
    let m = 48;
    new Gear(m);
    new Gear(m, [view.center.x-148, view.center.y-148], -1);










    paper.view.draw();
}

