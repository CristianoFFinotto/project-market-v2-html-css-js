/**
 * @file functions.mjs
 * @authors Davide Murroni, Simone Sporeni, Paolo Gippa, Cristiano Francesco Finotto
 * File with our main utility functions.
 *
 * This file is used to:
 * - generate items of a supermarket
 * - update those items based on various characteristics
 * - print the items in DOM
 * - manipulate certain useful variables (increment a date, week specification)
 */
/* Config import */
import { config as cnf } from "./config.js";

/**
 * Returns a global id variable and increments it by 1
 * @returns {number} the global id variable before incrementing it
 */

function uniqueId() {
  return cnf.id++;
}

/**
 * Picks a random item name from an array of item names and returns it
 * @param {object} itemNames - names of various possible items
 * @returns {string} the randomly selected item name
 */

let generateName = (itemNames) => {
  let randomIndex = Math.floor(Math.random() * itemNames.length);
  return itemNames[randomIndex];
};

/**
 * Generates a random date betweeen two date parameters comparing timestamp
 * @param {Date} start - starting point for the generation of the date (no dates before)
 * @param {Date} end - ending point for the generation of the date (no dates after)
 * @returns {Date} a random date bewteen start and end
 */

function generateExpiry(start, end) {
  return new Date(
    new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).setHours(
      0,
      0,
      0,
      0
    )
  );
}

/**
 * Generates an item with random data and returns it
 * @param {number} numberOfItems - the number of new item objects to generate
 * @param {object} itemNames - a list of item names to be selected from randomly
 * @param {Date} startExpiry - the date that starts the range for a random date generation (item.expiry)
 * @param {Date} endDate - the date that ends the range for a random date generation (item.expiry)
 * @param {Date} currentDate - the current date to be used when updating the state of the item
 * @param {number} shelfLife - the number of weeks an item can be on a shelf before it is considered old
 * @returns {object} - an array of item objects filled with data as per defined by its structure
 */

export function generateItems(
  numberOfItems,
  itemNames,
  startExpiry,
  endDate,
  currentDate,
  shelfLife
) {
  let weeklyItems = [];

  for (let i = 0; i < numberOfItems; i++) {
    let item = {
      id: uniqueId(),
      name: generateName(itemNames),
      expiry: generateExpiry(startExpiry, endDate),
      checks: 0,
      state: "",
    };
    updateState(item, currentDate, shelfLife);
    weeklyItems.push(item);
  }

  return weeklyItems;
}

/**
 * Updates the state of an item object based on its expiry date and shelf life
 * It's new if it's not expired and has 0 checks (checks happen once a week)
 * It's expired if its expiry date is less than the current date
 * It's old if its checks are greater than the shelf life of an item
 * Otherwise it's considered valid
 * @param {object} item - the item object to update
 * @param {Date} currentDate - the current date used to check if an item is expired
 * @param {number} shelfLife - the shelf life of an item used to check if it's old
 */

export function updateState(item, currentDate, shelfLife) {
  if (item.checks === 0 && item.expiry >= currentDate) {
    item.state = "New";
    return;
  }

  if (item.expiry < currentDate) {
    item.state = "Expired";
    return;
  }

  if (item.checks > shelfLife) {
    item.state = "Old";
    return;
  }

  item.state = "Valid";
}

/**
 * Updates the checks property of an item object incrementing it by one (should be called every week)
 * @param {object} item - the item object to update
 * @param {number} item.checks - the number of checks (number of weeks on a shelf) an item has
 */

export function updateChecks(item) {
  item.checks++;
}

/**
 * Checks if an item has a state of either 'New' or 'Valid'
 * @param {object} item - the item object to check
 * @returns {boolean} true if item.state is 'New' or 'Valid', false otherwise
 */

export function checkItem(item) {
  return item.state === "New" || item.state === "Valid";
}

/**
 * Adds any amount of days to a date object and returns the result
 * @param {Date} - the date object to increment
 * @param {number} - the number of days to increment the date by
 * @returns {Date} the date after the days have been added
 */

export function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
/**
 * Function create DOM table
 * @param {Array} itemArray - array of product.
 * @param {Node} node - DOM node where append table.
 */

