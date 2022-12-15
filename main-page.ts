var time: HTMLSpanElement | null = document.getElementById("time");
var seconds = 239;

var usernameMain = document.getElementById("name") as HTMLInputElement;
var email = document.getElementById("email") as HTMLInputElement;
var rent_person = document.querySelectorAll("input[name='rent-person']");
var numBedrooms = document.getElementById("bedroom-count") as HTMLInputElement; //10 per room
var area = document.querySelectorAll("input[name='area']");
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
var validation = () => {};

readFromLocalStorage();

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
    writeInLocalStorage();
    window.close();
  }
}

function calculateInsuranceCost(): Number {
  let result = 0;
  rent_person.forEach((p) => {
    if ((p as HTMLInputElement)?.checked) {
      result += Number((p as HTMLInputElement)?.value);
    }
  });

  area.forEach((a) => {
    if ((a as HTMLInputElement)?.checked) {
      result += Number((a as HTMLInputElement)?.value);
    }
  });

  result += Number(numBedrooms?.value) * 10;
  result += Number(
    property_type?.options[property_type.options.selectedIndex].value
  );
  result += (new Date().getFullYear() - Number(year_built.value)) * 10;

  result += Number(cover_type?.options[cover_type.options.selectedIndex].value);
  result += Number(
    contents_cover?.options[contents_cover.options.selectedIndex].value
  );
  result += Number(
    building_cover?.options[building_cover.options.selectedIndex].value
  );

  result -= Number(free_years.value) * 10;
  return result;
}

function writeInLocalStorage(): boolean {
  if (!validateInput()) {
    alert("please enter area or who are you");
    return false;
  }
  let rent_peson_value = 0;
  let area_value = 0;
  rent_person.forEach((p) => {
    if ((p as HTMLInputElement)?.checked) {
      rent_peson_value += Number((p as HTMLInputElement)?.value);
    }
  });

  area.forEach((a) => {
    if ((a as HTMLInputElement)?.checked) {
      area_value += Number((a as HTMLInputElement)?.value);
    }
  });

  let userData = {
    name: usernameMain?.value,
    email: email?.value,
  };
  let enteredData = {
    rent_person: rent_peson_value,
    area_cost: area_value,
    numBedrooms: numBedrooms?.value,
    property_type:
      property_type?.options[property_type.options.selectedIndex].value,
    year_built: year_built?.value,
    cover_type: cover_type?.options[cover_type.options.selectedIndex].value,
    contents_cover: contents_cover?.options[contents_cover.selectedIndex].value,
    building_cover: building_cover?.options[building_cover.selectedIndex].value,
    free_years: free_years?.value,
  };
  localStorage?.setItem("entered-data", JSON.stringify(enteredData));
  localStorage?.setItem("user-data", JSON.stringify(userData));
  localStorage?.setItem("cost", JSON.stringify(calculateInsuranceCost()));
  return true;
}

function readFromLocalStorage(): void {
  let strObj = localStorage.getItem("entered-data");
  if (strObj) {
    let obj = JSON.parse(strObj);
    numBedrooms.value = obj.numBedrooms;
    property_type.value = obj.property_type;
    year_built.value = obj.year_built;
    cover_type.value = obj.cover_type;
    contents_cover.value = obj.contents_cover;
    building_cover.value = obj.building_cover;
    free_years.value = obj.free_years;
  }
  let strUserData = localStorage.getItem("user-data");
  if (strUserData) {
    let userData = JSON.parse(strUserData);
    usernameMain.value = userData.name;
    email.value = userData.email;
  }
}

function validateInput(): boolean {
  if (
    !document.querySelector("input[name='area']:checked") ||
    !document.querySelector("input[name='rent-person']:checked")
  ) {
    return false;
  }
  return true;
}
