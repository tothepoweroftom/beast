import Two from 'two.js'
import ParticleSystem from './Hair/ParticleSystem'
import RailSystem from './Hair/RailSystem'
import ParticleBackground from './Background/ParticleBackground'
import Stats from 'stats.js'
import {TweenLite} from 'gsap'



let colorClasses = []
let rects = []
let hairSystems = []
let railSystems = []
let bases = [];

let anchorlist = ["head", "leg", "leftarm", "rightarm"]

export default function TwoJSManager() {
    // 0: fps, 1: ms, 2: mb, 3+: custom

    // DAT.GUI CONTROLS
    ////////////////////////////////////////////////////////////////////////////////////
    this.controlData = {}
    this.mouseControl = true;
    // this.growHairs = 0.1
    this.angle = 0.0
    this.debug = false;
    this.mouseActive = false
    this.superLogoScale = 1.0
    this.wiggle = 0.83;
    this.retreat = 0.9;

    // this.spacing = 50;
    this.resized = false
    this.eye;

    /// init Two.js ===================================    
    let container = document.querySelector(".container")
    var two = new Two({
        fullscreen: true,
        width: container.innerWidth,
        height: container.innerHeight,
        autostart: true
    }).appendTo(document.querySelector(".container"));
    this.particleBackground = new ParticleBackground(two)
    this.particleBackground.particleGroup.opacity = 0
    if (two.width < 1024) {
        this.retreat = 0.5
    }
    // Mouse Controls ========================================
    this.mouse = new Two.Vector()
    this.influenceRadius = 250;
    var ball = two.makeCircle(two.width / 2, two.height / 2, this.influenceRadius);
    ball.noFill().stroke = 'red';


    /// CONTROL STRUCTURES ===================================
    this.anchors = {

    }

    this.angleAnchors = {

    }

    this.growthLimits = {

    }

    // //Make Groups for Each SVG Logo
    this.superLogoGroup = new Two.Group();
    // two.add(this.superLogoGroup);
    this.beastLogoGroup = new Two.Group();
    two.add(this.beastLogoGroup);

    // Load Super Logo

    const loadCyclops = () => {
        var svg = document.querySelector("svg#cyclops");
        svg.style.display = "none";
        var superLogo = two.interpret(svg);
        superLogo.center()
        superLogo.translation.y = -100
        two.remove(superLogo)
        this.beastLogoGroup.add(superLogo);
        var rect = superLogo.getBoundingClientRect();


        // PARSE OUT THE HAIR SLUGS -------------------------------------------------------------------------------------------
        for (let i = 0; i < superLogo.children.length; i++) {

            //  Check if it is a hairs patch
            if (superLogo.children[i].id.includes("hair")) {

                if (superLogo.children[i].children[0]) {
                    superLogo.children[i].fill = "#02f768"

                    superLogo.children[i].stroke = "#02f768"
                    let childRect = superLogo.children[i].children[0].getBoundingClientRect()
                    let origin = new Two.Vector(childRect.left + childRect.width / 2, childRect.top + childRect.height / 2)
                    let hairsystem = new ParticleSystem(two, origin, superLogo.children[i], i)
                    hairsystem.setID(superLogo.children[i].id)
                    colorClasses.push(superLogo.children[i].children[0].fill)
                    hairSystems.push(hairsystem)

                }

            } else if (superLogo.children[i].id.includes("eye")){
                this.eye = superLogo.children[i]
                console.log(this.eye)
                // this.eye.scale.y = 0.1
                   
            }
        }
    }



    loadCyclops()



    this.growHairs = ()=> {


        hairSystems.forEach((hair, i) => {
            setTimeout(()=>{
                hair.growHairs()

            }, i*150 )
           


        })
        let scale = this.beastLogoGroup.scale
        TweenLite.to(this.beastLogoGroup, .5, {
            scale: scale*1.1, 
            onComplete: ()=>{
                TweenLite.to(this.beastLogoGroup, 0.5, {
                    scale: scale,
                })
            }
        })

        TweenLite.to(this.particleBackground.particleGroup, 0.5, {
            opacity:1
        })

    }


    /////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                         //
    //                      RESIZING FUNCTION                                                  //
    //                                                                                         //
    /////////////////////////////////////////////////////////////////////////////////////////////
    two.bind("resize", () => {

        var aspect = two.width / two.height;
        console.log(two.width)



        // 1. ADDRESS THE PLACEMENT



        this.anchors = {}
        this.angleAnchors = {}



        if (window.innerWidth < 1024) {
            this.influenceRadius = two.width / 5

            // this.superLogoGroup.scale = 0.3 + two.width / 2000
            this.beastLogoGroup.translation.x = -10
            // this.superLogoGroup.translation.set(-30 * this.beastLogo.scale,  -this.superLogoRect.height / 3 * this.superLogoGroup.scale)





        } else {
            this.superLogoGroup.translation.y = 0
            this.superLogoGroup.scale = 0.5 + two.width / 3000

            this.influenceRadius = 5

        }


        // // Anchors resize
        this.beastLogoGroup.children[0].children.forEach((group) => {
            if (anchorlist.includes(group.id) ) {
                let childRect = group.children[0].getBoundingClientRect()
                let origin = new Two.Vector(childRect.left + childRect.width / 2, childRect.top + childRect.height / 2)

                // origin.normalize()
                this.angleAnchors[group.id] = origin.clone()

                if(!this.resized) {
                    origin.multiplyScalar(this.beastLogoGroup.scale)

                    origin.addSelf(this.beastLogoGroup.translation)

                }  else {
                    origin.subSelf(two.width/2,two.height/2)
                    this.angleAnchors[group.id] = origin.clone()



                }

                this.anchors[group.id] = origin
                group.visible = false



            }
        })


        //Tell hairs to resize

        hairSystems.forEach((hair) => {

            let childRect = hair.path.getBoundingClientRect()
            let origin = new Two.Vector(childRect.left + childRect.width / 2, childRect.top + childRect.height / 2)


            // if (!this.resized) {
            //     origin = origin.multiplyScalar(this.beastLogoGroup.scale)
            //     origin.addSelf(this.beastLogoGroup.translation)

            // } else {
            //     origin.subSelf(two.width / 2, two.height / 2)



            // }

            if (two.width > 1024) {
                this.influenceRadius = two.width / 6
                hair.resize(two.width / 8, origin, this.beastLogoGroup.scale)

            } else {
                this.influenceRadius = two.width / 4

                hair.resize(two.width / 6, origin, this.beastLogoGroup.scale)

            }



        })


        // Tell

        two.scene.translation.set(two.width / 2, two.height / 2);



        this.resized = true;




    });

    two.trigger("resize")










    var duration = 5000;
    var elapsed = 0;


    two.bind("update", (frameCount, timeDelta) => {


        if (!frameCount) {
            return
        }

        elapsed += timeDelta;

        // console.log(frameCount)
        this.particleBackground.run(timeDelta, this.mouse)

        // if (frameCount % 3 === 0 && two.width>1024) {
        //     // railSystems.forEach((rail, i) => {
        //     //     if(this.angleAnchors[railSystems[i].id]) {
        //     //         this.growthLimits[railSystems[i].id] = railSystems[i].checkForClosest(this.angleAnchors[railSystems[i].id], this.mouse, this.influenceRadius)

        //     //     }

        //     // })
        // }


        // this.eye.scale.x = Math.abs(Math.sin(elapsed*0.1))

      
        // this.eye.scale.y= Math.abs(Math.sin(elapsed*0.1))



        if (!this.debug && ball.visible === true) {
            ball.visible = false
            rects.forEach((rect) => {
                rect.visible = false
            })
            hairSystems.forEach((hair, index) => {
                //////////console.log(hair)
                hair.mouseLine.visible = false;

                hair.path.fill = "#000000"
                hair.path.stroke = "#000000"

            })

            railSystems.forEach((rail) => {
                rail.togglePoints(false)
            })
            // mouseLine.visible = false
            bases.forEach((base) => {
                base.fill = "#000"

            })

            // this.superLogoRect.visible = false

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
            hairSystems[i].updateMouseLine(this.angleAnchors, this.mouse)



        }


        ball.position = this.mouse
        ball.radius = this.influenceRadius


        this.beastLogoGroup.translation.x = this.mouse.x * 0.005
        this.beastLogoGroup.translation.y = this.mouse.y * 0.005

    });

}