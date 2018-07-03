//https://www.openprocessing.org/sketch/158305 paper version.
paper.install(window); //Paper objesine erişmemizi sğalıyor Paper.path yazmaktansa path yazabiliyoruz.

window.onload = function() {
    var canvas = document.getElementById('canvas');
    paper.setup(canvas);

    let px, py, degree;
    let minWeight = 0.5;
    let maxWeight = 2;//4
    let currentWeight;
    let spacing = maxWeight+3;//+2
    let goldenRatio = ((Math.sqrt(5) + 1 ) / 2);
    let iter = 0;
    // let image = new Raster("Fibonacci.jpg");
    let image = new Raster("trace.png");
    // let image = new Raster("Leonardo_Fibonacci.png");
    let gRed = new Group();
    let gBlue = new Group();
    gBlue.blendMode = "multiply";

    
    image.onLoad = function(){
        console.log("~> image loaded!");
        this.visible = false;
        // console.log(px,py);


        view.onFrame = function(e){
           for(let i=64; i>0; i--){
                let imageCenter = new Point(image.width/2, image.height/2); //center of the image
               
                degree = (iter * goldenRatio) * 360;

                let r = Math.sqrt(iter++) * spacing;
                let pos =  calcPointPos(imageCenter.x, imageCenter.y, r, (degree % 360));
                let pixel = image.getPixel(pos.x, pos.y);
                  
                    cR = map(1-pixel.gray, 0, 1, minWeight, maxWeight);
                    cCRed = new Color(255,0/255,0/255);
                    cCBlue = new Color(0/255,255/255,255/255);

                let pRed =  new Path.Circle({
                    fillColor: cCRed,
                    radius: cR,
                    center : [view.center.x - imageCenter.x + pos.x ,view.center.y - imageCenter.y + pos.y ]
                });
                
                // let pBlue = pRed.clone();
                // let m = new Point(500,5);
                // pBlue.center = pBlue.center + m;
                // pBlue.fillColor = cCBlue;
                let l = pos.length;
                let offset = new Point(2*  goldenRatio * pos.x / l, 2* goldenRatio * pos.y / l);
                let pBlue =  new Path.Circle({
                    fillColor: cCBlue,
                    radius: cR,
                    center : [view.center.x - imageCenter.x + pos.x +offset.x ,view.center.y - imageCenter.y + pos.y +offset.y ]
                });

                gRed.addChild(pRed);
                gBlue.addChild(pBlue);





                if(pos.x-1 <= 0 || pos.x+1>=image.width ||pos.y-1 <= 0 || pos.y+1>= image.height){
                    this.onFrame = null;
                    // console.log(iter);
                    
                    
                }
                // console.log(pix);
                // currentWeight = 
           }
           
        }
        

    }
   
    function calcPointPos(x,y,r,graden){
        px = x + Math.cos(radians(graden))*(r/2);
        py = y + Math.sin(radians(graden))*(r/2);
        return new Point(px,py);
    }

    function radians(degree){
        return degree * Math.PI / 180;
    }

    let map = function(n, start1, stop1, start2, stop2) {
        return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
      };



    paper.view.draw();

    // let pause = false;
    // view.onKeyDown = function(e){
        
    //     console.log(e);
    //     if(e.key=="space"){
    //         if(pause){
    //             paper.view.pause();
    //         }else{
    //             paper.view.play();
    //         }
    //         pause = !pause;
    //     }
    // }
}

