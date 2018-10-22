
paper.install(window); //Paper objesine erişmemizi sğalıyor Paper.path yazmaktansa path yazabiliyoruz.

window.onload = function() {
    var canvas = document.getElementById('canvas');
    paper.setup(canvas);

    var Gear = function(n,c,d,k){
        // let a = new Group();
        n=2*n;
        let p = new Path();
        // p.position = view.center;
        // console.log(p.position);
        p.strokeColor = "red";
        r = 100;
        let h = 20;
        for(let i = 0; i<n; i += 2){ //n+1 olursa kapanıyor aslında...
            //let b =  new Path.Circle({strokeColor:"red", radius:1});
            //b.position = [r*Math.cos(i*2*Math.PI/n), r*Math.sin(i*2*Math.PI/n)];
           let b1 = [r*Math.cos(i*2*Math.PI/n), r*Math.sin(i*2*Math.PI/n)];
           let b2 = [r*Math.cos((i+1)*2*Math.PI/n), r*Math.sin((i+1)*2*Math.PI/n)];
           let b3 = [(r+h)*Math.cos((i+1)*2*Math.PI/n), (r+h)*Math.sin((i+1)*2*Math.PI/n)];
           let b4 = [(r+h)*Math.cos((i+2)*2*Math.PI/n), (r+h)*Math.sin((i+2)*2*Math.PI/n)];
            //a.addChild(b);
            p.add(b1);
            p.add(b2);
            p.add(b3);
            p.add(b4);
            // i += 2;
        }
        p.closed = true;
        p.position = c||view.center;
        p.on("frame",function(){
            this.rotate(d*k||1*k);
        });
        // console.log(p.position);
        // p.position = view.center;
        // console.log(p.position);
        // p.smooth({ type: 'continuous' });
        // a.addChild(p);
        // a.position = view.center;
    }

    var k = new Gear(4,view.center,1,0.2);
    var l = new Gear(4, new Point(view.center.x-220,view.center.y), -1,0.2);

    paper.view.draw();

}

