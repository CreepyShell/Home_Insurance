var time: HTMLSpanElement | null = document.getElementById("time");
var seconds = 69;

var interval = setInterval(timeHandler, 1000);

function timeHandler(): void {
  if (time) {
    let text = "";
    if (seconds >= 60) {
      text = `${Math.floor(seconds / 60)} minutes ${seconds-- % 60} seconds`;
    } else {
      text = (seconds--).toString() + " seconds";
    }
    time.textContent = text.toString();
  }
  if (seconds == 0) {
    clearInterval(interval);
    window.open("./session-expired-page.html", "_blank");
    window.close();
  }
}
