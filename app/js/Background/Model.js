import Two from 'two.js'
import {Agent} from './Agent'
import Mediator from './Mediator'

function randomPos(w, h) {
	return new Two.Vector(Math.random() * w, Math.random() * h);
}

export default function Model(world, two, particleGroup) {
	var self = this;
    this.world = world;
    this.two = two;
    this.particleGroup = particleGroup

	this.despawn = function() {
		var agent = self.world.agents.pop();

		self.publish('despawn', agent);
	}

	this.spawn = function() {
		var position = randomPos(self.world.width, self.world.height);
		var agent = new Agent(position, self.world, self.two, self.particleGroup);

		self.world.agents.push(agent);
		self.publish('spawn', agent);
	}

	this.step = function(dt) {
		self.world.step(dt);

		self.world.agents.forEach(function(agent) {
			agent.step(dt);
		});

		self.publish('step', dt);
	}

    // pub/sub mechanism
    Mediator(this)
}