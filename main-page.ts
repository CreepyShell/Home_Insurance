var time: HTMLSpanElement | null = document.getElementById("time");
var seconds = 239;

var rent_person = document.querySelector(
  "input[name='rent-person']"
) as HTMLInputElement;
var numBedrooms = document.getElementById("bedroom-count") as HTMLInputElement; //10 per room
var area = document.querySelector("input[name='area']") as HTMLInputElement;
var property_type = document.getElementById(
  "property-type"
) as HTMLSelectElement;
var year_built = document.getElementById("year-built") as HTMLInputElement; //10 per year old
var cover_type = document.getElementById("cover-type") as HTMLSelectElement;
var contents_cover = document.getElementById(
  "contents-cover"
) as HTMLSelectElement;
var building_cover = document.getElementById(
  "building-cover"
) as HTMLSelectElement;
var free_years = document.getElementById("free-years") as HTMLInputElement; //10 off per every year

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

//property_type.options[property_type.options.selectedIndex].value - get selected option
function sumbit(): void {
  alert();
}

function writeInLocalStorage(): void {}

function readFromLocalStorage(): void {}
