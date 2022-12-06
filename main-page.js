var time = document.getElementById("time");
var seconds = 239;
var usernameMain = document.getElementById("name");
var email = document.getElementById("email");
var rent_person = document.querySelectorAll("input[name='rent-person']");
var numBedrooms = document.getElementById("bedroom-count"); //10 per room
var area = document.querySelectorAll("input[name='area']");
var property_type = document.getElementById("property-type");
var year_built = document.getElementById("year-built"); //10 per year old
var cover_type = document.getElementById("cover-type");
var contents_cover = document.getElementById("contents-cover");
var building_cover = document.getElementById("building-cover");
var free_years = document.getElementById("free-years"); //10 off per every year
var interval = setInterval(timeHandler, 1000);
readFromLocalStorage();
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
        writeInLocalStorage();
        window.close();
    }
}
function calculateInsuranceCost() {
    var result = 0;
    rent_person.forEach(function (p) {
        if (p === null || p === void 0 ? void 0 : p.checked) {
            result += Number(p === null || p === void 0 ? void 0 : p.value);
        }
    });
    area.forEach(function (a) {
        if (a === null || a === void 0 ? void 0 : a.checked) {
            result += Number(a === null || a === void 0 ? void 0 : a.value);
        }
    });
    result += Number(numBedrooms === null || numBedrooms === void 0 ? void 0 : numBedrooms.value) * 10;
    result += Number(property_type === null || property_type === void 0 ? void 0 : property_type.options[property_type.options.selectedIndex].value);
    result += Number(year_built.value) * 10;
    result += Number(cover_type === null || cover_type === void 0 ? void 0 : cover_type.options[cover_type.options.selectedIndex].value);
    result += Number(contents_cover === null || contents_cover === void 0 ? void 0 : contents_cover.options[contents_cover.options.selectedIndex].value);
    result += Number(building_cover === null || building_cover === void 0 ? void 0 : building_cover.options[building_cover.options.selectedIndex].value);
    result -= Number(free_years.value) * 10;
    return result;
}
function writeInLocalStorage() {
    var userData = {
        name: usernameMain === null || usernameMain === void 0 ? void 0 : usernameMain.value,
        email: email === null || email === void 0 ? void 0 : email.value
    };
    var enteredData = {
        numBedrooms: numBedrooms === null || numBedrooms === void 0 ? void 0 : numBedrooms.value,
        property_type: property_type === null || property_type === void 0 ? void 0 : property_type.options[property_type.options.selectedIndex].value,
        year_built: year_built === null || year_built === void 0 ? void 0 : year_built.value,
        cover_type: cover_type === null || cover_type === void 0 ? void 0 : cover_type.options[cover_type.options.selectedIndex].value,
        contents_cover: contents_cover === null || contents_cover === void 0 ? void 0 : contents_cover.options[contents_cover.selectedIndex].value,
        building_cover: building_cover === null || building_cover === void 0 ? void 0 : building_cover.options[building_cover.selectedIndex].value,
        free_years: free_years === null || free_years === void 0 ? void 0 : free_years.value
    };
    localStorage === null || localStorage === void 0 ? void 0 : localStorage.setItem("entered-data", JSON.stringify(enteredData));
    localStorage === null || localStorage === void 0 ? void 0 : localStorage.setItem("user-data", JSON.stringify(userData));
    localStorage === null || localStorage === void 0 ? void 0 : localStorage.setItem("cost", JSON.stringify(calculateInsuranceCost()));
}
function readFromLocalStorage() {
    var strObj = localStorage.getItem("entered-data");
    if (strObj) {
        var obj = JSON.parse(strObj);
        numBedrooms.value = obj.numBedrooms;
        property_type.value = obj.property_type;
        year_built.value = obj.year_built;
        cover_type.value = obj.cover_type;
        contents_cover.value = obj.contents_cover;
        building_cover.value = obj.building_cover;
        free_years.value = obj.free_years;
    }
    var strUserData = localStorage.getItem("user-data");
    if (strUserData) {
        var userData = JSON.parse(strUserData);
        usernameMain.value = userData.name;
        email.value = userData.email;
    }
}
