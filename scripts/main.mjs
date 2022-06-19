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
		 console.log("The program runtime is either 0 or less. Please check your configuration file.");
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

	 let orderedItems = [];
		let sortTable = (emptyArray, itemArray) => {
		
		itemArray.forEach(item => { 
			emptyArray.push(item.name);
		});
		emptyArray.sort();
		console.log(emptyArray);
	}
	 
 
 function printContent(itemArray, currentDate, sectionId) {
 
	 let sectionContent = document.createElement("div");
	 sectionContent.id = sectionId;
 
	 if(sectionContent.id < cnf.weeksRuntime){
		 sectionContent.classList.add("d-none");
	 }
 
	 /* Create title with current date */
	 let title = document.createElement("h2");
	 title.textContent = 
	 `Date: ${currentDate.toLocaleDateString(cnf.locale, { day: cnf.dayFormat}, {month: cnf.monthFormat })}`;
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
	 buttonNext.onclick = function() {
		 if(sectionId - 1 > 0){
		 let nextSection = document.getElementById(sectionId - 1);
 
		 sectionContent.classList.add("d-none");
		 nextSection.classList.remove("d-none")
	 }/* Else messaggio errore  */
	 }
 
	 let buttonPrevious = document.createElement("button");
	 buttonPrevious.textContent = "Previous";
	 buttonPrevious.onclick = function() {
		 if(sectionId + 1 <= cnf.weeksRuntime){
		 let previousSection = document.getElementById(sectionId + 1);
 
		 sectionContent.classList.add("d-none");
		 previousSection.classList.remove("d-none");
		 }/* Else messaggio errore */
	 }
 
	 sectionContent.appendChild(buttonPrevious);
	 sectionContent.appendChild(buttonNext);
 
	 nodeContent.appendChild(sectionContent);
 }
 
 function createTable(itemArray, node) {
		 /* create table with items */
		 let table = document.createElement("table");
		 table.id = "table";
		 let thead = document.createElement("thead");
		 let tbody = document.createElement("tbody");
		 let tableRowThead = document.createElement("tr");
		 
		 let thId = document.createElement("th");
		 thId.textContent = "Id";
		 tableRowThead.appendChild(thId);

	 
		 let thName = document.createElement("th");
		 thName.textContent = "Name";
		 tableRowThead.appendChild(thName);
		 let arrowButton = document.createElement("button");
		 arrowButton.classList.add("sort-button")
		 thName.appendChild(arrowButton);
		 arrowButton.addEventListener("click", function() { sortTable(orderedItems, itemArray) });
	 
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

			 
			switch(e.state) {
				case "New":
					thStateEement.classList.add("green");
						break;
					case "Valid":
						thStateEement.classList.add("yellow");
						break;
					case "Old":
						thStateEement.classList.add("orange");
						break;
					case "Expired":
						thStateEement.classList.add("red");
						break;
						default: 
						thStateEement.classList.add("transparent");
			 }

	 
			 tbody.appendChild(tableRowItem);
		 })
	 
		 table.appendChild(tbody);
		 node.appendChild(table);
	 
 }

/*  let sortTable = itemArray => {
	itemArray..sort();
	console.log(itemArray)
 } */
 
 init();

 