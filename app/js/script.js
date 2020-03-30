import '/app/css/main.css';
import '/app/css/particles.css';
import $ from 'jquery'
import TwoJSManager from './TwoJSManager'
import * as dat from 'dat.gui';

let twoManager;
// Window Onload
$( document ).ready(()=> {
    console.log( "ready!" );
    twoManager = new TwoJSManager();

    var gui = new dat.GUI();
    // gui.hide()
    gui.add(twoManager, 'debug');
    

    // gui.add(twoManager, 'mouseControl');
    // gui.add(twoManager, 'growHairs', 0.1, 30.0);
    // gui.add(twoManager, 'angle', 0.0, 360.0);
});


var $window = $(window).bind('mousemove', (e) => {

    

            if(twoManager) {
                twoManager.mouse.x = -window.innerWidth / 2 + e.clientX;
                twoManager.mouse.y = -window.innerHeight / 2 + e.clientY;
            }
         
        return false;
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

            var touch = e.originalEvent.changedTouches[0];

            twoManager.mouse.x = -window.innerWidth / 2 + touch.pageX;
            twoManager.mouse.y = -window.innerHeight / 2 + touch.pageY;
 

    

        return false;
    });



