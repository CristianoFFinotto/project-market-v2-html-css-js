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
 