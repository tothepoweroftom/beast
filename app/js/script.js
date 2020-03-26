import '/app/css/main.css';
import '/app/css/particles.css';
import $ from 'jquery'
import TwoJSManager from './TwoJSManager'
import * as dat from 'dat.gui';

let twoManager;
// Window Onload
var $window = $(window)
    .bind('load', (e) => {

        twoManager = new TwoJSManager();

        var gui = new dat.GUI();
        // gui.hide()
        gui.add(twoManager, 'debug');
    
        // gui.add(twoManager, 'mouseControl');
        // gui.add(twoManager, 'growHairs', 0.1, 30.0);
        // gui.add(twoManager, 'angle', 0.0, 360.0);
    
    })
    .bind('mousemove', (e) => {

        if (twoManager.mouseControl) {
            // this.mouseAnalyser.update(mouse)
            // logo.translation.x = lerp(logo.translation.x, mouse.x * 0.025, 0.5)
            // logo.translation.y =lerp(logo.translation.y, mouse.y * 0.025, 0.5)


            twoManager.mouse.x = -window.innerWidth / 2 + e.clientX;
            twoManager.mouse.y = -window.innerHeight / 2 + e.clientY;
        }
    })
    .bind('touchstart', function (e) {
        e.preventDefault();
        window.scrollTo(0, 0)
        return false;
    })
    .bind('jerk', () => {

    })
    .bind('touchend', function (e) {
        e.preventDefault();
        window.scrollTo(0, 0)
        return false;
    })
    .bind('mousedown', function (e) {
        e.preventDefault();


    })
    .bind('touchmove', function (e) {
        e.preventDefault();
        window.scrollTo(0, 0)

        var touch = e.originalEvent.changedTouches[0];

        twoManager.mouse.x = -window.innerWidth / 2 + touch.pageX;
        twoManager.mouse.y = -window.innerHeight / 2 + touch.pageY;

        return false;
    });



