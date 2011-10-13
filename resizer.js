// Adapted from Zachary Johnson's Commander Clone 0.2 screen scaling example http://www.zachstronaut.com/projects/commander-clone/0.2/game.html
// Modified to strictly choose 1X or 2X or 4X scaling as appopriate, so we don't end up with screwed up scaling artifacts.
// NOTE: uses jQuery for the DOM load event
$(function () {

  fullScreenify();

  window.addEventListener('resize', fullScreenify, false);

  function fullScreenify() { 
    var canvas = document.getElementsByTagName('canvas')[0];
    var scale = {x: 1, y: 1};
    scale.x = (window.innerWidth - 10) / canvas.width;
    scale.y = (window.innerHeight - 220) / canvas.height;
    if (scale.x >= 4 && scale.y >= 4) {
      scale = '4, 4';
    } else if (scale.x >= 2 && scale.y >= 2) {
      scale = '2, 2';
    } else {
      scale = '1, 1';
    }
      scale = '4, 4';
    canvas.setAttribute('style', '-ms-transform: scale(' + scale + '); -webkit-transform: scale3d(' + scale + ', 1); -moz-transform: scale(' + scale + '); -o-transform: scale(' + scale + '); transform: scale(' + scale + ');');
  } 
});
