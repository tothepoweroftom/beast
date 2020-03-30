import Two from 'two.js'
import ParticleSystem from './Hair/ParticleSystem'
import RailSystem from './Hair/RailSystem'
import * as noise from "./Util/Perlin"
import MouseAnalyser from './Util/MouseAnalyser'
import Stats from 'stats.js'
import ParticleBackground from './Background/ParticleBackground'
import Mediator from './Background/Mediator'

let colorClasses = []

export default function TwoJSManager() {
    this.stats = new Stats();
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom);
    // DAT.GUI
    ////////////////////////////////////////////////////////////////////////////////////
    this.controlData = {}
    this.mouseControl = true;
    this.growHairs = 0.1
    this.angle = 0.0
    this.debug = false;
    this.mouseActive = false
    this.superLogoScale = 1.0
    this.wiggle = Math.PI / 15;
    this.retreat = 0.9;
    this.spacing = 50;





    this.mouseAnalyser = new MouseAnalyser()
    this.resizeCount = 0;


    this.xAxis, this.yAxis = null
    let container = document.querySelector(".container")
    var two = new Two({
        fullscreen: true,
        type: Two.Types.svg,
        width: container.innerWidth,
        height: container.innerHeight,
        autostart: true
    }).appendTo(document.querySelector(".container"));


    this.superLogoGroup = new Two.Group();
    two.add(this.superLogoGroup);
    this.beastLogoGroup = new Two.Group();
    two.add(this.beastLogoGroup);
    var svg = document.querySelector("svg#super");
    svg.style.display = "none";
    this.particleBackground = new ParticleBackground(two)

    // MOUSE
    this.mouse = new Two.Vector()

    this.influenceRadius = 250;

    let lines = []


    var ball = two.makeCircle(two.width / 2, two.height / 2, this.influenceRadius);
    ball.noFill().stroke = 'red';
    var innerBall = two.makeCircle(two.width / 2, two.height / 2, this.influenceRadius / 2);
    innerBall.noFill().stroke = 'purple';

    var superLogo = two.interpret(svg);
    superLogo.center()
    superLogo.translation.x = -200
    two.remove(superLogo)
    this.superLogoGroup.add(superLogo);

    var rect = superLogo.getBoundingClientRect();
    this.superLogoRect = new Two.Rectangle(rect.left + rect.width / 2, rect.top + rect.height / 2, rect.width, rect.height)
    this.superLogoRect.stroke = "#ff00ff"
    this.superLogoRect.fill = "rgba(0,0,0,0)"
    this.superLogoGroup.add(this.superLogoRect);
    // superLogo.translation.x = -this.superLogoRect.width/2 + this.spacing

    // superLogo.center();
    // superLogo.width = window.innerWidth
    var beastsvg = document.querySelector("svg#beast");
    beastsvg.style.display = "none";

    var beastLogo = two.interpret(beastsvg);
    beastLogo.center()
    two.remove(beastLogo)

    this.beastLogoGroup.add(beastLogo)

    var rect = beastLogo.getBoundingClientRect();
    this.beastLogoRect = new Two.Rectangle(rect.left + rect.width / 2, rect.top + rect.height / 2, rect.width, rect.height)
    this.beastLogoRect.stroke = "#ffffff"
    this.beastLogoRect.fill = "rgba(0,0,0,0)" 
       // beastLogo.center();
    beastLogo.translation.x = this.beastLogoRect.width/2 - this.spacing



    let rects = []
    let hairSystems = []
    let railSystems = []
    let bases = [];

    this.anchors = {}

    this.growthLimits = {

    }



    ///////////////////////////////////////////////////
    /// Take the superLogo and parse out the hairy regions//
    ///////////////////////////////////////////////////

    for (let i = 0; i < superLogo.children.length; i++) {

        //  Check if it is a hairs patch
        if (superLogo.children[i].id.includes("hair")) {
            if (superLogo.children[i].children[0]) {


                let childRect = superLogo.children[i].children[0].getBoundingClientRect()
                //////////console.log(childRect)
                let origin = new Two.Vector(childRect.left + childRect.width / 2, childRect.top + childRect.height / 2)

                let hairsystem = new ParticleSystem(two, origin, superLogo.children[i], i)
                hairsystem.setID("super" + superLogo.children[i].id.charAt(2).toUpperCase())
                console.log(superLogo.children[i].id.charAt(2))
                colorClasses.push(superLogo.children[i].children[0].fill)
                hairSystems.push(hairsystem)
            }
        } else if (superLogo.children[i].id.includes("anchor")) {
            // //console.log(superLogo.children[i].id.charAt(0))
            let childRect = superLogo.children[i].getBoundingClientRect()

            let origin = new Two.Vector(childRect.left + childRect.width / 2, childRect.top + childRect.height / 2)
            this.anchors["super" + superLogo.children[i].id.charAt(2).toUpperCase()] = origin
            superLogo.children[i].visible = false


        } else if (superLogo.children[i].id.includes("rail")) {
            // //console.log(superLogo.children[i].children[0])
            let rail = superLogo.children[i].children[0]
            rail.visible = false
            rail.subdivide()

            let railSystem = new RailSystem(rail, two)
            railSystem.setID("super" + superLogo.children[i].id.charAt(2).toUpperCase())
            // railSystem.scale = 2

            railSystems.push(railSystem)



        } else if (superLogo.children[i].id.includes("base")) {
            bases.push(superLogo.children[i])
        }
    }
  


    // /// Same for Beast Logo
    for (let i = 0; i < beastLogo.children.length; i++) {

        //  Check if it is a hairs patch
        if (beastLogo.children[i].id.includes("hair")) {
            if (beastLogo.children[i].children[0]) {


                let childRect = beastLogo.children[i].children[0].getBoundingClientRect()
                //////////console.log(childRect)
                let origin = new Two.Vector(childRect.left + childRect.width / 2, childRect.top + childRect.height / 2)

                let hairsystem = new ParticleSystem(two, origin, beastLogo.children[i], i)
                hairsystem.setID("beast" + beastLogo.children[i].id.charAt(2).toUpperCase())
                console.log(beastLogo.children[i].id.charAt(2))
                colorClasses.push(beastLogo.children[i].children[0].fill)
                hairSystems.push(hairsystem)
            }
        } else if (beastLogo.children[i].id.includes("anchor")) {
            // //console.log(beastLogo.children[i].id.charAt(0))
            let childRect = beastLogo.children[i].getBoundingClientRect()

            let origin = new Two.Vector(childRect.left + childRect.width / 2, childRect.top + childRect.height / 2)
            this.anchors["beast" + beastLogo.children[i].id.charAt(2).toUpperCase()] = origin
            beastLogo.children[i].visible = false


        } else if (beastLogo.children[i].id.includes("rail")) {
            // //console.log(beastLogo.children[i].children[0])
            let rail = beastLogo.children[i].children[0]
            rail.visible = false
            rail.subdivide()

            let railSystem = new RailSystem(rail, two)
            railSystem.setID("beast" + beastLogo.children[i].id.charAt(2).toUpperCase())
            // railSystem.scale = 2

            railSystems.push(railSystem)



        } else if (beastLogo.children[i].id.includes("base")) {
            bases.push(beastLogo.children[i])
        }
    }
  




    // // Scene resize -==---------------------------------------------------------------------
    two.bind("resize", () => {

        var aspect = two.width / two.height;



        // recalculate anchors





        // if (window.innerWidth < 1200) {
        //     beastLogo.translation.x = 0
        //     beastLogo.translation.y = +this.beastLogoRect.height/3
        //     superLogo.translation.x = -two.width/2
        //     superLogo.translation.y = -two.height/2
        //     this.superLogoGroup.scale = 0.5;
        //     this.beastLogoGroup.scale = 0.5;

        //     railSystems.forEach((rail) => {
        //         rail.pointsGroup.scale = 0.5;
        //     })

        // } else {
        //     beastLogo.translation.x = this.beastLogoRect.width/2 - this.spacing
        //     beastLogo.translation.y = 0
        //     this.superLogoGroup.scale = 1;
        //     this.beastLogoGroup.scale = 1;
        //     railSystems.forEach((rail)=>{
        //         rail.pointsGroup.scale = 1
        //     })
        // }



        // for (let i = 0; i < superLogo.children.length; i++) {

        //     if (superLogo.children[i].id.includes("anchor")) {
        //         // //console.log(superLogo.children[i].id.charAt(0))
        //         let childRect = superLogo.children[i].getBoundingClientRect()

        //         let origin = new Two.Vector(childRect.left + childRect.width / 2, childRect.top + childRect.height / 2)
        //         this.anchors["super" + superLogo.children[i].id.charAt(2).toUpperCase()] = origin


        //     }
        // }

        // hairSystems.forEach((hair)=>{
        //     // hair.resize()
        // })
        two.scene.translation.set(two.width / 2, two.height / 2);



    });
    two.trigger("resize");










    // // UPDATE

    var duration = 5000;
    var elapsed = 0;


    two.bind("update", (frameCount, timeDelta) => {

        this.stats.begin();


        elapsed += timeDelta;

        // console.log(frameCount)

        if (frameCount % 2 === 0) {
            this.particleBackground.run(timeDelta)

        }






        if (!this.debug && ball.visible === true) {
            ball.visible = false
            innerBall.visible = false
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
            innerBall.visible = true;

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

        railSystems.forEach((rail, i) => {
            this.growthLimits[railSystems[i].id] = railSystems[i].checkForClosest(this.anchors[railSystems[i].id], this.mouse)

        })



        for (let i = 0; i < hairSystems.length; i++) {
            hairSystems[i].run(this.mouse, elapsed, this.growthLimits, this.debug, {
                mouseActive: this.mouseActive,
                wiggle: this.wiggle,
                retreat: this.retreat
            });
            hairSystems[i].updateMouseLine(this.anchors[hairSystems[i].id], this.mouse)

        }


        ball.position = this.mouse
        innerBall.position = this.mouse



        this.stats.end()
    });

    Mediator(this)
}