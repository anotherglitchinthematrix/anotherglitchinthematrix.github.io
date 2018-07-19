// //spirograph aslında çemberleri içinde barındıran bir sınıf
// //içinde spirals ya da orbits isminde bir array olacak,
// //bu arraydan bir grup oluşturucaz vae pozisyonu spirographın pozisyonu oalcak
// //array ın ilk elemanı merkez çember ve takip edenelrde bir öncekine yapışık çemberleri temsil edecek
// //sprigorafın scrtarct metodu arraydaki en son çembere göre çizecek ya da bu çembere yapışık bir referans çember oluşturecak.

// //.on metodunu inherit etsek ne süper olur la.

// var colors = ["red", "#ff0055", "#00aaff", "indigo", "teal"];

// // var Spirograph = function(position){
// //     this.circles = [];
// //     this.position = position || view.center;
// //     this.update = function(){
        
// //     }
// // }

// // Spirograph.prototype.addCircle = function(radius, speed, color){
// //     // var a = ;
// //     radius  =   radius  || 0;
// //     speed   =   speed   || 0;
// //     color   =   color   || "#cccccc"; //colors[Math.round(Math.random()*(colors.length-1))];
// //     this.circles.push({circle:new Path.Circle({radius:radius, strokeColor:color}), speed:speed});
// //     this.update();
// // }








// // var a = new Spirograph();
// // a.addCircle(90);
// // a.addCircle(120);
// // console.log(a);

// // var Group = new Group({position:view.center}),
// //     Circle = new Path.Circle({radius:50, strokeColor:'#cccccc'}),
// //     voyagerCircle = new Path.Circle({radius:40, strokeColor:'#cccccc'})
// //     innerCirclex = new Path.Circle({radius:20, strokeColor:"#cccccc"})
// //     innerCircle = new Path.Circle({radius:4, strokeColor:"#00aaff"});
// //     Group.children = [Circle, voyagerCircle, innerCirclex, innerCircle];
// //     //bu yoksa çok ortalamıyor.
// //     function onResize(e){
// //         Group.position =  view.center;
// //     }
    



// var Spirograph = function(position, isStopped){
//     this.hierarchy = [];
//     this.isStopped = isStopped || false;
// }

// Spirograph.prototype.addCircle = function(r, v){
//     var c = new Path.Circle({radius:r, strokeColor:"#cccccc", position:view.center});
//     this.hierarchy.push({circle:c, speed:v});
// }

// Spirograph.prototype.build = function(h){
//     h = h || this.hierarchy;
//     var percent = 50;
//     for(var i = 1, l = h.length; i < l; i++){
//         var parent  =   h[i-1].circle;
//         var child   =   h[i].circle;
//         child.position = parent.getPointAt(parent.length * ((percent % 100) / 100));
//         // var percent = 0;
//         // child.on("frame",function(){
//         //     // console.log(parent.length);
//         //     // this.position = parent.getPointAt(parent.length * ((percent % 100) / 100));

//         // });
//     }

// }





// var a = new Spirograph();
//     a.addCircle(80, 1000);
//     a.addCircle(40, 2000);
//     a.addCircle(20, 2000);
//     a.addCircle(10, 2000);
//     a.build();


// function drawen(m){
    
//     k = m.hierarchy;
//     // console.log(k.length);
//     for(var i = 1, l = k.length; i < l; i++){
//         var parent  =   k[i-1].circle;
//         var child   =   k[i].circle;
//         var percent = 0;
//         child.on("frame", function(){
//             this.position = parent.getPointAt(parent.length * ((percent % 100) / 100));
//             percent += 15;
//         });
//     }
// }

// drawen(a);


var Spirograph = function(h){
    this.hierarchy = [] || h;

    this.addCircle = function(r){
        this.hierarchy.push(new Path.Circle({radius:r, strokeColor:"#cccccc", position:view.center}));
    }

    this.editCircle = function(i,r){
        this.hierarchy[i].remove();
        this.hierarchy[i] = new Path.Circle({radius:r, strokeColor:"#cccccc", position:view.center});
    }

    /*
    * This method ties the circles at given point/percent.
    * h: hierarchy, an array contains all of the circles.
    * m: mode, -1:inner, 0:center, 1:outer default:0
    * */
    this.tie = function(h, m){
        h = h || this.hierarchy;
        m = Math.sign(m) || 0;

        for(var i=1, l=h.length; i<l; i++){
            var self    = h[i],
                parent  = h[i-1];
                self.parent = parent;

                self.position = parent.getPointAt(0);
                self.on("frame", function(){
                    console.log();
                })
         }

    }
};

var a = new Spirograph();
    a.addCircle(80);
    a.addCircle(40);
    a.addCircle(90);
    a.addCircle(20);

    // a.editCircle(0,30);
    a.tie();