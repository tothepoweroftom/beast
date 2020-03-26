
import Two from 'two.js'

import {distanceToLineSegment} from '../Util/Util'


export default class RailSystem {
    constructor(path, two) {
        this.boundingRect = path.getBoundingClientRect()
        //////console.log(childRect)
        this.origin =  new Two.Vector(this.boundingRect.left + this.boundingRect.width / 2, this.boundingRect.top + this.boundingRect.height / 2)
        this.path = path
        this.two = two
        this.vertices = path.vertices
        this.points = []
        this.drawPoints();
        this.distance = 0
        this.constraintDistance = 0
        this.highlighted = 0

    }

    setID(id){
        this.id = id
    }

    drawPoints() {

        this.vertices.forEach((anchor, i)=>{
            // console.log(i)
            if(i%3===0) {
                var p = new Two.Circle(0, 0, 10 / 4);
                p.fill = "green"
    
                p.translation.copy(anchor);
                p.translation.addSelf(this.origin);
                this.points.push(p)
                this.two.scene.add(p)
            } else {
                // this.vertices
            }

            
       
  
        })

    }

    resize() {

    }

    checkForClosest(anchor, mouse) {

        this.distance = Number.MAX_VALUE
        this.highlighted = 0
    

        this.points.forEach((point, i)=>{

         
            // console.log(i)
            let d = distanceToLineSegment(anchor.x, anchor.y, mouse.x, mouse.y, point.position.x, point.position.y)
            if (d<this.distance) {
                this.distance = d;
                this.highlighted = i

            } 
                this.points[i].fill = "green"

            
            

 
        })
        // console.log(this.distance)
        this.points[this.highlighted].fill = "yellow"
    }





}