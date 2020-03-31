import Two from 'two.js'

import {
    distanceToLineSegment
} from '../Util/Util'


export default class RailSystem {
    constructor(path, logoGroup, two) {
        this.boundingRect = path.getBoundingClientRect()
        //////console.log(childRect)
        this.origin = new Two.Vector(this.boundingRect.left + this.boundingRect.width / 2, this.boundingRect.top + this.boundingRect.height / 2)
        this.path = path
        this.two = two
        this.vertices = path.vertices
        this.points = []
        this.distance = 0
        this.constraintDistance = 0
        this.highlighted = 0
        this.pointsGroup = new Two.Group()
        this.logoGroup = logoGroup
        logoGroup.add(this.pointsGroup)
        this.setupPoints();

    }

    setID(id) {
        this.id = id
    }

    setupPoints() {


        this.path.vertices.forEach((anchor, i) => {
            // console.log(i)
            if (i % 7 === 0) {
                var p = new Two.Circle(0, 0, 4);
                p.fill = "green"


                p.translation.copy(anchor);
                p.translation.addSelf(this.origin);
                this.points.push(p)
                this.pointsGroup.add(p)
            } else {
                // this.vertices
            }




        })

    }

    togglePoints(debug) {
        if (debug) {
            this.points.forEach((point) => {
                point.visible = true
            })
        } else {
            this.points.forEach((point) => {
                point.visible = false
            })
        }
    }

    resize() {

        

    }

    checkForClosest(anchor, mouse, influenceRadius) {
        if(!anchor){
            return
        }
        this.distance = Number.MAX_VALUE
        this.highlighted = 0
        this.closestVector = null;


        this.path.vertices.forEach((vertex, i) => {

            // if (mouse.distanceTo(point.position) < influenceRadius) {

                if (i % 6 === 0) {
                    let v = vertex.clone()
    
    
                    
                    v.addSelf(this.origin);
                    let d = distanceToLineSegment(anchor.x, anchor.y, mouse.x, mouse.y, v.x, v.y)
                    if (d < this.distance) {
                        this.distance = d;
                        this.closestVector = v

                    }
                } else {
                    // this.vertices
                }


                // console.log(i)
    
                // this.points[i].fill = "green"




            // }
        })

    
        return this.closestVector.distanceTo(anchor)
    }





}