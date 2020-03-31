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
    this.numParticles = 150
    if(window.innerWidth<1200) {
      this.numParticles = 75
    }
    // spawn 30 by default
    for (var i = 0; i < this.numParticles; ++i) {
      this.model.spawn();
    }

  }
  

  run(dt) {
    this.model.step(dt)
    // console.log(this.model)

  }

  resize(width, height) {
    this.world.height = height;
    this.world.width = width;
    this.model.translation = new Two.Vector(-this.two.width/2, -this.two.height/2);
  }


}