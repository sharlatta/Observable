'use strict';

window.onload = function () {
  var body = document.querySelector('body');
  var runningBunny = document.getElementById('runningBunny');
  var waitingBunny = document.getElementById('waitingBunny');
  var hearts = document.getElementById('hearts');
  var Observable = Rx.Observable;
  var mdown = Observable.fromEvent(runningBunny, 'mousedown');
  var mup = Observable.fromEvent(document, 'mouseup');
  var mmove = Observable.fromEvent(document, 'mousemove');
  // const menter = Observable.fromEvent(waitingBunny, 'mouseenter');
  // const mleave = Observable.fromEvent(waitingBunny, 'mouseleave');

  var meeting = function meeting() {
    var waitingCoordinates = waitingBunny.getBoundingClientRect();
    var runningCoordinates = runningBunny.getBoundingClientRect();

    return runningCoordinates.top > waitingCoordinates.top && runningCoordinates.top < waitingCoordinates.bottom && runningCoordinates.left > waitingCoordinates.left && runningCoordinates.left < waitingCoordinates.right || runningCoordinates.bottom > waitingCoordinates.top && runningCoordinates.bottom < waitingCoordinates.bottom && runningCoordinates.right > waitingCoordinates.left && runningCoordinates.right < waitingCoordinates.right;
  };

  var run = mdown.map(function (event) {
    return mmove.takeUntil(mup);
  }).concatAll();

  // menter.subscribe(() => {
  //   console.log("in")
  //   body.classList.add("hearts");
  // });
  //
  // mleave.subscribe(() => {
  //   console.log("out")
  //   body.classList.remove("hearts");
  // });

  run.subscribe(function (event) {
    if (meeting() && !body.classList.contains('hearts')) {
      body.classList.add("hearts");
    } else if (!meeting() && body.classList.contains('hearts')) {
      body.classList.remove("hearts");
    }
    runningBunny.style.left = event.clientX + 'px';
    runningBunny.style.top = event.clientY + 'px';
  });
};