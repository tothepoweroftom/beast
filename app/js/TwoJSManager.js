import Two from 'two.js'
import ParticleSystem from './Hair/ParticleSystem'
import RailSystem from './Hair/RailSystem'
import {noise} from "./Util/Perlin"
import MouseAnalyser from './Util/MouseAnalyser'

let colorClasses = []

export default function TwoJSManager() {
    
    // DAT.GUI
    ////////////////////////////////////////////////////////////////////////////////////
    this.controlData = {}
    this.mouseControl = true;
    this.growHairs = 0.1
    this.angle = 0.0
    this.debug = true;
    this.logoScale = 1.0




    this.mouseAnalyser = new MouseAnalyser()
    this.resizeCount = 0;


    this.xAxis, this.yAxis = null

    var two = new Two({
        fullscreen: true,
        width: window.innerWidth,
        height: window.innerHeight,
        autostart: true
    }).appendTo(document.querySelector(".container"));

    var svg = document.querySelector("svg#superbeast");
    svg.style.display = "none";

    // MOUSE
    this.mouse = new Two.Vector()

    var influenceRadius = 160;

    let lines = []


    var ball = two.makeCircle(two.width / 2, two.height / 2, influenceRadius);
    ball.noFill().stroke = 'red';
    var innerBall = two.makeCircle(two.width / 2, two.height / 2, influenceRadius / 2);
    innerBall.noFill().stroke = 'purple';

    var logo = two.interpret(svg);
    logo.center();



    var rect = logo.getBoundingClientRect();
    this.logoRect = two.makeRectangle(rect.left + rect.width / 2, rect.top + rect.height / 2, rect.width, rect.height)
    this.logoRect.stroke = "#ff00ff"
    this.logoRect.fill = "rgba(0,0,0,0)"
    let rects = []
    let hairSystems = []
    let railSystems = []

    this.anchors = {}



    ///////////////////////////////////////////////////
    /// Take the logo and parse out the hairy regions//
    ///////////////////////////////////////////////////

    for (let i = 0; i < logo.children.length; i++) {

        //  Check if it is a hairs patch
        if (logo.children[i].id.includes("hair")) {
            if (logo.children[i].children[0]) {
                

                // let childRect = logo.children[i].children[0].getBoundingClientRect()
                // //////console.log(childRect)
                // let origin = new Two.Vector(childRect.left + childRect.width / 2, childRect.top + childRect.height / 2)
            
                // let hairsystem = new ParticleSystem(two, origin, logo.children[i], i)
                // colorClasses.push(logo.children[i].children[0].fill)
                // hairSystems.push(hairsystem)
            }
        } else if(logo.children[i].id.includes("anchor")) {
            console.log(logo.children[i].id.charAt(0))
            let childRect = logo.children[i].getBoundingClientRect()

            let origin = new Two.Vector(childRect.left + childRect.width / 2, childRect.top + childRect.height / 2)
            this.anchors[logo.children[i].id.charAt(0)] = origin

   
        } else if(logo.children[i].id.includes("rail")) {
            // console.log(logo.children[i].children[0])
            let rail = logo.children[i].children[0]
            rail.subdivide()

            // let railSystem = new RailSystem(rail, two)

       
  
        }
    }

    console.log(this.anchors)






    // // Scene resize -==---------------------------------------------------------------------
    two.bind("resize", () => {
        
        var aspect = two.width / two.height;


 
        for (let i = 0; i < hairSystems.length; i++) {
            let childRect = hairSystems[i].path.getBoundingClientRect()
            let origin = new Two.Vector(childRect.left + childRect.width / 2, childRect.top + childRect.height / 2)
            if (hairSystems[i].path.id === "hair00") {
                this.specialOrigin = origin
            }
           
           
            hairSystems[i].setShapeOrigin(origin)
            hairSystems[i].setInfluence(influenceRadius * logo.scale)

      

        }

        two.scene.translation.set(two.width / 2, two.height / 2);



    });
    two.trigger("resize");










    // // UPDATE

    var duration = 5000;
    var elapsed = 0;


    two.bind("update", (frameCount, timeDelta) => {
        if (!timeDelta) {
            return;
        }



        elapsed += timeDelta;





        if (!this.debug && ball.visible === true) {
            ball.visible = false
            innerBall.visible = false
            rects.forEach((rect) => {
                rect.visible = false
            })
            hairSystems.forEach((hair, index) => {
                //////console.log(hair)
                hair.path.fill = "#02f768"
                logo.children[0].fill = "#02f768"
            })
            // mouseLine.visible = false
            this.logoRect.visible = false

        } else if (this.debug && ball.visible === false) {
            ball.visible = true;
            innerBall.visible = true;

            rects.forEach((rect) => {
                rect.visible = true
            })

            hairSystems.forEach((hair, index) => {
                ////console.log(hair)
                hair.path.fill = colorClasses[index]
                logo.children[0].fill = "#ffffff"
            })

            // mouseLine.visible = true
            this.logoRect.visible = true

        }



        for (let i = 0; i < hairSystems.length; i++) {
            hairSystems[i].run(this.mouse, elapsed, {
                debug: this.debug,
                mouseControl: this.mouseControl,
                growHairs: this.growHairs,
                angle: (this.angle) * (Math.PI / 180)
            });
        }
        ball.position = this.mouse
        innerBall.position = this.mouse




    });
}