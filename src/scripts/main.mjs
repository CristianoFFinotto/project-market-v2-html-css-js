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
import * as validator from "./validator.mjs";
//import reset from "../styles / reset.css ";
//import css from "../styles/style.css";


/********************** Taking DOM node **********************/

const inputStartGeneratorProduct = document.querySelector('#start-generator-product');
const inputStartDate = document.querySelector('#start-date');
const inputWeeks = document.querySelector('#weeks');
const inputWeeklyProducts = document.querySelector('#weekly-products');
const inputDaysInaWeek = document.querySelector('#days-in-week');
const inputCheckTreshold = document.querySelector('#check-threshold');
const inputSave = document.querySelector('#save');
const inputReset = document.querySelector('#reset');
const inputSetting = document.querySelector('#setting-btn');

/********************** REGEX **********************/

let regexInputStartDate = new RegExp('(0[1-9]|1[0-2])\/(0[1-9]|[1-3][0-9])\/[1-9][0-9]{3}');

let inputs = [
    inputStartGeneratorProduct,
    inputStartDate,
    inputWeeks,
    inputWeeklyProducts,
    inputDaysInaWeek,
    inputCheckTreshold
];

/********************** disable paste into inputs **********************/

inputs.forEach((input) => input.addEventListener('paste', (e) => e.preventDefault()));

/********************** disable autocomplete inputs **********************/

inputs.forEach((input) => input.autocomplete = 'off');

/********************** permit insert number backspace tab arrow t,r,b,l slash **********************/

[inputStartGeneratorProduct, inputStartDate]
.forEach((input) => input.addEventListener('keydown', (e) => {
    if (
        e.key.match(/[^\/\d]/g) && e.key !== 'Backspace' &&
        e.key !== 'Tab' && e.key !== 'ArrowUp' &&
        e.key !== 'ArrowDown' &&
        e.key !== 'ArrowLeft' &&
        e.key !== 'ArrowRight'
    )
        e.preventDefault();
}));

/********************** permit insert number backspace tab arrow t,r,b,l minus **********************/

[inputWeeks, inputWeeklyProducts, inputDaysInaWeek, inputCheckTreshold]
.forEach((input) => input.addEventListener('keydown', (e) => {
    if (
        e.key.match(/[^-\d]/g) &&
        e.key !== 'Backspace' &&
        e.key !== 'Tab' &&
        e.key !== 'ArrowUp' &&
        e.key !== 'ArrowDown' &&
        e.key !== 'ArrowLeft' &&
        e.key !== 'ArrowRight'
    )
        e.preventDefault();
}));

/********************** trigger callbacks with event input **********************/

inputStartGeneratorProduct.addEventListener('input',
    (e) => validator.checkStartDate(inputStartGeneratorProduct, e, cnf.maxLenghtDate, regexInputStartDate, inputs, inputSave));
inputStartDate.addEventListener('input',
    (e) => validator.checkStartDate(inputStartDate, e, cnf.maxLenghtDate, regexInputStartDate, inputs, inputSave));
inputWeeks.addEventListener('input',
    (e) => validator.checkOtherInputs(inputWeeks, e, cnf.maxWeeks, inputs, inputSave));
inputWeeklyProducts.addEventListener('input',
    (e) => validator.checkOtherInputs(inputWeeklyProducts, e, cnf.maxWeeklyProducts, inputs, inputSave));
inputDaysInaWeek.addEventListener('input',
    (e) => validator.checkOtherInputs(inputDaysInaWeek, e, cnf.maxDaysInaWeek, inputs, inputSave));
inputCheckTreshold.addEventListener('input',
    (e) => validator.checkOtherInputs(inputCheckTreshold, e, cnf.maxTreshold, inputs, inputSave));

inputSetting.addEventListener('click', () => fn.openCloseMenu());

inputSave.addEventListener('click',
    (e) => {
        e.preventDefault();

        cnf.startGeneratorExpiring = inputStartGeneratorProduct.value;
        cnf.startProgramDate = inputStartDate.value;
        cnf.weeksRuntime = Number(inputWeeks.value);
        cnf.newItemsPerWeek = Number(inputWeeklyProducts.value);
        cnf.daysInWeek = Number(inputDaysInaWeek.value);
        cnf.shelfLife = Number(inputCheckTreshold.value);
        cnf.id = 1;

        fn.openCloseMenu();

        init();
    });

/********************** reset input and style **********************/

inputReset.addEventListener('click',
    () => {
        inputs.forEach(input => input.classList.remove('valid-input', 'error-input'))
        inputSave.disabled = true
    });

/********************** start program with function **********************/

function init() {

    let runtime = cnf.weeksRuntime;
    let nodeContent = document.getElementById("content");

    /********************** 
     * clear table when called init, to restart
     * cleaned when save button pressed 
     ***********************/

    while (nodeContent.hasChildNodes()) {
        nodeContent.removeChild(nodeContent.firstChild);
    }

    let items = [];

    /* startDate and endDate define the range of the generated items' expiry dates */

    let currentDate = new Date(cnf.startProgramDate);
    let endDate = fn.addDays(currentDate, runtime * cnf.daysInWeek);
    let startExpiry = new Date(cnf.startGeneratorExpiring);
    let shelfLife = cnf.shelfLife;

    for (let i = runtime; i > 0; i--) {
        /* 1) Add new items */
        items.push(...fn.generateItems(cnf.newItemsPerWeek, itemNames, endDate, startExpiry, currentDate, shelfLife));
        fn.printContent(items, new Date(currentDate), i, nodeContent);
        /* 2) Filter the items */
        items = items.filter(fn.checkItem);
        /* 4) Add days to the current date */
        currentDate = fn.addDays(currentDate, cnf.daysInWeek);
        /* 5) Update the items (state and checks) */
        items.forEach(item => {
            fn.updateChecks(item);
            fn.updateState(item, currentDate, cnf.shelfLife);
        });
    };
};

let orderedItems = [];
let sortTable = (emptyArray, itemArray) => {

    itemArray.forEach(item => {
        emptyArray.push(item.name);
    });
    emptyArray.sort();
    console.log(emptyArray);
}

init();