
import Two from 'two.js'


export default class RailSystem {
    constructor(path, two) {
        this.boundingRect = path.getBoundingClientRect()
        //////console.log(childRect)
        this.origin =  new Two.Vector(this.boundingRect.left + this.boundingRect.width / 2, this.boundingRect.top + this.boundingRect.height / 2)
        this.path = path
        this.two = two
        this.vertices = path.vertices
        this.drawPoints();

    }

    drawPoints() {

        this.vertices.forEach((anchor, i)=>{
            // console.log(i)

            if(i%10 != 0) {
                this.vertices.splice(i,1)
            }

            var p = new Two.Circle(0, 0, 10 / 4);
            p.fill = "green"

            p.translation.copy(anchor);
            p.translation.addSelf(this.origin);

            this.two.scene.add(p)
        })

    }

    resize() {

    }


}