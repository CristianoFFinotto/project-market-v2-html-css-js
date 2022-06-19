/**
 * @file config.mjs
 * @authors Davide Murroni, Simone Sporeni, Paolo Gippa, Cristiano Francesco Finotto
 * File containing an array of all possible item names.
 *
 * This array of item names can be imported in any file and should be used
 * when generating a random item for the market.
 */

/**
 * @property {number} daysInWeek - the number of days in a week
 * @property {number} startingOffset - K - offset of days used at the beginning of the program
 * @property {number} shelfLife - N - number of weeks an item can be on the shelf before it is considered old
 * @property {number} newItemsPerWeek - M - numbr of new items added each week
 * @property {number} weeksRuntime - X - how many weeks the program will run for
 */

export let config = {
	daysInWeek: 6,
	startingOffset: 3,
	shelfLife: 2,
	newItemsPerWeek: 5,
	weeksRuntime: 4,
};