function createTable(itemArray, node) {
  /* create table with items */
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");
  let tableRowThead = document.createElement("tr");

  /* create th items containing the column description */
  let thId = document.createElement("th");
  thId.textContent = "Id";
  tableRowThead.appendChild(thId);

  let thName = document.createElement("th");
  thName.textContent = "Name";
  tableRowThead.appendChild(thName);

  let thExpiry = document.createElement("th");
  thExpiry.textContent = "Expiry Date";
  tableRowThead.appendChild(thExpiry);

  let thChecks = document.createElement("th");
  thChecks.textContent = "Checks";
  tableRowThead.appendChild(thChecks);

  let thState = document.createElement("th");
  thState.textContent = "State";
  tableRowThead.appendChild(thState);

  /* append tr to thead and thead to the table */
  thead.appendChild(tableRowThead);
  table.appendChild(thead);

  /* loop on each array item / generate a tr with a td for each item property */
  itemArray.forEach((item) => {
    let tableRowItem = document.createElement("tr");

    let thIdElement = document.createElement("td");
    thIdElement.textContent = item.id;
    tableRowItem.appendChild(thIdElement);

    let thNameElement = document.createElement("td");
    thNameElement.textContent = item.name;
    tableRowItem.appendChild(thNameElement);

    let thExpiryEement = document.createElement("td");
    thExpiryEement.textContent = item.expiry.toLocaleDateString();
    tableRowItem.appendChild(thExpiryEement);

    let thChecksEement = document.createElement("td");
    thChecksEement.textContent = item.checks;
    tableRowItem.appendChild(thChecksEement);

    let thStateEement = document.createElement("td");
    thStateEement.textContent = item.state;
    tableRowItem.appendChild(thStateEement);

    /* switch instruction to change html classes based on item state value */
    switch (item.state) {
      case "New":
        tableRowItem.classList.add("green");
        break;
      case "Valid":
        tableRowItem.classList.add("yellow");
        break;
      case "Old":
        tableRowItem.classList.add("orange");
        break;
      case "Expired":
        tableRowItem.classList.add("red");
        break;
      default:
        tableRowItem.classList.add("transparent");
    }
    /* append tr generated to tbody */
    tbody.appendChild(tableRowItem);
  });
  /* append tbody generated and complete to the table */
  table.appendChild(tbody);
  /* append table to node parameter */
  node.appendChild(table);
}
/**
 * Function print content into section
 * @param {Array} itemArray - Array of product.
 * @param {Date} currentDate - Actual date.
 * @param {Number} sectionId - The number for the section id.
 * @param {Node} nodeContent - The node to print the content.
 */

export function printContent(itemArray, currentDate, sectionId, nodeContent) {
  let sectionContent = document.createElement("div");
  sectionContent.id = sectionId;

  if (sectionContent.id < cnf.weeksRuntime) {
    sectionContent.classList.add("d-none");
  }

  /* Create title with current date */
  let title = document.createElement("h2");
  title.textContent = `Date: ${currentDate.toLocaleDateString()}`;
  title.classList.add("text-table");
  sectionContent.appendChild(title);
  /* call function for all items */
  createTable(itemArray, sectionContent);

  /* Container of subtitle and buttons */
  let buttonDiv = document.createElement("div");
  buttonDiv.classList.add("flex-container");

  /* Table FIltered */
  let filtered = document.createElement("h2");
  filtered.textContent = "Filtered";
  filtered.classList.add("text-table");

  /* Add Buttons */
  let buttonNext = document.createElement("button");
  buttonNext.textContent = "Next";
  buttonNext.classList.add("button");
  buttonNext.onclick = function () {
    let nextSection = document.getElementById(sectionId - 1);

    sectionContent.classList.add("d-none");
    nextSection.classList.remove("d-none");
  };
  if (sectionId === 1) {
    buttonNext.classList.add("v-hidden");
  }

  let buttonPrevious = document.createElement("button");
  buttonPrevious.textContent = "Previous";
  buttonPrevious.classList.add("button");
  buttonPrevious.onclick = function () {
    if (sectionId + 1 <= cnf.weeksRuntime) {
      let previousSection = document.getElementById(sectionId + 1);

      sectionContent.classList.add("d-none");
      previousSection.classList.remove("d-none");
    }
  };
  if (sectionId === cnf.weeksRuntime) {
    buttonPrevious.classList.add("v-hidden");
  }

  buttonDiv.appendChild(buttonPrevious);
  buttonDiv.appendChild(filtered);
  buttonDiv.appendChild(buttonNext);

  sectionContent.appendChild(buttonDiv);
  /* call function with filter method for valid and not valid items */
  createTable(itemArray.filter(checkItem), sectionContent);

  nodeContent.appendChild(sectionContent);
}

/**
 * Function that open close settings panel
 */

export function openCloseMenu() {
  let mainContainer = document.getElementById("main-container");
  let buttonContainer = document.getElementById("form-button-container");
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
}
