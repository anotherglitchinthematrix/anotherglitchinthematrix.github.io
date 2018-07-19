{  
    //we need to snap at a angle, and after that convert it to the percent, that would be better.
    // Spirograph.prototype.bind = function(h){
    //     h = h || this.hierarchy;
    //     for(let i=1, l=h.length; i<l; i++){

    //         // let self    = h[i],
    //         //     parent  = h[i-1];
    //         // let percent = 10;
    //         // let c = parent.radius+(self.mode*self.radius);
    //         // // //açıyı yüzdesel olarak hesaplayalım.
    //         // let angle = -2*Math.PI*((percent/100)%100);//Math.PI/2;//açıyı counter clock wise hale getirdik. - ile çarparaak
    //         // let p = new Point([c*Math.cos(angle), c*Math.sin(angle)]);
    //         // var k = new Path.Circle({radius:3, strokeColor:"indigo", position:p+parent.position});
    //         // self.position = p;
    //         // console.log(k);
    //         //  self.position = parent.getPointAt(0);
    //             // let percent = 0 ;
    //             // let isStopped = this.isStopped;
    //             // self.on("frame", function(){
    //             //     // this.position = parent.getPointAt(parent.length * (percent % 100) / 100);
    //             //     // percent += 0.2;
    //             //     if(!isStopped){
    //             //         this.position = parent.getPointAt(percent%parent.length);
    //             //         percent += 0.8;
    //             //     }
    //             // });

    //         //uzun işlemelreç o kgerek yok gibi:
    //         // let c = parent.radius+(self.mode*self.radius);
    //         // let percent = 0;
    //         // let radian = -2*Math.PI*((percent/100)%100);
    //         // self.position = parent.getPointAt(radian*parent.radius);//hmm içeri nasıl sokucaz? yukarıdaki gene daha mantıklı gibi.
    //     }
    //     this.group.children = this.hierarchy;
    //     this.group.position = view.center;
    //     // console.log(this.group.position);
    // }
  }
paper.install(window); //Paper objesine erişmemizi sğalıyor Paper.path yazmaktansa path yazabiliyoruz.

window.onload = function() {

    console.log(view.center);
    var canvas = document.getElementById('canvas');
    paper.setup(canvas);

    //belki first circle metodu olur, default, 
    var Spirograph = function(p, v){
        this.position = p || view.center;
        this.hierarchy = [];
        this.speed = v || 1;
        this.group = new Group(); //position burda olmuyor
        this.isStopped = false;
    }

    Spirograph.prototype.add = function(r, v){
        // let c = new Path.Circle({radius:r, strokeColor:"#cccccc", position:this.position});
        let p = this.position;
        let c = new Path.Circle({radius:r, strokeColor:"#cccccc", position:p});
        c.speed = v || 1;
        c.radius = r;
        c.mode = 0; //-1/0/1 (inside, center, outside)
        this.hierarchy.push(c);
    }

    Spirograph.prototype.build = function(arr){
        for(var i =0, l=arr.length; i<l; i++){
            this.add(arr[i][0] || arr[i], arr[i][1] || 1);
        }
        this.bind();
    }
    Spirograph.prototype.bind = function(h){
        h = this.hierarchy; //||h;
        for(let i = 1, l=h.length; i < l; i++){
            let 
                s = h[i],   //self
                p = h[i-1]; //parent

            s.position = p.getPointAt(0);

        }
        this.group.children = this.hierarchy;
        // this.group.position = this.position;
    }
    //draw mode : from center or from a point on the last circle?
    Spirograph.prototype.draw = function(c){
        c = c || this.hierarchy[this.hierarchy.length-1];
        let roulette = new Path({strokeColor:"teal"});
        let isStopped = this.isStopped;
        roulette.on("frame", function(){
            // console.log(c.position);
            if(!isStopped){
                this.add(c.position);
            }
        })
    }

    Spirograph.prototype.animate = function(h, v){
        h = this.hierarchy;
        v = this.speed;
        for(let i = 1, l = h.length; i<l; i++){
            let 
                s = h[i],
                p = h[i-1];

            let 
                progress = 0, 
                start;
           
            s.on("frame", function(e){
                if(!start) start = e.time;
                progress = ((e.time - start)*v/this.speed)%1;//saniyede 1 tur ve her zaman 0-1 aralığında.  /this.speed yerine /this.speed de diyebiliriz fakat / daha mantıklı, x saniyedeki tur sayısı gibi anlaşılıyor
                // console.log(progress);
                var arc = (progress * p.length) % p.length;
                this.position = p.getPointAt(arc);

            });
        }
    }



    var c = new Spirograph(view.center, 1);
    // c.build([
    //     30,
    //     [70,4],
    //     [30,2]
    // ]);
    // c.build([
    //     120,
    //     [60, 7],
    //     [8,3]
    // ]);

    c.build([
        120,
        [60,7],
        [30,3],
        [30,7],
        8
    ]);
    // let x = 4;
    // c.build([
    //     120,
    //     [20,0.5],
    //     [60,40]
    // ]);

    c.animate();
    c.draw();
    let pause = false;
    paper.view.draw();
    view.onKeyDown = function(e){
        
        // console.log(e);
        // if(e.key=="space"){
        //     if(pause){
        //         paper.view.pause();
        //     }else{
        //         paper.view.play();
        //     }
        //     pause = !pause;
        // }
    }
    window.Spirograph = Spirograph;
}

