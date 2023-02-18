/**
 * Define Timer Click Event.
 */

(function () {
  "use strict";

  const timer = document.getElementById("timer");
  const min = document.getElementById("min");
  const sec = document.getElementById("sec");
  const reset = document.getElementById("reset");
  const start = document.getElementById("start");

  let startTime;
  let timeLeft;
  let timeToCountDown = 0;
  let timerId;
  let isRunning = false;

  function updateTimer(t) {
    let d = new Date(t);

    let m = d.getMinutes();
    m = ("0" + m).slice(-2);
    let s = d.getSeconds();
    s = ("0" + s).slice(-2);
    let ms = d.getMilliseconds();
    ms = ("00" + ms).slice(-3);

    let timerString;
    timerString = m + ":" + s + "." + ms;
    timer.textContent = timerString;
    document.title = timerString;
  }

  function countDown() {
    timerId = setTimeout(function () {
      timeLeft = timeToCountDown - (Date.now() - startTime);
      if (timeLeft < 0) {
        isRunning = false;
        start.textContent = "Start";
        clearTimeout(timerId);
        timeLeft = 0;
        timeToCountDown = 0;
        updateTimer(timeLeft);
        return;
      }
      updateTimer(timeLeft);
      countDown();
    }, 10);
  }

  /**
   * Start Button Click Event.
   */
  start.addEventListener("click", function () {
    if (isRunning === false) {
      isRunning = true;
      start.textContent = "Stop";
      startTime = Date.now();
      countDown();
    } else {
      isRunning = false;
      start.textContent = "Start";
      timeToCountDown = timeLeft;
      clearTimeout(timerId);
    }
  });

  /**
   * Min Button Click Event.
   */
  min.addEventListener("click", function () {
    if (isRunning === true) {
      return;
    }
    timeToCountDown += 60 * 1000;
    if (timeToCountDown >= 60 * 60 * 1000) {
      timeToCountDown = 0;
    }
    updateTimer(timeToCountDown);
  });

  /**
   * Sec Button Click Event.
   */
  sec.addEventListener("click", function () {
    if (isRunning === true) {
      return;
    }
    timeToCountDown += 1000;
    if (timeToCountDown >= 60 * 60 * 1000) {
      timeToCountDown = 0;
    }
    updateTimer(timeToCountDown);
  });

  /**
   * Reset Button Click Event.
   */
  reset.addEventListener("click", function () {
    timeToCountDown = 0;
    updateTimer(timeToCountDown);
  });
})();
