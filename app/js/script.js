import '/app/css/main.css';
import '/app/css/particles.css';
import $ from 'jquery'
import TwoJSManager from './TwoJSManager'
import * as dat from 'dat.gui';


let twoManager;
// Window Onload
$( document ).ready(()=> {
    //console.log( "ready!" );
    twoManager = new TwoJSManager();

    // gui.add(twoManager, 'mouseActive');


    // gui.add(twoManager, 'mouseControl');
    // gui.add(twoManager, 'growHairs', 0.1, 30.0);
    // gui.add(twoManager, 'angle', 0.0, 360.0);
});

let timer;
var $window = $(window).bind('mousemove', (e) => {

    

            if(twoManager) {    
                twoManager.mouseActive = true;

                clearTimeout(timer);
                timer=setTimeout(()=>{
                    twoManager.mouseActive = false

                },200);
                twoManager.mouse.x = -window.innerWidth / 2 + e.clientX;
                twoManager.mouse.y = -window.innerHeight / 2 + e.clientY;
            }
         
        return false;
    })
    .bind('touchstart', function (e) {
        e.preventDefault();
        window.scrollTo(0, 0)
        if(twoManager) {
            $('.title').hide(500)
            twoManager.growHairs()
            var touch = e.originalEvent.changedTouches[0];

            twoManager.mouse.x = -window.innerWidth / 2 + touch.pageX;
            twoManager.mouse.y = -window.innerHeight / 2 + touch.pageY;
            twoManager.mouseActive = true
        }
        return false;
    })
    .bind('touchend', function (e) {
        e.preventDefault();
        window.scrollTo(0, 0)
        if(twoManager) {
            twoManager.mouseActive = false

        }
        return false;
    })
    .bind('mousedown', function (e) {
        e.preventDefault();


    })
    .bind('click', function (e) {
        $('.title').hide(500)
        twoManager.growHairs()



    })
    .bind('touchmove', function (e) {
        e.preventDefault();

            var touch = e.originalEvent.changedTouches[0];

            twoManager.mouse.x = -window.innerWidth / 2 + touch.pageX;
            twoManager.mouse.y = -window.innerHeight / 2 + touch.pageY;
 

    

        return false;
    });



