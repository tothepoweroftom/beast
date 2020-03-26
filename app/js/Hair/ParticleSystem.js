
import {
    distanceToLineSegment
} from '../Util/Util'
import * as _ from 'lodash-es'
import * as noise from "../Util/Perlin"


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
        this.getAbsolutePoints()
        this.originalLengths = []
        this.lineDistance = 0
     



    }

    setMouseAnchor(AnchorCircle) {

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

        this.path.scale = scale


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


    innerCircleBehaviour(mouse, time) {
        for (let i = this.rules.start; i < this.displayed.vertices.length - this.rules.end; i++) {

            if ((i) % 2 != 0 && !this.rules.exceptions.includes(i)) {




                let v = this.displayed.vertices[i]
                this.oldPos[i] = v
                let o = this.origin.vertices[i]









                // ////console("distance", v.distanceTo(o))
            }
        }
    }

    outerCircleBehaviour(mouse, time) {
        for (let i = this.rules.start; i < this.displayed.vertices.length - this.rules.end; i++) {

            if ((i + 1) % 2 === 0 && !this.rules.exceptions.includes(i)) {




                let v = this.displayed.vertices[i]
                let o = this.origin.vertices[i]







                // ////console("distance", v.distanceTo(o))
            }
        }
    }

    standbyBehaviour(mouse, time) {
        for (let i = this.rules.start; i < this.displayed.vertices.length - this.rules.end; i++) {

            if ((i) % 2 != 0) {
                this.amplitude = 5.0

                let v = this.displayed.vertices[i]
                this.oldPos[i] = v
                this.difference = noise.noise2(time * v.x, time * v.y) * this.amplitude
                let o = this.origin.vertices[i]


                v.x = this.lerp(o.x + (this.amplitude + this.difference) * Math.cos(this.theta + noise.noise2(time * 0.01 * v.x, time * v.x * 0.01 * this.amplitude) * Math.PI / 5), this.oldPos[i].x, 0.2);
                v.y = this.lerp(o.y + (this.amplitude + this.difference) * Math.sin(this.theta + noise.noise2(time * 0.01 * v.y, time * v.y * 0.01 * this.amplitude) * Math.PI / 5), this.oldPos[i].y, 0.2);

                this.oldPos[i] = v






            }
        }
    }



    run(mouse, time, controls) {

   



        if (this.tweening === false) {
            this.theta = Math.atan2((mouse.y + this.shapeOrigin.y), (mouse.x + this.shapeOrigin.x))
            this.theta = (this.theta > 0 ? this.theta : (2 * Math.PI + this.theta))
            if (this.rules) {

                // -=-==-=-=--=-=-=-=-=-==-=-==--=-==--==- If mouse is close to the centroid -=--=-=============================== 
                if (this.shapeOrigin.distanceTo(mouse) <= this.influenceRadius * 0.5 || this.rules.outerHair === true) {

                    this.innerCircleBehaviour(mouse, time)


                } else if (this.shapeOrigin.distanceTo(mouse) > this.influenceRadius * 0.5 && this.shapeOrigin.distanceTo(mouse) <= this.influenceRadius && this.rules.outerHair == false) {
                    this.outerCircleBehaviour(mouse, time)
                } else if (this.shapeOrigin.distanceTo(mouse) > this.influenceRadius) {

                    this.standbyBehaviour(mouse, time)

                }
            }
        }

        this.time += 1

        if (this.time === 100) {
            // this.reset()
            this.time = 0
        }


    }



}