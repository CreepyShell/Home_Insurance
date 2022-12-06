var totalCost = document.getElementById("cost");
var backButton = document.getElementById("back-button");
let username = document.getElementById("name");

var costInStorage = localStorage.getItem("cost");
var nameInStorage = localStorage.getItem("user-data");


backButton.addEventListener("click", () => {
    window.close();
    window.open("main-page.html")
})

if (costInStorage) { totalCost.textContent = JSON.parse(costInStorage); }
if (nameInStorage) { username.textContent = JSON.parse(nameInStorage).name }