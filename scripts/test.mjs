

export let openCloseMenu = () => {
  let mainContainer = document.getElementById("main-container");
  let buttonContainer = document.getElementById("form-button-container")
  let button = document.getElementById("setting-btn");
  if (mainContainer.className == "container" && buttonContainer.className == "container") {
    mainContainer.className += "-open";  
    buttonContainer.className += "-open-btn";  
  } else {
    mainContainer.className = "container";  
    buttonContainer.className = "container";  
  }
  if (button.className == "setting-btn") {
    button.className += "-open";
  } else {
    button.className = "setting-btn";
  }

};

let settingButton = document.getElementById("setting-btn").addEventListener("click", openCloseMenu);
