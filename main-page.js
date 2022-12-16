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
var help_area = document.getElementById("help-area");
var interval = setInterval(timeHandler, 1000);
var validation = function () { };
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
    result += (new Date().getFullYear() - Number(year_built.value)) * 10;
    result += Number(cover_type === null || cover_type === void 0 ? void 0 : cover_type.options[cover_type.options.selectedIndex].value);
    result += Number(contents_cover === null || contents_cover === void 0 ? void 0 : contents_cover.options[contents_cover.options.selectedIndex].value);
    result += Number(building_cover === null || building_cover === void 0 ? void 0 : building_cover.options[building_cover.options.selectedIndex].value);
    result -= Number(free_years.value) * 10;
    return result;
}
function writeInLocalStorage() {
    var _a;
    if (!validateInput()) {
        alert("Please enter area or who are you");
        return false;
    }
    if (((_a = usernameMain.value) === null || _a === void 0 ? void 0 : _a.length) < 5 || (usernameMain === null || usernameMain === void 0 ? void 0 : usernameMain.value.length) > 30) {
        alert("You name must be between 5 and 30 symbols");
        return false;
    }
    if ((email === null || email === void 0 ? void 0 : email.value.length) < 5 || (email === null || email === void 0 ? void 0 : email.value.length) > 50) {
        alert("Your email must be between 5 and 50 symbols");
        return false;
    }
    var rent_peson_value = 0;
    var area_value = 0;
    rent_person.forEach(function (p) {
        if (p === null || p === void 0 ? void 0 : p.checked) {
            rent_peson_value += Number(p === null || p === void 0 ? void 0 : p.value);
        }
    });
    area.forEach(function (a) {
        if (a === null || a === void 0 ? void 0 : a.checked) {
            area_value += Number(a === null || a === void 0 ? void 0 : a.value);
        }
    });
    var userData = {
        name: usernameMain === null || usernameMain === void 0 ? void 0 : usernameMain.value,
        email: email === null || email === void 0 ? void 0 : email.value
    };
    var enteredData = {
        rent_person: rent_peson_value,
        area_cost: area_value,
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
    return true;
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
function validateInput() {
    if (!document.querySelector("input[name='area']:checked") ||
        !document.querySelector("input[name='rent-person']:checked")) {
        return false;
    }
    return true;
}
var property_type_help = document.getElementById("property-type-help");
property_type_help === null || property_type_help === void 0 ? void 0 : property_type_help.addEventListener("mouseover", function () {
    help_area.style.color = "red";
    help_area.textContent =
        "Please enter property type: Bungalow(75), Country House(100), Detached(50), Semi Detached(40), Terraced(30), Flat(20)";
    setTimeout(function () {
        help_area.textContent = "Here is the help area";
        help_area.style.color = "rgb(3, 99, 3)";
    }, 7000);
});
var year_help = document.getElementById("year_help");
year_help === null || year_help === void 0 ? void 0 : year_help.addEventListener("mouseover", function () {
    help_area.style.color = "red";
    help_area.textContent =
        "Just write a year, no month or date required";
    setTimeout(function () {
        help_area.textContent = "Here is the help area";
        help_area.style.color = "rgb(3, 99, 3)";
    }, 7000);
});
