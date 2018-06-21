
paper.install(window); //Paper objesine erişmemizi sğalıyor Paper.path yazmaktansa path yazabiliyoruz.

window.onload = function() {
    var canvas = document.getElementById('canvas');
    paper.setup(canvas);

    
   

    let playground = (factor) => {
        factor = factor || 2;
        let bounds = new Path.Rectangle({
            size:[view.bounds.width/factor, view.bounds.height/factor],
            position:view.center,
            strokeColor:"red",
            strokeWidth:2
        });
        return bounds;
    }

//
    let Ray = function(b){
        this.bound = b;

    }

    Ray.prototype.launch = function(angle){
        let k = Math.sqrt(Math.pow(this.bound.bounds.width,2)+Math.pow(this.bound.bounds.height,2))/2;
        let p = new Path({strokeColor:"blue"});
        p.add(view.center);
        p.add([view.center.x+k*Math.cos(angle), view.center.y+k*Math.sin(angle)]);
        let d = p.getIntersections(this.bound);
        let c = new Path.Circle({fillColor:"white", radius:2,position:d[0].point});
        console.log(d[0].point);

        let p1 = new Path({strokeColor:"black"});
        p1.add(d[0].point);
        p1.add([view.center.x-k*Math.cos(Math.PI-angle), view.center.y-k*Math.sin(Math.PI-angle)]);
    }

    let m = playground();

    let r = new Ray(m);
    r.launch(Math.PI/36);

    let a = 0;

    view.onFrame = ()=>{
        r = new Ray(m);
        r.launch(2*Math.PI*a/100);
        a += 1%100;
    }



    paper.view.draw();

    let pause = false;
    view.onKeyDown = function(e){
        
        // console.log(e);
        if(e.key=="space"){
            if(pause){
                paper.view.pause();
            }else{
                paper.view.play();
            }
            pause = !pause;
        }
    }
}

