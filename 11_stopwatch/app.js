var min = 0;
var sec = 0;
var msec = 0;

var minHeading = document.getElementById("min");
var secHeading = document.getElementById("sec");
var msecHeading = document.getElementById("msec");

var interval;

function timer() {
  msec++;
  msecHeading.innerHTML = msec;

  if (msec >= 100) {
    msec = 0;
    sec++;
    if (sec >= 10) {
      secHeading.innerHTML = sec + " : ";
    } else {
      secHeading.innerHTML = "0" + sec + " : ";
    }
  } else if (sec >= 60) {
    min++;
    sec = 0;
    if (min >= 10) {
      minHeading.innerHTML = min + " : ";
    } else {
      minHeading.innerHTML = "0" + min + " : ";
    }
  }
}


function start() {
  interval = setInterval(timer, 10);

  document.getElementById("btn").disabled = true;

}


function stop() {
  clearInterval(interval);
}


function reset() {
  msecHeading.innerHTML = "00";
  secHeading.innerHTML = "00 : ";
  minHeading.innerHTML = "00 : ";
  min = 0;
  sec = 0;
  msec = 0;

  clearInterval(interval);

  document.getElementById("btn").disabled = false;
}