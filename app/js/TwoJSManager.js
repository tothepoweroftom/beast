import Two from 'two.js'
import ParticleSystem from './Hair/ParticleSystem'
import RailSystem from './Hair/RailSystem'
import {noise} from "./Util/Perlin"
import MouseAnalyser from './Util/MouseAnalyser'
import Stats from 'stats.js'

let colorClasses = []

export default function TwoJSManager() {
    this.stats = new Stats();
    this.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( this.stats.dom );
    // DAT.GUI
    ////////////////////////////////////////////////////////////////////////////////////
    this.controlData = {}
    this.mouseControl = true;
    this.growHairs = 0.1
    this.angle = 0.0
    this.debug = false;
    this.logoScale = 1.0




    this.mouseAnalyser = new MouseAnalyser()
    this.resizeCount = 0;


    this.xAxis, this.yAxis = null
    let container =document.querySelector(".container")
    var two = new Two({
        fullscreen: true,
        width: container.innerWidth,
        height: container.innerHeight,
        autostart: true
    }).appendTo(document.querySelector(".container"));

    var svg = document.querySelector("svg#superbeast");
    svg.style.display = "none";

    // MOUSE
    this.mouse = new Two.Vector()

    this.influenceRadius = 250;

    let lines = []


    var ball = two.makeCircle(two.width / 2, two.height / 2, this.influenceRadius);
    ball.noFill().stroke = 'red';
    var innerBall = two.makeCircle(two.width / 2, two.height / 2, this.influenceRadius / 2);
    innerBall.noFill().stroke = 'purple';

    var logo = two.interpret(svg);
    logo.center();
    // logo.width = window.innerWidth



    var rect = logo.getBoundingClientRect();
    this.logoRect = two.makeRectangle(rect.left + rect.width / 2, rect.top + rect.height / 2, rect.width, rect.height)
    this.logoRect.stroke = "#ff00ff"
    this.logoRect.fill = "rgba(0,0,0,0)"
    let rects = []
    let hairSystems = []
    let railSystems = []
    let base;

    this.anchors = {}

    this.growthLimits = {

    }



    ///////////////////////////////////////////////////
    /// Take the logo and parse out the hairy regions//
    ///////////////////////////////////////////////////

    for (let i = 0; i < logo.children.length; i++) {

        //  Check if it is a hairs patch
        if (logo.children[i].id.includes("hair")) {
            if (logo.children[i].children[0]) {


                let childRect = logo.children[i].children[0].getBoundingClientRect()
                //////console.log(childRect)
                let origin = new Two.Vector(childRect.left + childRect.width / 2, childRect.top + childRect.height / 2)
            
                let hairsystem = new ParticleSystem(two, origin, logo.children[i], i)
                hairsystem.setID(logo.children[i].id.charAt(0))
                colorClasses.push(logo.children[i].children[0].fill)
                hairSystems.push(hairsystem)
            }
        } else if(logo.children[i].id.includes("anchor")) {
            // console.log(logo.children[i].id.charAt(0))
            let childRect = logo.children[i].getBoundingClientRect()

            let origin = new Two.Vector(childRect.left + childRect.width / 2, childRect.top + childRect.height / 2)
            this.anchors[logo.children[i].id.charAt(0)] = origin
            logo.children[i].visible = false

   
        } else if(logo.children[i].id.includes("rail")) {
            // console.log(logo.children[i].children[0])
            let rail = logo.children[i].children[0]
            rail.visible = false
            rail.subdivide()

            let railSystem = new RailSystem(rail, two)
            railSystem.setID(logo.children[i].id.charAt(0))
            // railSystem.scale = 2

            railSystems.push(railSystem)

       
  
        } else if(logo.children[i].id.includes("base")) {
            base = logo.children[i]
        }
    }

    // console.log(this.anchors)






    // // Scene resize -==---------------------------------------------------------------------
    two.bind("resize", () => {
        
        var aspect = two.width / two.height;



        this.influenceRadius = window.innerWidth/4
        ball.radius = this.influenceRadius
        for (let i = 0; i < hairSystems.length; i++) {
            let childRect = hairSystems[i].path.getBoundingClientRect()
            let origin = new Two.Vector(childRect.left + childRect.width / 2, childRect.top + childRect.height / 2)
      
           
           
            hairSystems[i].setShapeOrigin(origin)

            hairSystems[i].setInfluence(this.influenceRadius)

      

        }

        two.scene.translation.set(two.width / 2, two.height / 2);



    });
    two.trigger("resize");










    // // UPDATE

    var duration = 5000;
    var elapsed = 0;


    two.bind("update", (frameCount, timeDelta) => {
        // if (!timeDelta) {
        //     return;
        // }

        this.stats.begin();


        elapsed += timeDelta;





        if (!this.debug && ball.visible === true) {
            ball.visible = false
            innerBall.visible = false
            rects.forEach((rect) => {
                rect.visible = false
            })
            hairSystems.forEach((hair, index) => {
                //////console.log(hair)
                hair.mouseLine.visible = false;

                hair.path.fill = "#02f768"
            })

            railSystems.forEach((rail)=>{
                rail.togglePoints(false)
            })
            // mouseLine.visible = false
            base.fill = "#02f768"

            this.logoRect.visible = false

        } else if (this.debug && ball.visible === false) {
            ball.visible = true;
            innerBall.visible = true;

            rects.forEach((rect) => {
                rect.visible = true
            })

            railSystems.forEach((rail)=>{
                rail.togglePoints(true)
            })

            hairSystems.forEach((hair, index) => {
                hair.mouseLine.visible = true;
                ////console.log(hair)
                hair.path.fill = colorClasses[index]
            })
            base.fill = "#ffffff"



            // mouseLine.visible = true
            this.logoRect.visible = true

        }

        railSystems.forEach((rail,i)=>{
            this.growthLimits[railSystems[i].id] = railSystems[i].checkForClosest(this.anchors[railSystems[i].id], this.mouse)

        })



        for (let i = 0; i < hairSystems.length; i++) {
            hairSystems[i].run(this.mouse, elapsed, this.growthLimits, this.debug);

                hairSystems[i].updateMouseLine(this.anchors[hairSystems[i].id], this.mouse)



          


        }


        ball.position = this.mouse
        innerBall.position = this.mouse



        this.stats.end()
    });
}