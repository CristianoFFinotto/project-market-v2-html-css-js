

let openCloseMenu = () => {
  let mainContainer = document.getElementById("main-container");
  let button = document.getElementById("setting-btn");
  if (mainContainer.className == "container") {
    mainContainer.className += "-open";  
  } else {
    mainContainer.className = "container";  
  }
  if (button.className == "setting-btn") {
    button.className += "-open";
  } else {
    button.className = "setting-btn";
  }

};

let settingButton = document.getElementById("setting-btn").addEventListener("click", openCloseMenu);
