var totalCost = document.getElementById("cost");
var backButton = document.getElementById("back-button");


var rent_person = document.getElementById("rent-person-value");
var numBedrooms = document.getElementById("number-of-bedrooms");
var area = document.getElementById("area-value");
var property_type = document.getElementById(
    "property-type-value"
);
var year_built = document.getElementById("year-built-value");
var cover_type = document.getElementById("cover-type-value");
var contents_cover = document.getElementById(
    "contents-cover-value"
);
var building_cover = document.getElementById(
    "building-cover-value"
);
var free_years = document.getElementById("free-years-value");

let username = document.getElementById("name");

var costInStorage = localStorage.getItem("cost");
var nameInStorage = localStorage.getItem("user-data");
var dataInStorage = localStorage.getItem("entered-data");

backButton.addEventListener("click", () => {
    window.close();
    window.open("main-page.html")
})

if (costInStorage) { totalCost.textContent = JSON.parse(costInStorage); }
if (nameInStorage) { username.textContent = JSON.parse(nameInStorage).name }


if (dataInStorage) {
    let obj = JSON.parse(dataInStorage);
    console.log(obj);
    rent_person.textContent = obj.rent_person;
    area.textContent = obj.area_cost;
    numBedrooms.textContent = obj.numBedrooms * 10;
    property_type.textContent = obj.property_type;
    year_built.textContent = (new Date().getFullYear() - Number(obj.year_built)) * 10;
    cover_type.textContent = obj.cover_type;
    contents_cover.textContent = obj.contents_cover;
    building_cover.textContent = obj.building_cover;
    free_years.textContent = Number(obj.free_years) * 10;
}