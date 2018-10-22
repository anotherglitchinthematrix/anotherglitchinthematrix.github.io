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
    //let image = new Raster("a.png");
     let image = new Raster("Leonardo_Fibonacci.png");
    
    image.onLoad = function(){
        console.log("~> image loaded!");
        this.visible = false;
        // console.log(px,py);


        view.onFrame = function(e){
           for(let i=48; i>0; i--){
                degree = (iter * goldenRatio) * 360;
                let r = Math.sqrt(iter++) * spacing;
                let pos =  calcPointPos(image.width/2, image.height/2, r, (degree % 360));

                let pixel = image.getPixel(pos.x, pos.y);
                    cR = map(1-pixel.gray, 0, 1, minWeight, maxWeight);
                    cC = new Color(150/255,150/255,150/255);//pixel

               let x =  new Path.Circle({
                    fillColor: cC,
                    radius: cR,
                    center : [view.center.x + pos.x - image.width/2, view.center.y + pos.y - image.height/2]
                });

                if(pos.x-10 <= 0 || pos.x+10>=image.width ||pos.y-10 <= 0 || pos.y+10>= image.height){
                    this.onFrame = null;
                    console.log(iter);
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

