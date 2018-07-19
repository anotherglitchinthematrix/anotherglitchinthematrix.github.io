/*Path.prototype.snapTo = (path, degree = 0) => {
    //degree = degree || 0;
    var radius = path.bounds.radius / 2;
    this.position = path.getPointAt(radius * degree);
}
*/

Path.prototype.snap = {
    //for any given path.
    toPoint: (path, point = [0,0]) =>{
        this.position = path.getPointAt(point);
    },
    //for a circle.
    toDegree: (path, degree = 0) =>{
        let radius = path.bounds.radius / 2;
        this.position = path.getPointAt(radius * degree);
    },
    //for any given path.
    toPercent: (path, percent = 0) =>{
        let position = path.length * ((percent % 100) / 100);
        this.position = path.getPointAt(position);
    }
};

export const snap = Path.prototype.snap;