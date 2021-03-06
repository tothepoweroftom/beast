import Two from 'two.js'
import WrappedWorld from './World'
import Model from './Model'

export default class ParticleBackground {
  constructor(two) {
    this.world = new WrappedWorld(window.innerWidth, window.innerHeight);
    this.two = two;
    this.particleGroup = new Two.Group()
    this.two.add(this.particleGroup)
    this.translation = new Two.Vector(-this.two.width/2, -this.two.height/2);
    this.particleGroup.translation = this.translation
    this.particleGroup.width = this.two.width

    this.model = new Model(this.world, two, this.particleGroup);
    this.model.translation = this.translation
    this.numParticles = 250
    if(window.innerWidth<1200) {
      this.numParticles = 105
    }
    // spawn 30 by default
    for (var i = 0; i < this.numParticles; ++i) {
      this.model.spawn();
    }

  }
  

  run(dt, mouse) {
    this.model.step(dt, mouse)
    // console.log(this.model)
    // this.particleGroup.translation.x = -this.two.width/2 + mouse.x*0.02
    // this.particleGroup.translation.y = -this.two.height/2 + mouse.y*0.02

  }

  resize(width, height) {
    this.world.height = height;
    this.world.width = width;
    this.model.translation = new Two.Vector(-this.two.width/2, -this.two.height/2);
  }


}