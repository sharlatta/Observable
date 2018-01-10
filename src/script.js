window.onload = ()=>{
  const runningBunny = document.getElementById('runningBunny');
  const waitingBunny = document.getElementById('waitingBunny');
  const Observable = Rx.Observable;
  const mdown = Observable.fromEvent(runningBunny, 'mousedown');
  const mup = Observable.fromEvent(document, 'mouseup');
  const mmove = Observable.fromEvent(document, 'mousemove');
  const mmove = Observable.fromEvent(waitingBunny, 'mousemove');

  const drag = mdown.map((event) => {
        return mmove.takeUntil(mup)
      }
  ).concatAll();

  drag.subscribe((event) => {
    runningBunny.style.left = event.clientX + 'px';
    runningBunny.style.top = event.clientY + 'px';
  })
};
