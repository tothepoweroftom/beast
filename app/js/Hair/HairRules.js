import * as _ from 'lodash-es'
let conversion = 180/Math.PI
export let SuperRules = {
    hair00: {
        outerHair: true,
        start: 1,
        amplitude: 1,
        end: 1,
        exceptions: _.range(0, 2),

        bestAngle: 3.5

    },
    hair01: {
        outerHair: true,
        // angleRange2: [-3.13, -0.5],
        start: 1,
        amplitude: 0.9,
        end: 1,
        exceptions: [],
        bestAngle: 1.25



    },
    hair02: {
        outerHair: false,
        start: 1,
        amplitude: 1,
        lineDistanceOrigin: "lt",
        end: 1,
        exceptions: [],

        bestAngle: 200 * conversion

    },
    hair03: {
        outerHair: true,
        start: 1,
        amplitude: 1,
        end: 1,
        exceptions: [],

        bestAngle: 130 * conversion



    },
    hair04: {
        outerHair: false,
        lineDistanceOrigin: "rb",
        lineDistanceRange: [0, 30],
        start: 1,
        amplitude: 1,
        end: 1,
        exceptions: [0],
        bestAngle: 70 * conversion

    },
    hair05: {
        outerHair: true,
        start: 1,
        amplitude: 0.8,
        end: 1,
        exceptions: [],
        bestAngle: 240 * conversion



    },
    hair06: {
        outerHair: true,
        angleRange2: [-3.13, -2.12],
        start: 1,
        amplitude: 1,
        end: 1,
        exceptions: [0],
        bestAngle: Math.PI / 2 + Math.PI / 4

    },
    hair07: {
        outerHair: true,
        angleRange2: [-3.13, -0.5],
        start: 1,

        amplitude: 1,
        end: 1,
        exceptions: [],
        bestAngle: -2 * Math.PI / 3



    },
    hair08: {
        outerHair: true,
        angleRange2: [-3.13, -2.12],
        start: 1,
        amplitude: 1,
        end: 1,
        exceptions: [0],

        bestAngle: 220 * conversion

    },
    hair09: {
        outerHair: true,
        angleRange2: [-3.13, -0.5],
        // lineDistanceOrigin: "lt",
        start: 1,
        amplitude: 1,
        end: 1,
        exceptions: [],
        bestAngle: 327 * conversion



    },
    hair10: {
        outerHair: true,
        lineDistanceOrigin: "lb",
        angleRange2: [-3.13, -2.12],
        start: 1,
        amplitude: 0.1,
        end: 1,
        exceptions: [0],
        bestAngle: Math.PI / 2 + Math.PI / 4

    },

    hair11: {
        outerHair: true,
        angleRange2: [-3.13, -0.5],
        start: 1,
        amplitude: 0.8,
        end: 1,
        exceptions: [],
        bestAngle: -2 * Math.PI / 3



    },
    hair12: {
        outerHair: false,
        lineDistanceOrigin: "lt",
        angleRange2: [-3.13, -2.12],
        start: 1,
        amplitude: 0.2,
        end: 1,
        exceptions: [0],
        bestAngle: 253 * conversion

    },
    hair13: {
        outerHair: false,
        angleRange2: [-3.13, -0.5],
        start: 1,
        lineDistanceOrigin:"rc",
        amplitude: 0.3,
        end: 1,
        angleShift: 45 * conversion,
        exceptions: [],
        bestAngle: 50 * conversion



    },
    hair14: {
        outerHair: false,
        angleRange2: [-3.13, -2.12],
        start: 1,
        amplitude: 0.3,
        end: 1,
        exceptions: [0],
        bestAngle: 180 * conversion

    },
    hair15: {
        outerHair: false,
        angleRange2: [-3.13, -0.5],
        start: 1,
        amplitude: 0.2,
        end: 1,
        exceptions: [],
        bestAngle: 180 * conversion



    },
    hair16: {
        outerHair: false,
        angleRange2: [-3.13, -2.12],
        start: 1,
        amplitude: 0.2,
        end: 1,
        exceptions: [0],
        bestAngle: 75 * conversion

    },
    hair17: {
        outerHair: false,
        lineDistanceOrigin: "rb",
        angleRange2: [-3.13, -0.5],
        start: 1,
        amplitude: 0.5,
        end: 1,
        exceptions: [],
        bestAngle: 292 * conversion



    },
    hair18: {
        outerHair: false,
        angleRange2: [-3.13, -2.12],
        start: 1,
        amplitude: 0.4,
        end: 1,
        exceptions: [0],
        bestAngle: 136 * conversion

    },
    hair19: {
        outerHair: false,
        angleRange2: [-3.13, -0.5],
        angleShift: 90 * conversion,
        // lineDistanceOrigin: "rt",
        lineDistanceRange: [0, 25],
        start: 1,
        amplitude: 1,
        end: 1,
        exceptions: [],
        bestAngle: 136 * conversion



    },
    hair20: {
        outerHair: false,
        angleRange2: [-3.13, -2.12],
        start: 1,
        angleShift: 180 * conversion,
        amplitude: 0.45,
        end: 1,
        lineDistanceOrigin: "lt",

        exceptions: [0],
        bestAngle: Math.PI / 2 + Math.PI / 4

    },

    hair21: {
        outerHair: false,
        angleRange2: [-3.13, -0.5],
        start: 1,
        amplitude: 1,
        end: 1,
        exceptions: [],
        bestAngle: 250 * conversion



    },
    hair22: {
        outerHair: false,
        angleRange2: [-3.13, -2.12],
        start: 1,
        amplitude: 0.2,
        end: 1,
        exceptions: [0],
        bestAngle: 90 * conversion

    },
    hair23: {
        outerHair: false,
        angleRange2: [-3.13, -0.5],
        start: 1,
        amplitude: 0.5,
        end: 1,
        exceptions: [],
        bestAngle: -2 * Math.PI / 3



    },
    hair24: {
        outerHair: false,
        angleRange2: [-3.13, -2.12],
        start: 1,
        amplitude: 0.5,
        end: 1,
        exceptions: [0],
        bestAngle: Math.PI / 2 + Math.PI / 4

    },
    hair25: {
        outerHair: false,
        angleRange2: [-3.13, -0.5],
        start: 1,
        amplitude: 0.25,
        end: 1,
        exceptions: [],
        bestAngle: 200 * conversion



    },
    hair26: {
        outerHair: false,
        angleRange2: [-3.13, -2.12],
        start: 1,
        amplitude: .21,
        end: 1,
        exceptions: [0],
        bestAngle: Math.PI / 4

    },
    hair27: {
        outerHair: false,
        lineDistanceOrigin: "rb",
        angleRange2: [-3.13, -0.5],
        start: 1,
        amplitude: 0.125,
        end: 1,
        exceptions: [],
        bestAngle: -2 * Math.PI / 3



    },
    hair28: {
        outerHair: false,
        angleRange2: [-3.13, -2.12],
        start: 1,
        amplitude: 0.125,
        end: 1,
        exceptions: [0],
        bestAngle: 300 * conversion

    },
    hair29: {
        outerHair: false,
        angleRange2: [-3.13, -0.5],
        lineDistanceOrigin: "lb",
        start: 1,
        amplitude: 1,
        end: 1,
        exceptions: [],
        bestAngle: 120 * conversion



    },
    hair30: {
        outerHair: false,
        angleRange2: [-3.13, -2.12],
        start: 1,
        amplitude: 1,
        end: 1,
        exceptions: [0],
        bestAngle: Math.PI / 2 + Math.PI / 4

    },
    hair30: {
        outerHair: false,
        angleRange2: [-3.13, -2.12],
        start: 1,
        amplitude: 0.1,
        end: 1,
        exceptions: [0],
        bestAngle: Math.PI / 2 + Math.PI / 4

    },
    hair31: {
        outerHair: false,
        angleRange2: [-3.13, -0.5],
        start: 1,
        amplitude: 0.1,
        end: 3,
        exceptions: [],
        bestAngle: 45 * conversion



    },
    hair32: {
        outerHair: false,
        angleRange2: [-3.13, -2.12],
        start: 1,
        amplitude: 0.5,
        end: 1,
        exceptions: [0],
        bestAngle: 250 * conversion

    },
    hair33: {
        outerHair: false,
        angleRange2: [-3.13, -0.5],
        start: 2,
        amplitude: 0.2,
        end: 2,
        exceptions: [],
        bestAngle: -2 * Math.PI / 3



    },
    hair34: {
        outerHair: true,
        angleRange2: [-3.13, -2.12],
        start: 1,
        amplitude: 1,
        end: 1,
        exceptions: [0],
        bestAngle: Math.PI / 2 + Math.PI / 4

    },
    hair35: {
        outerHair: false,
        angleRange2: [-3.13, -2.12],
        start: 1,
        amplitude: 0.5,
        end: 1,
        exceptions: [0],
        bestAngle: Math.PI / 2 + Math.PI / 4

    },

    hair36: {
        outerHair: false,
        angleRange2: [-3.13, -2.12],
        start: 1,
        amplitude: 0.61,
        end: 1,
        exceptions: [0],
        bestAngle: Math.PI / 2 + Math.PI / 4

    },
    hair37: {
        outerHair: false,
        angleRange2: [-3.13, -2.12],
        start: 1,
        amplitude: 0.1,
        end: 1,
        exceptions: [0],
        bestAngle: Math.PI / 2 + Math.PI / 4

    }
}