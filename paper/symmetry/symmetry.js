
paper.install(window); //Paper objesine erişmemizi sğalıyor Paper.path yazmaktansa path yazabiliyoruz.

window.onload = function() {
    var canvas = document.getElementById('canvas');
    paper.setup(canvas);
    // var tc = view.center;
    // var tc = view.center;//aşağıdaki daha basit bence. 
    var tc = new Point(view.center.x, view.center.y);
    var n = 8;
    
    var guide = function(n, c, d, s){
        n = Math.floor(n);
        if(n<2) return;
        s=s||1.5
        c=c||new Color(230/255,230/255,230/255);
        // d=d||[2,4];
        d=d||[];
        let guides = [];
        let length = Math.sqrt(Math.pow(view.bounds.width,2)+Math.pow(view.bounds.height,2))/2;
        // console.log(hypotenuse);
        for(let l = 0; l < n; l++){
            let t = new Path.Line([0,0], [0,length]);
            t.strokeWidth = s;
                    // t.strokeColor = c;
            t.rotate(l*360/n, [0,length]);
            guides.push(t);
        }
        
        var g = new Group({children:guides, dashArray:d, strokeColor:c});//, position:view.center}) //sapma oluyor let's try hacky way
        g.pivot = new Point(0, length);//böyle olmak zounrda n tek sa1lar1 için merkez sap1t1yordu
        g.position = view.center;
        new Path.Circle({fillColor:"rgb(242, 242, 242)", strokeWidth:s, strokeColor:c,radius:2*(s+2),position:view.center});
        new Path.Circle({fillColor:c, radius:s, position:view.center});
        return g;
    }
    
    guide(n);
    
    var path = [];
    // for(let i = 0; i<n; i++){
    //     let p = new Path({strokeColor:"black"});
    //     // p.rotate(45, tc)
    //     path.push(p);
    // }
    
    // Point.prototype.getAngle = function(){
    //     let hypo = Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));
    //     return Math.asin(this.y/hypo);
    // }
    
    
    // var c = new Point([0,2]);
    // console.log(2*c.angle);
    let cursor = new Group();
    var crs = new Path.Circle({strokeColor:"#BBB", radius:4});
    var crs_p = new Path.Circle({fillColor:"#BBB", radius:1});
    cursor.addChild(crs);
    cursor.addChild(crs_p);
    var cursors = [];
    for(let i =0; i<n; i++){
        cursors.push(cursor.clone());
    }
    
    //böyle oto yapmamız lazım.
    var symtool = new Tool();
    // symtool.minDistance = 100;
    symtool.onMouseDown = function(e){
        path = [];// bunu koymazsak her mosedown da bir dizi oath oluşturmamız mantıksız, yukarıda path tanımındna sonra da oluşturabilirdik.
        //
        // var r = e.point.getDistance(tc);
        //     var angle = e.point.getDirectedAngle(tc);
            // console.log(angle);
        // console.log("laaaan");
        for(let i = 0; i<n; i++){
            let p = new Path({strokeColor:"black"});
            // p.rotate(45, tc)
            path.push(p);
            // cursors[i].strokeColor = "blue";
        }
        cursors[n/2].strokeColor = "blue";
    }
    symtool.onMouseDrag = function(e){
        // path[0].add(e.point);
        // var r = e.point.getDistance(tc);
        // var vector = e.point - tc;
        // var b =  new Point([tc.x+r*Math.cos(Math.PI-vector.angleInRadians),tc.y+r*Math.sin(Math.PI-vector.angleInRadians)]);
        // path[1].add(b);
    //    path[0].add(e.point);
            var r = e.point.getDistance(tc);
            // var angle = (e.point - tc);//bu nedense sketch te çalıştığı halde localde çalışmıyordu.
            var angle = new Point(tc.x-e.point.x, tc.y-e.point.y).angleInRadians;
            // console.log(e.point);
            // console.log(angle);
            // console.log(angle);
        for(let i = 0; i<n; i++){
            
            let p = new Point([
                    tc.x+r*Math.cos(((i*2*Math.PI)/n)+angle),
                    tc.y+r*Math.sin(((i*2*Math.PI)/n)+angle),
                ]);
            // let p = new Point([
            //     tc.x+r*Math.cos((i*Math.PI*2/n)+angle),
            //     tc.y+r*Math.sin((i*Math.PI*2/n)+angle),
            // ]);
            // console.log(r,angle,p);
            path[i].add(p);
            cursors[i].position = p;
            // console.log(path[i]);
            
        }
    }
    symtool.onMouseUp = function(){
        for(let i = 0; i<n; i++){
            // cursors[i].strokeColor = "red";
        }
    }
    symtool.onMouseMove = function(e){
        var r = e.point.getDistance(tc);
        var angle = new Point(tc.x-e.point.x, tc.y-e.point.y).angleInRadians;
    for(let i = 0; i<n; i++){
        let p = new Point([
                tc.x+r*Math.cos(((i*2*Math.PI)/n)+angle),
                tc.y+r*Math.sin(((i*2*Math.PI)/n)+angle),
            ]);
        cursors[i].position = p;
        
        }
        cursors[n/2].children[0].strokeColor = "red";
        cursors[n/2].children[1].fillColor = "red";
    }

    // var cursors = [];
    // var crs = new Path.Circle({strokeColor:"red", radius:4});

    // var cursor = new Tool();
    // cursor.onMouseMove = function(e){
    //     // crs.position = e.point;
    //     console.log(e);
    // }

    // view.on({
    //     mousedown:onMouseDown,
    //     mousedrag:onMouseDrag
    // });
    // paper.view.update()
    // console.log(tools);
    paper.view.draw();

}

