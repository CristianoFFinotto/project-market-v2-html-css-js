/**
 * @file main.mjs
 * @authors Nemanja Gajicic, Pietro Milanese, Jacopo Trompeo, Davide Murroni
 * Main file used to run the program
 *
 * This file imports functions and variables from the other files in the project
 * and uses them to run the main program.
 */

import { config as cnf } from "./config.mjs"; //configuration object
import * as fn from "./functions.mjs"; //main functions used to run the program
import { itemNames } from "./itemsNames.mjs"; //array with a list of all possible item names

let isRunning = false;

let init = () => {
	let runtime = cnf.weeksRuntime;

	if (runtime <= 0) {
		console.log("The program runitme is either 0 or less. Please check your configuration file.");
		return;
	}

	if (isRunning) {
		console.log("The program is already running.");
		return;
	}

	isRunning = true;

	//startDate and endDate define the range of the generated items' expiry dates
	let startDate = new Date();
	let endDate = fn.addDays(startDate, runtime * cnf.daysInWeek);

	let interval = Math.floor(Math.random() * (cnf.maxIntervalSec - cnf.minIntervalSec + 1) + cnf.minIntervalSec);
	console.log(`Seconds interval: ${interval} (between ${cnf.minIntervalSec} and ${cnf.maxIntervalSec})`);

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

		// 2) Print all of the items
		console.log(`Week of ${fn.formatDate(currentDate, cnf)}`);
		console.log("---------------------------------------------------------");
		fn.printItems(items, cnf);

		// 3) Filter the items and print the filtered list
		items = items.filter(fn.checkItem);
		console.log("Filtered");
		console.log("--------");
		fn.printItems(items, cnf);
		console.log("");

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

let button = document.getElementById("start");
button.addEventListener("click", init);
