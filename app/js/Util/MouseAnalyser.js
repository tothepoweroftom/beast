const BUFFER = 16;

export default class MouseAnalyser {
    constructor() {
        this.prevMouse = 0
        this.prevVelocity
        this.position = []
        this.velocity = []
        this.acceleration = []
        this.jerk = []
        this.threshold = 10;
        this.lasttime = new Date();
        this.charge = 0
    } 

    update(mouse) {

        // if (this.position.length < BUFFER) {
        //     this.position.push(mouse.x);
        // } else {
        //     this.position.shift();
        //     this.position.push(mouse.x);
        // }

        // if(this.position.length===BUFFER) {
        //     for (var i = 1; i < this.position.length; i++) {
        //         let vx = this.position[i] - this.position[i-1]
        //         this.velocity[i] = vx
        //     }
        //     for (var i = 1; i < this.velocity.length; i++) {
        //         let ax = this.velocity[i] - this.velocity[i-1]
        //         this.acceleration[i] = ax
        //     }
        //     for (var i = 1; i < this.acceleration.length; i++) {
        //         let jx = this.acceleration[i] - this.acceleration[i-1]
        //         this.jerk[i] = jx
        //     }
        // }

        // let count = 0

        // for(let i=this.acceleration.length-1; i>this.acceleration.length-8; i--){
        //     if(Math.abs(this.acceleration[i])>this.threshold && Math.abs(this.acceleration[i-1])>this.threshold){
        //         if((Math.sign(this.acceleration[i]) != Math.sign(this.acceleration[i-1]))) {
        //             count+=1
        //         }
        //     }
        // }
        // let time = new Date();
        // if(count > 3) {
        //     console.log(time.getTime() - this.lasttime.getTime())
        //     if(time.getTime() - this.lasttime.getTime() > 4000) {
        //         console.log("jerk")
        //         var event = new Event('jerk');
        //         window.dispatchEvent(event);

        //         this.lasttime = time;
        //     }
        // } else {

        // }

    }
}