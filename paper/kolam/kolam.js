//https://www.openprocessing.org/sketch/158305 paper version.
paper.install(window); //Paper objesine erişmemizi sğalıyor Paper.path yazmaktansa path yazabiliyoruz.

window.onload = function() {
    var canvas = document.getElementById('canvas');
    paper.setup(canvas);


    let 
        tSize = 41,
        tWeight = 5;
        tCount = 5;//9;
        tMargin = 8;

    let kolam = new Group();
   

    for(let i = 0; i<tCount; i++){
        for(let j = 0; j<tCount; j++){
            var from = new Point(i*tSize+tMargin, j*tSize+tMargin);
            var to = new Point((i+1)*tSize, (j+1)*tSize);

            let t = new Path.Rectangle(from, to);
            // t.strokeColor = "red";
            kolam.addChild(t);
        }
    }

    for(let i = 0; i < tCount; i++){
        for(let j = 0; j < tCount; j++){
            // kolam.children[i].fillColor = "red";
            // kolam.children[i].fillColor = "red";
        }
    }

    kolam.strokeWidth = tWeight;
    // kolam.strokeColor = "black";
    kolam.position = view.center;
    // kolam.rotate(45);
    kolam.selected = true;


    paper.view.draw();

}

