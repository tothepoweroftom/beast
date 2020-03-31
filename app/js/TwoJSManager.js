import Two from 'two.js'
import ParticleSystem from './Hair/ParticleSystem'
import RailSystem from './Hair/RailSystem'

import Stats from 'stats.js'
import ParticleBackground from './Background/ParticleBackground'


let colorClasses = []
let rects = []
let hairSystems = []
let railSystems = []
let bases = [];

export default function TwoJSManager() {
    this.stats = new Stats();
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom);


    // DAT.GUI CONTROLS
    ////////////////////////////////////////////////////////////////////////////////////
    this.controlData = {}
    this.mouseControl = true;
    this.growHairs = 0.1
    this.angle = 0.0
    this.debug = false;
    this.mouseActive = false
    this.superLogoScale = 1.0
    this.wiggle = Math.PI / 20;
    this.retreat = 0.8;
    // this.spacing = 50;


    /// init Two.js ===================================    
    let container = document.querySelector(".container")
    var two = new Two({
        fullscreen: true,
        type: Two.Types.svg,
        width: container.innerWidth,
        height: container.innerHeight,
        autostart: true
    }).appendTo(document.querySelector(".container"));
    this.particleBackground = new ParticleBackground(two)

    // Mouse Controls ========================================
    this.mouse = new Two.Vector()
    this.influenceRadius = 250;
    var ball = two.makeCircle(two.width / 2, two.height / 2, this.influenceRadius);
    ball.noFill().stroke = 'red';

    /// CONTROL STRUCTURES ===================================
    this.anchors = {

    }

    this.growthLimits = {

    }

    //Make Groups for Each SVG Logo
    this.superLogoGroup = new Two.Group();
    two.add(this.superLogoGroup);
    this.beastLogoGroup = new Two.Group();
    two.add(this.beastLogoGroup);

    // Load Super Logo

    const loadSuper = () => {
        var svg = document.querySelector("svg#super");
        svg.style.display = "none";
        var superLogo = two.interpret(svg);
        superLogo.center()
        two.remove(superLogo)
        this.superLogoGroup.add(superLogo);
        var rect = superLogo.getBoundingClientRect();
        this.superLogoRect = new Two.Rectangle(rect.left + rect.width / 2, rect.top + rect.height / 2, rect.width, rect.height)
        this.superLogoRect.stroke = "#ff00ff"
        this.superLogoRect.fill = "rgba(0,0,0,0)"
        this.superLogoGroup.add(this.superLogoRect);

        // PARSE OUT THE HAIR SLUGS -------------------------------------------------------------------------------------------
        for (let i = 0; i < superLogo.children.length; i++) {

            //  Check if it is a hairs patch
            if (superLogo.children[i].id.includes("hair")) {

                if (superLogo.children[i].children[0]) {
                    let childRect = superLogo.children[i].children[0].getBoundingClientRect()
                    let origin = new Two.Vector(childRect.left + childRect.width / 2, childRect.top + childRect.height / 2)
                    let hairsystem = new ParticleSystem(two, origin, superLogo.children[i], i)
                    hairsystem.setID("super" + superLogo.children[i].id.charAt(2).toUpperCase())
                    colorClasses.push(superLogo.children[i].children[0].fill)
                    hairSystems.push(hairsystem)
                }

            } else if (superLogo.children[i].id.includes("anchor")) {

                // let childRect = superLogo.children[i].getBoundingClientRect()
                // let origin = new Two.Vector(childRect.left + childRect.width / 2, childRect.top + childRect.height / 2)
                // this.anchors["super" + superLogo.children[i].id.charAt(2).toUpperCase()] = origin
                // superLogo.children[i].visible = false

            } else if (superLogo.children[i].id.includes("rail")) {

                let rail = superLogo.children[i].children[0]
                rail.visible = false
                rail.subdivide()
                let railSystem = new RailSystem(rail, this.superLogoGroup, two)
                railSystem.setID("super" + superLogo.children[i].id.charAt(2).toUpperCase())
                railSystems.push(railSystem)

            } else if (superLogo.children[i].id.includes("base")) {

                bases.push(superLogo.children[i])

            }
        }
    }

    const loadBeast = () => {
        //Load Beast SVG
        var beastsvg = document.querySelector("svg#beast");
        beastsvg.style.display = "none";

        this.beastLogo = two.interpret(beastsvg);
        this.beastLogo.center()
        two.remove(this.beastLogo)

        this.beastLogoGroup.add(this.beastLogo)

        var rect = this.beastLogo.getBoundingClientRect();
        this.beastLogoRect = new Two.Rectangle(rect.left + rect.width / 2, rect.top + rect.height / 2, rect.width, rect.height)
        this.beastLogoRect.stroke = "#ffffff"
        this.beastLogoRect.fill = "rgba(0,0,0,0)"
        rects.push(rect)

        // /// Same for Beast Logo
        for (let i = 0; i < this.beastLogo.children.length; i++) {

            //  Check if it is a hairs patch
            if (this.beastLogo.children[i].id.includes("hair")) {
                if (this.beastLogo.children[i].children[0]) {

                    let childRect = this.beastLogo.children[i].children[0].getBoundingClientRect()
                    let origin = new Two.Vector(childRect.left + childRect.width / 2, childRect.top + childRect.height / 2)
                    let hairsystem = new ParticleSystem(two, origin, this.beastLogo.children[i], i)
                    hairsystem.setID("beast" + this.beastLogo.children[i].id.charAt(2).toUpperCase())
                    colorClasses.push(this.beastLogo.children[i].children[0].fill)
                    hairSystems.push(hairsystem)

                }
            } else if (this.beastLogo.children[i].id.includes("anchor")) {

                // let childRect = this.beastLogo.children[i].getBoundingClientRect()
                // let origin = new Two.Vector(childRect.left + childRect.width / 2, childRect.top + childRect.height / 2)

                // this.anchors["beast" + this.beastLogo.children[i].id.charAt(2).toUpperCase()] = origin.multiplyScalar(0.2 + two.width/2000)
                // this.beastLogo.children[i].visible = false

            } else if (this.beastLogo.children[i].id.includes("rail")) {

                let rail = this.beastLogo.children[i].children[0]
                rail.visible = false
                rail.subdivide()
                let railSystem = new RailSystem(rail, this.beastLogoGroup, two)
                railSystem.setID("beast" + this.beastLogo.children[i].id.charAt(2).toUpperCase())
                railSystems.push(railSystem)

            } else if (this.beastLogo.children[i].id.includes("base")) {

                bases.push(this.beastLogo.children[i])

            }
        }
    }

    loadSuper()
    loadBeast()



    /////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                         //
    //                      RESIZING FUNCTION                                                  //
    //                                                                                         //
    /////////////////////////////////////////////////////////////////////////////////////////////
    two.bind("resize", () => {

        var aspect = two.width / two.height;
        console.log(two.width)



        // 1. ADDRESS THE PLACEMENT







        if (window.innerWidth < 1024) {
            this.influenceRadius = two.width / 5

            this.superLogoGroup.scale = 0.2 + two.width / 2000
            this.beastLogoGroup.scale = 0.2 + two.width / 2000
            this.beastLogoGroup.translation.x = 0
            this.beastLogoGroup.translation.y = +this.beastLogoRect.height / 3 * this.beastLogoGroup.scale
            this.superLogoGroup.translation.x = -30 * this.beastLogo.scale
            this.superLogoGroup.translation.y = -this.superLogoRect.height / 3 * this.superLogoGroup.scale




        } else {
            this.superLogoGroup.translation.y = 0
            this.superLogoGroup.scale = 0.5 + two.width / 3000
            this.beastLogoGroup.scale = 0.5 + two.width / 3000
            this.beastLogoGroup.translation.x = this.beastLogoRect.width / 2.75 * this.beastLogoGroup.scale
            this.beastLogoGroup.translation.y = 0

            this.superLogoGroup.translation.y = 0

            this.superLogoGroup.translation.x = -this.beastLogoRect.width / 2.75 * this.beastLogoGroup.scale
            // this.influenceRadius = two.width/10
            this.influenceRadius = two.width / 10

        }


        // Anchors resize
        this.superLogoGroup.children[0].children.forEach((group) => {
            if (group.id.includes("anchor")) {
                let childRect = group.getBoundingClientRect()
                let origin = new Two.Vector(childRect.left + childRect.width / 2, childRect.top + childRect.height / 2)

                console.log(group.children[0].position)
                // origin.normalize()
                origin = origin.multiplyScalar(this.superLogoGroup.scale)
                origin.addSelf(this.superLogoGroup.translation)

                this.anchors["super" + group.id.charAt(2).toUpperCase()] = origin

                // let rect = two.makeLine(origin.x, origin.y, 0,0)
                // rect.stroke = "red"

            }
        })

        this.beastLogoGroup.children[0].children.forEach((group) => {
            if (group.id.includes("anchor")) {
                let childRect = group.getBoundingClientRect()
                let origin = new Two.Vector(childRect.left + childRect.width / 2, childRect.top + childRect.height / 2)

                // origin.normalize()
                origin = origin.multiplyScalar(this.beastLogoGroup.scale)
                origin.addSelf(this.beastLogoGroup.translation)

                this.anchors["beast" + group.id.charAt(2).toUpperCase()] = origin



            }
        })


        //Tell hairs to resize

        hairSystems.forEach((hair) => {

            let childRect = hair.path.getBoundingClientRect()
            let origin = new Two.Vector(childRect.left + childRect.width / 2, childRect.top + childRect.height / 2)
            if (hair.path.id.charAt(0) === "S") {
                console.log("S")
                origin = origin.multiplyScalar(this.superLogoGroup.scale)
                origin.addSelf(this.superLogoGroup.translation)



            } else {
                console.log("B")

                origin = origin.multiplyScalar(this.beastLogoGroup.scale)
                origin.addSelf(this.beastLogoGroup.translation)

            }
            if(two.width>1024) {
                this.influenceRadius = two.width/6
                hair.resize(two.width/6, origin)

            } else {
                this.influenceRadius = two.width/4

                hair.resize(two.width/4, origin)

            }
        })

        two.scene.translation.set(two.width / 2, two.height / 2);







    });

    two.trigger("resize")










    var duration = 5000;
    var elapsed = 0;


    two.bind("update", (frameCount, timeDelta) => {

        if (!frameCount) {
            return
        }
        this.stats.begin();


        elapsed += timeDelta;

        // console.log(frameCount)

        if (frameCount % 2 === 0) {
            this.particleBackground.run(timeDelta)
            railSystems.forEach((rail, i) => {
                this.growthLimits[railSystems[i].id] = railSystems[i].checkForClosest(this.anchors[railSystems[i].id], this.mouse, this.influenceRadius)

            })
        }






        if (!this.debug && ball.visible === true) {
            ball.visible = false
            rects.forEach((rect) => {
                rect.visible = false
            })
            hairSystems.forEach((hair, index) => {
                //////////console.log(hair)
                hair.mouseLine.visible = false;

                hair.path.fill = "#02f768"
                hair.path.stroke = "#02f768"

            })

            railSystems.forEach((rail) => {
                rail.togglePoints(false)
            })
            // mouseLine.visible = false
            bases.forEach((base) => {
                base.fill = "#02f768"

            })

            this.superLogoRect.visible = false

        } else if (this.debug && ball.visible === false) {
            ball.visible = true;

            rects.forEach((rect) => {
                rect.visible = true
            })

            railSystems.forEach((rail) => {
                rail.togglePoints(true)
            })

            hairSystems.forEach((hair, index) => {
                hair.mouseLine.visible = true;
                ////////console.log(hair)
                hair.path.fill = colorClasses[index]
            })
            bases.forEach((base) => {
                base.fill = "#ffffff"

            })



            // mouseLine.visible = true
            this.superLogoRect.visible = true

        }





        for (let i = 0, l = hairSystems.length; i < l; i++) {
            hairSystems[i].run(this.mouse, elapsed, this.growthLimits, this.debug, {
                mouseActive: this.mouseActive,
                wiggle: this.wiggle,
                retreat: this.retreat
            });
            hairSystems[i].updateMouseLine(this.anchors[hairSystems[i].id], this.mouse)



        }


        ball.position = this.mouse
        ball.radius = this.influenceRadius



        this.stats.end()
    });

}