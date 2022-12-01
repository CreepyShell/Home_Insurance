var time = document.getElementById("time");
var seconds = 69;
var interval = setInterval(timeHandler, 1000);
function timeHandler() {
    if (time) {
        var text = "";
        if (seconds >= 60) {
            text = "".concat(Math.floor(seconds / 60), " minutes ").concat(seconds-- % 60, " seconds");
        }
        else {
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
