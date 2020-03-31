import Two from 'two.js'

import * as noise from "../Util/Perlin"

export function boids(agent, world, weights) {
	var alignment = agent.heading.clone();
	var cohesion = new Two.Vector();
	var separation = new Two.Vector();

	var theta = Math.random() * 2 * Math.PI;
	var brownian = new Two.Vector(Math.sin(theta), Math.cos(theta));

	var nboids = world.agents.length;
	if (nboids) {
		// temporary vector for vectorDiff
		var vec = new Two.Vector();

		// for (var i = 0; i < nboids; i++) {
		// 	var other = world.agents[i];

		// 	// ignore ourselves
		// 	if (agent === other) continue;

		// 	// ignore agents beyond 200pixels
		// 	if (world.vectorDiff(agent.position, other.position, vec).lengthSquared() > 20000) continue;

		// 	// alignment is the average of all nearby agent headings
		// 	alignment.addSelf(other.heading);

		// 	// cohesion is just the centroid of nearby agents
		// 	vec = world.vectorDiff(other.position, agent.position, vec);
		// 	cohesion.addSelf(vec);

		// 	// lastly, calculate separation force from the inverse of the distance (using lengthSq so we can do lazy normalization)
		// 	var dist = vec.lengthSquared();
		// 	vec.divideScalar(dist)

		// 	separation.addSelf(vec);
		// }

		alignment.divideScalar(nboids);
		cohesion.divideScalar(nboids);
		separation.divideScalar(nboids);
		separation.negate(); // we want the opposite vector

		alignment.normalize();
		cohesion.normalize();
		separation.normalize();
	}

	alignment.multiplyScalar(weights.alignment);
	brownian.multiplyScalar(weights.random);
	cohesion.multiplyScalar(weights.cohesion);
	separation.multiplyScalar(weights.separation);

	var force = alignment;
	// force.addSelf(brownian);
	// force.addSelf(cohesion);
	// force.addSelf(separation);
	force.normalize();

	return force;
}
const colors = ["#ff00ff", "#00ff00", "yellow"]
export function Agent(position, world, two, particleGroup) {
	var self = this;
    this.two = two
	this.boidWeights = { alignment: 1, cohesion: 4, random: 3, separation: 3.6 };
	this.heading = new Two.Vector();
	this.maxspeed = 0.05;
    this.position = position;
    this.translation = new Two.Vector(-this.two.width/2, -this.two.height/2)
    this.view = new Two.Circle(position.x, position.y, 1);
    this.view.fill = colors[Math.floor(Math.random()*colors.length)]
    this.view.stroke = "rgba(0,0,0,0)"
    // this.view.noStroke()
	this.speed = 0.005;
    this.velocity = new Two.Vector();
    particleGroup.add(this.view)
    // this.random = new Two.Vector(-2 + noise.noise2(Math.random(), Math.random()), -2 + noise.noise2(Math.random(), Math.random())*2)
    this.accel = new Two.Vector(0,0)

	this.step = function(dt) {
        // calculate acceleration
        
        self.accel.x = -1 + 2*noise.pnoise2(self.position.x, self.position.y, dt, dt)
        self.accel.y = -1  + 2*noise.pnoise2(self.position.x, self.position.y, dt, dt)

		self.accel.multiplyScalar(self.speed);

		// apply forces
		self.velocity.addSelf(self.accel);
		// self.velocity.addSelf(self.accel);

		// apply dampener
		// self.velocity.multiplyScalar(0.995);

		// clamp velocity
		self.velocity.x = Math.max(-self.maxspeed, Math.min(self.velocity.x, self.maxspeed));
		self.velocity.y = Math.max(-self.maxspeed, Math.min(self.velocity.y, self.maxspeed));

		// update heading
		self.heading.copy(self.velocity);
		self.heading.normalize();

		// multiply by dt
		var dv = self.velocity.clone();
		dv.multiplyScalar(dt);

		// update position
        self.position.addSelf(dv);
        this.view.position.x = noise.lerp(0.8, self.position.x, self.view.position.x)
        this.view.position.y = noise.lerp(0.8, self.position.y, self.view.position.y)

        // self.position.x
	}
}