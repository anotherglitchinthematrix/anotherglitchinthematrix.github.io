
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
        // console.log(this);
    }

    Ray.prototype.launch = function(angle){
        let ray = new Path({strokeColor:"blue"});
        // ray.add([0,0]);
        // ray.add([100,100]);

        let p1 = new Path.Circle({fillColor:"blue", radius:3, position:[view.center.x-0,view.center.y+0]});
        let p2 = new Path.Circle({fillColor:"blue", radius:3});
        
        let b, r, dx, dy;
        //.1 ve 3
        if(
            (angle >= 0 && angle < Math.PI/4)
            ||
            (angle >= Math.PI && angle < 3 * Math.PI / 2)
            // (angle >= Math.PI && angle < 3 * Math.PI/2)
        ){  
           b =  this.bound.bounds.width;
           r = Math.abs(((b/2) - Math.abs(p1.position.x-view.center.x)) / Math.cos(angle));
           
           dx = r * Math.cos(angle);
            dy = r * Math.sin(angle);
            console.log(dx,dy);
            p2.position = [view.center.x + dx, view.center.y + dy];
        }
        else{ 
            b=this.bound.bounds.height;
            r= Math.abs(((b/2) - Math.abs(p1.position.y-view.center.y)) / Math.sin(angle));
            
            dx = r * Math.sin(angle);
            dy = r * Math.cos(angle);
            console.log(dx,dy);
            p2.position = [view.center.x + dy, view.center.y + dx];
        }

        ray.add(p1.position)
        ;
        ray.add(p2.position);
        

        // console.log(dx);
        // console.log(r);

        // console.log(this.bound.position.x, this.bound.position.y);
    }

    let m = playground();

    let r = new Ray(m);
    r.launch(0);
    let a = 0;
    view.onFrame = ()=>{
        r.launch((2*Math.PI*a/100));
        a += 0.1 % 100;
    }



    paper.view.draw();

    let pause = false;
    view.onKeyDown = function(e){
        
        console.log(e);
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

