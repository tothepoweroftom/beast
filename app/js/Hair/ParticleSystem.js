import {
    distanceToLineSegment
} from '../Util/Util'
import * as _ from 'lodash-es'
import * as noise from "../Util/Perlin"
import Two from 'two.js'

let specialCase = ["hair07", "hair06", "hair34"]
let conversion = Math.PI / 180


export default class ParticleSystem {
    constructor(two, origin, TwoPath, i) {

        this.scale = 1;
        this.two = two
        this.influenceRadius = 250;
        this.shapeOrigin = null
        this.specialOrigin = new Two.Vector(0, 0)
        this.path = TwoPath
        this.origin = TwoPath.children[0].clone()
        this.rect = this.path.getBoundingClientRect()

        this.displayed = TwoPath.children[0]
        this.setShapeOrigin(origin)


        this.mouseLine = this.two.makeLine(0, 0, 0, 0)
        this.mouseLine.stroke = "white"


        this.time = 0
        this.amplitude = 0.01;
        this.direction = 180;
        this.theta = 0
        // this.amplitude = 1.0
        this.oldPos = []
        this.tweening = false;
        this.index = i
        this.difference = Math.random() * 5
        this.calculateCentroid()
        // this.getAbsolutePoints()
        this.originalLengths = []
        this.lineDistance = 0
        this.growthConstaint = 10;
        this.anchor;
        this.extraLength = 0

        this.mouseActive = false;




    }



    setID(id) {
        this.id = id
        //console.log(id)
    }

    setMouseAnchor(AnchorCircle) {

    }

    updateMouseLine(anchor, mouse) {
        this.anchor = anchor


        this.mouseLine.vertices[0].x = anchor.x
        this.mouseLine.vertices[0].y = anchor.y

        this.mouseLine.vertices[1].x = mouse.x
        this.mouseLine.vertices[1].y = mouse.y


    }



    clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);

    }

    getAbsolutePoints() {
        this.origin.vertices.forEach((anchor) => {

            var p = this.two.makeCircle(0, 0, 10 / 4);


            p.translation.copy(anchor);
            p.translation.addSelf(this.shapeOrigin);

        })

    }

    resize(scale) {

        // this.path.scale = scale


    }



    setShapeOrigin(origin) {

        this.shapeOrigin = origin;


    }

    setSpecialOrigin(specialOrigin) {
        this.specialOrigin = specialOrigin;
        // this.specialOrigin.y += 20
    }

    setInfluence(value) {
        this.influenceRadius = value
    }


    calculateCentroid() {

        let rect = this.path.getBoundingClientRect()
        this.origin = this.path.children[0].clone()
        this.centroid = new Two.Vector((0.5 * (rect.right + rect.left)), (0.5 * (rect.top + rect.bottom)))





    }
    lerpByDistance(VectorA, VectorB, x) {
        let P = new Two.Vector()
        P.sub(VectorB, VectorA);
        P.normalize();

        P = P.multiplyScalar(x)
        P.addSelf(VectorA)

        return P;
    }
    checkAngles(num, range1) {


        if ((num > range1[0] && num <= range1[1])) {
            return num
        } else {
            return 0.5 * (range1[0] + range1[1])
        }




    };

    lerp(x, y, r) {
        return x + ((y - x) * r)
    }


    map_range(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }


    innerCircleBehaviour(mouse, time, wiggle) {
        for (let i = 1; i < this.displayed.vertices.length - 1; i++) {

            if ((i) % 2 != 0) {

                let v = this.displayed.vertices[i]
                this.oldPos[i] = v
                this.difference = noise.noise2(time * v.x, time * v.y)
                let o = this.origin.vertices[i]
                o.addSelf(this.shapeOrigin)
                this.lineDistance = distanceToLineSegment(this.anchor.x, this.anchor.y, mouse.x, mouse.y, o.x, o.y)
                this.extraLength = o.distanceTo(this.anchor)
                this.lineDistance = this.clamp(this.lineDistance, 0, 30)
                this.lineDistance = this.map_range(this.lineDistance, 0, 30, 90, 0)
                this.amplitude = this.clamp(mouse.distanceTo(o), 0, this.growthConstaint) * Math.sin(this.lineDistance * conversion)

                o.subSelf(this.shapeOrigin)


                v.x = this.lerp(o.x + (this.amplitude + this.difference) * Math.cos(this.theta + noise.noise2(time * 0.01 * v.x, time * v.x * 0.01) * wiggle), this.oldPos[i].x, 0.02);
                v.y = this.lerp(o.y + (this.amplitude + this.difference) * Math.sin(this.theta + noise.noise2(time * 0.01 * v.y, time * v.y * 0.01) * wiggle), this.oldPos[i].y, 0.02);

                this.oldPos[i] = v






            }
        }
    }



    standbyBehaviour(mouse, time, wiggle) {
        for (let i = 1; i < this.displayed.vertices.length - 1; i++) {

            if ((i) % 2 != 0) {

                let v = this.displayed.vertices[i]
                this.oldPos[i] = v
                this.difference = noise.noise2(time * v.x, time * v.y) 
                let o = this.origin.vertices[i]
                o.addSelf(this.shapeOrigin)
                this.lineDistance = distanceToLineSegment(this.anchor.x, this.anchor.y, mouse.x, mouse.y, o.x, o.y)

                this.lineDistance = this.clamp(this.lineDistance, 0, 40)
                this.lineDistance = this.map_range(this.lineDistance, 0, 40, 90, 0)
                this.amplitude = this.clamp(mouse.distanceTo(o), 0, this.growthConstaint * 0.25) * Math.sin(this.lineDistance * conversion)

                o.subSelf(this.shapeOrigin)


                v.x = this.lerp(o.x + (this.amplitude + this.difference) * Math.cos(this.theta + noise.noise2(time * 0.01 * v.x, time * v.x * 0.01 * this.amplitude) * wiggle), this.oldPos[i].x, 0.3);
                v.y = this.lerp(o.y + (this.amplitude + this.difference) * Math.sin(this.theta + noise.noise2(time * 0.01 * v.y, time * v.y * 0.01 * this.amplitude) * wiggle), this.oldPos[i].y, 0.3);

                this.oldPos[i] = v






            }
        }
    }


    noMouse(mouse, retreat, time) {
        for (let i = 1; i < this.displayed.vertices.length - 1; i++) {

            if ((i) % 2 != 0) {

                let v = this.displayed.vertices[i]
                this.oldPos[i] = v
                this.difference = noise.noise2(time * v.x, time * v.y)
                let o = this.origin.vertices[i]
                // o.addSelf(this.shapeOrigin)



                v.x = this.lerp(o.x, this.oldPos[i].x, retreat);
                v.y= this.lerp(o.y, this.oldPos[i].y, retreat);

                this.oldPos[i] = v






            }
        }
    }



    run(mouse, time, growthConstaints, debug, controls) {
        this.growthConstaint = growthConstaints[this.id]
        this.mouseActive = controls.mouseActive






        if (this.tweening === false && this.anchor) {
            if (debug) {
                if (mouse.distanceTo(this.shapeOrigin) < this.influenceRadius) {
                    this.mouseLine.visible = true
                } else {
                    this.mouseLine.visible = false

                }
            } else {
                this.mouseLine.visible = false
            }


            this.theta = Math.atan2((mouse.y - this.anchor.y), (mouse.x - this.anchor.x))
            this.theta = (this.theta > 0 ? this.theta : (2 * Math.PI + this.theta))

          
            if (this.mouseActive) {


                // -=-==-=-=--=-=-=-=-=-==-=-==--=-==--==- If mouse is close to the centroid -=--=-=============================== 
                if (this.shapeOrigin.distanceTo(mouse) <= this.influenceRadius) {

                    this.innerCircleBehaviour(mouse, time, controls.wiggle)


                } else if (this.shapeOrigin.distanceTo(mouse) > this.influenceRadius) {

                    this.standbyBehaviour(mouse, time, controls.wiggle)

                }
            } else {

                this.noMouse(mouse, controls.retreat, time) 

                

            }
        }




    }



}