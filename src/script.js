window.onload = () => {
  const body = document.querySelector('body');
  const runningBunny = document.getElementById('runningBunny');
  const waitingBunny = document.getElementById('waitingBunny');
  const hearts = document.getElementById('hearts');
  const Observable = Rx.Observable;
  const mdown = Observable.fromEvent(runningBunny, 'mousedown');
  const mup = Observable.fromEvent(document, 'mouseup');
  const mmove = Observable.fromEvent(document, 'mousemove');
  // const menter = Observable.fromEvent(waitingBunny, 'mouseenter');
  // const mleave = Observable.fromEvent(waitingBunny, 'mouseleave');

  const meeting = () => {
    const waitingCoordinates = waitingBunny.getBoundingClientRect();
    const runningCoordinates = runningBunny.getBoundingClientRect();

    return (
        runningCoordinates.top > waitingCoordinates.top&&runningCoordinates.top < waitingCoordinates.bottom
        &&runningCoordinates.left > waitingCoordinates.left&&runningCoordinates.left < waitingCoordinates.right
        ||runningCoordinates.bottom > waitingCoordinates.top&&runningCoordinates.bottom < waitingCoordinates.bottom
        &&runningCoordinates.right > waitingCoordinates.left&&runningCoordinates.right < waitingCoordinates.right
    )
  };

  const run = mdown.map((event) => {
        return mmove.takeUntil(mup)
      }
  ).concatAll();

  // menter.subscribe(() => {
  //   console.log("in")
  //   body.classList.add("hearts");
  // });
  //
  // mleave.subscribe(() => {
  //   console.log("out")
  //   body.classList.remove("hearts");
  // });

  run.subscribe((event) => {
    if (meeting()&& !body.classList.contains('hearts')) {
      body.classList.add("hearts");
    } else if (!meeting() && body.classList.contains('hearts')) {
      body.classList.remove("hearts");
    }
    runningBunny.style.left = event.clientX + 'px';
    runningBunny.style.top = event.clientY + 'px';
  });
};
