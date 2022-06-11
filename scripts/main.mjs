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

let init = () => {
	
	let runtime = cnf.weeksRuntime;

	/* dare un messaggio sul DOM di errore */

	if (runtime <= 0) {
		console.log("The program runitme is either 0 or less. Please check your configuration file.");
		return;
	}

	//startDate and endDate define the range of the generated items' expiry dates

	let startDate = new Date();
	let endDate = fn.addDays(startDate, runtime * cnf.daysInWeek);

	let currentDate = fn.addDays(startDate, cnf.startingOffset);

	let items = [];

	let id = setInterval(() => {

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

		// 4) Add days to the current date
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
		}
	}, interval * 1000);
};
