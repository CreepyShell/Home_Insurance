let returnButton = document.getElementById("return-button");
if (returnButton) {
  returnButton.addEventListener("click", () => {
    window.open("main-page.html");
    window.close();
  });
}
