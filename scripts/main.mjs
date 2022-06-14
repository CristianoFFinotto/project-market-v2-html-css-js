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

/********************** Taking DOM node **********************/

const inputStartDate = document.querySelector('#start-date');
const inputWeeks = document.querySelector('#weeks');
const inputWeeklyProducts = document.querySelector('#weekly-products');
const inputDaysInaWeek = document.querySelector('#days-in-week');
const inputCheckTreshold = document.querySelector('#check-threshold');
const inputSave = document.querySelector('#save');
const inputReset = document.querySelector('#reset');

/* REGEX */

let regexInputStartDate = new RegExp('(0[1-9]|[1-3][0-9])\/(0[1-9]|1[0-2])\/[1-9][0-9]{3}');
let regexInputWeek = new RegExp('[0-9]{1,2}');
let regexInputWeeklyProducts = new RegExp('[0-9]{1,3}');
let regexInputDaysInaWeek = new RegExp('[1-9]');
let regexInputCheckTreshold = new RegExp('[1-9]');

let inputs = [inputStartDate, inputWeeks, inputWeeklyProducts, inputDaysInaWeek, inputCheckTreshold];

/* disable paste into inputs */

inputs.forEach((input) => input.addEventListener('paste', (e) => e.preventDefault()));

/* disable autocomplete inputs */

inputs.forEach((input) => input.autocomplete = 'off');

inputStartDate.addEventListener('input', (e) => validator.checkStartDate(inputStartDate, e, 10, regexInputStartDate, inputs, inputSave));
inputWeeks.addEventListener('input', (e) => validator.checkOtherInputs(inputWeeks, e, 2, regexInputWeek, inputs, inputSave));
inputWeeklyProducts.addEventListener('input', (e) => validator.checkOtherInputs(inputWeeklyProducts, e, 3, regexInputWeeklyProducts, inputs, inputSave));
inputDaysInaWeek.addEventListener('input', (e) => validator.checkOtherInputs(inputDaysInaWeek, e, 1, regexInputDaysInaWeek, inputs, inputSave));
inputCheckTreshold.addEventListener('input', (e) => validator.checkOtherInputs(inputCheckTreshold, e, 1, regexInputCheckTreshold, inputs, inputSave));

//TODO: finire di gestire il save

inputSave.addEventListener('click', (e) => {e.preventDefault(); console.log('tutto ok!')});
inputReset.addEventListener('click', () => inputs.forEach(input => input.classList.remove('valid-input', 'error-input')));

 let init = () => {

	let runtime = cnf.weeksRuntime;
	let nodeContent = document.getElementById("content");
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
 
		 for(let i = runtime; i > 0; i--){
		 // 1) Add new items
		 items.push(...fn.generateItems(cnf.newItemsPerWeek, startConfig));
		 fn.printContent(items, currentDate, i, nodeContent);
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

 init();
 