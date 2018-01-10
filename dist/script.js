'use strict';

window.onload = function () {
  var runningBunny = document.getElementById('runningBunny');
  var waitingBunny = document.getElementById('waitingBunny');
  var Observable = Rx.Observable;
  var mdown = Observable.fromEvent(runningBunny, 'mousedown');
  var mup = Observable.fromEvent(document, 'mouseup');
  var mmove = Observable.fromEvent(document, 'mousemove');

  var drag = mdown.map(function (event) {
    return mmove.takeUntil(mup);
  }).concatAll();

  drag.subscribe(function (event) {
    runningBunny.style.left = event.clientX + 'px';
    runningBunny.style.top = event.clientY + 'px';
  });
};