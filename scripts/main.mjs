/**
 * @file main.mjs
 * @authors Davide Murroni, Simone Sporeni, Paolo Gippa, Cristiano Francesco Finotto
 * Main file used to run the program
 *
 * This file imports functions and variables from the other files in the project
 * and uses them to run the main program.
 */

import { config as cnf } from "./config.mjs"; //configuration object
import * as fn from "./functions.mjs"; //main functions used to run the program
import { itemNames } from "./itemsNames.mjs"; //array with a list of all possible item names

let runtime = cnf.weeksRuntime;
let nodeContent = document.getElementById("content");

let init = () => {

    /* dare un messaggio sul DOM di errore */

    if (runtime <= 0) {
        console.log("The program runitme is either 0 or less. Please check your configuration file.");
        return;
    }

    let items = [];
    //startDate and endDate define the range of the generated items' expiry dates
    let startDate = new Date();
    let endDate = fn.addDays(startDate, runtime * cnf.daysInWeek);

    let currentDate = fn.addDays(startDate, cnf.startingOffset);


    let startConfig = {
        itemNames,
        startDate,
        endDate,
        currentDate,
        shelfLife: cnf.shelfLife,
    };

    for (let i = runtime; i > 0; i--) {
        // 1) Add new items
        items.push(...fn.generateItems(cnf.newItemsPerWeek, startConfig));
        printContent(items, currentDate, i);
        //Filter the items
        items = items.filter(fn.checkItem);
        // 4) Add days to the current date
        currentDate = fn.addDays(currentDate, cnf.daysInWeek);
        // 5) Update the items (state and checks)
        items.forEach(item => {
            fn.updateChecks(item);
            fn.updateState(item, currentDate, cnf.shelfLife);
        });
    };
};

function printContent(itemArray, currentDate, sectionId) {

    let sectionContent = document.createElement("div");
    sectionContent.id = sectionId;

    if (sectionContent.id < cnf.weeksRuntime) {
        sectionContent.classList.add("d-none");
    }

    /* Create title with current date */
    let title = document.createElement("h2");
    title.textContent = `Date: ${currentDate.toLocaleDateString(cnf.locale, { day: cnf.dayFormat}, {month: cnf.monthFormat })}`;
    sectionContent.appendChild(title);

    createTable(itemArray, sectionContent);
    /* Table FIltered */
    let filtered = document.createElement("h2");
    filtered.textContent = "Filtered";
    sectionContent.appendChild(filtered);

    createTable(itemArray.filter(fn.checkItem), sectionContent);

    /* Add Buttons */
    let buttonNext = document.createElement("button");
    buttonNext.textContent = "Next";
    buttonNext.id = "next-button";
    buttonNext.onclick = function() {
        if (sectionId - 1 > 0) {
            let nextSection = document.getElementById(sectionId - 1);

            sectionContent.classList.add("d-none");
            nextSection.classList.remove("d-none");
        } /* Else messaggio errore  */
    }

    let buttonPrevious = document.createElement("button");
    buttonPrevious.textContent = "Previous";
    buttonPrevious.id = "previous-button";
    buttonPrevious.onclick = function() {
        if (sectionId + 1 <= cnf.weeksRuntime) {
            let previousSection = document.getElementById(sectionId + 1);

            sectionContent.classList.add("d-none");
            previousSection.classList.remove("d-none");
        } /* Else messaggio errore */
    }

    sectionContent.appendChild(buttonPrevious);
    sectionContent.appendChild(buttonNext);

    nodeContent.appendChild(sectionContent);
}

function createTable(itemArray, node) {
    /* create table with items */
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let tableRowThead = document.createElement("tr");

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

    thead.appendChild(tableRowThead);
    table.appendChild(thead);

    itemArray.forEach(e => {
        let tableRowItem = document.createElement("tr");
        tableRowItem.classList.add("row-class");

        let thIdElement = document.createElement("th");
        thIdElement.textContent = e.id;
        tableRowItem.appendChild(thIdElement);

        let thNameElement = document.createElement("th");
        thNameElement.textContent = e.name;
        tableRowItem.appendChild(thNameElement);

        let thExpiryEement = document.createElement("th");
        thExpiryEement.textContent = e.expiry;
        tableRowItem.appendChild(thExpiryEement);

        let thChecksEement = document.createElement("th");
        thChecksEement.textContent = e.checks;
        tableRowItem.appendChild(thChecksEement);

        let thStateEement = document.createElement("th");
        thStateEement.textContent = e.state;
        tableRowItem.appendChild(thStateEement);

        tbody.appendChild(tableRowItem);
    })

    table.appendChild(tbody);
    node.appendChild(table);

}

init();