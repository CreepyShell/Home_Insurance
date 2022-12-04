var time = document.getElementById("time");
var seconds = 239;
var rent_person = document.querySelector("input[name='rent-person']");
var numBedrooms = document.getElementById("bedroom-count"); //10 per room
var area = document.querySelector("input[name='area']");
var property_type = document.getElementById("property-type");
var year_built = document.getElementById("year-built"); //10 per year old
var cover_type = document.getElementById("cover-type");
var contents_cover = document.getElementById("contents-cover");
var building_cover = document.getElementById("building-cover");
var free_years = document.getElementById("free-years"); //10 off per every year
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
//property_type.options[property_type.options.selectedIndex].value - get selected option
function sumbit() {
    alert();
}
function writeInLocalStorage() { }
function readFromLocalStorage() { }
