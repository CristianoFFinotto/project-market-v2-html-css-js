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
let items = [];
let OldExpiryItems = [];
//startDate and endDate define the range of the generated items' expiry dates
let startDate = new Date();
let endDate = fn.addDays(startDate, runtime * cnf.daysInWeek);

let currentDate = fn.addDays(startDate, cnf.startingOffset);

let init = () => {

	/* dare un messaggio sul DOM di errore */

	if (runtime <= 0) {
		console.log("The program runitme is either 0 or less. Please check your configuration file.");
		return;
	}


		let startConfig = {
			itemNames,
			startDate,
			endDate,
			currentDate,
			shelfLife: cnf.shelfLife,
		};

		// 1) Add new items
		items.push(...fn.generateItems(cnf.newItemsPerWeek, startConfig));

		// 2) Print all of the items into DOM 

		/*
			console.log(`Week of ${fn.formatDate(currentDate, cnf)}`);
			console.log("---------------------------------------------------------");
			fn.printItems(items, cnf); 
		*/

		// 3) Filter the items and print the filtered list into DOM

		/* 
			items = items.filter(fn.checkItem);
			fn.printItems(items, cnf);
			console.log(""); 
		*/

	/* 	// 4) Add days to the current date
		currentDate = fn.addDays(currentDate, cnf.daysInWeek);

		// 5) Update the items (state and checks)
		items.forEach(item => {
			fn.updateChecks(item);
			fn.updateState(item, currentDate, cnf.shelfLife);
		});

		// 6) Check if the program should go on
		runtime--;
		if (runtime <= 0) {
			clearInterval(id);
			isRunning = false;
		} */
	};

function printContent(itemArray, currentDate) {
	let nodeContent = document.getElementById("content");
    /* Delete al node in section content */
	while (nodeContent.hasChildNodes()) {
		nodeContent.removeChild(nodeContent.firstChild);
	  }

	/* Create title with current date */
	let title = document.createElement("h2");
	title.textContent = `Date: ${currentDate}`;
	nodeContent.appendChild(title);

	createTable(itemArray);
    /* Table FIltered */
	let filtered = document.createElement("h2");
	filtered.textContent = "Filtered";

	createTable(itemArray.filter(fn.checkItem));
	/* Add Buttons */
}

function createTable(itemArray) {
		/* create table with items */
		let table = document.createElement("table");
		let thead = document.createElement("thead");
		let tbody = document.createElement("tbody");
		let tableRowThead = document.createElement("tr");
		
		let thId = document.createElement("th");
		thId.textContent = "Id";
		tableRowThead.appendChild(thId);
	
		let thName = document.createElement("th");
		thId.textContent = "Name";
		tableRowThead.appendChild(thName);
	
		let thExpiry = document.createElement("th");
		thId.textContent = "Expiry Date";
		tableRowThead.appendChild(thExpiry);
	
		let thChecks = document.createElement("th");
		thId.textContent = "Checks";
		tableRowThead.appendChild(thChecks);
	
		let thState = document.createElement("th");
		thId.textContent = "State";
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
	
			tbody.appendChild(tableRowItem);
		})
	
		table.appendChild(tbody);
		nodeContent.appendChild(table);
	
}
