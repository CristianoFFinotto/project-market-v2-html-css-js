


let openCloseMenu = () => {
  let mainContainer = document.getElementById("main-container");
  if (mainContainer.className == "container") {
    mainContainer.className += "-open"
  } else {
    mainContainer.className = "container";
  }
};

let settingButton = document.getElementById("setting-btn").addEventListener("click", openCloseMenu);
