/**
 * @file config.mjs
 * @authors Davide Murroni, Simone Sporeni, Paolo Gippa, Cristiano Francesco Finotto
 * Configuration object for the setting panel
 *
 * Configuration object for the setting panel and for the items manipulation
 */

/**
 * @property {number} daysInWeek - the number of days in a week
 * @property {string} startGeneratorExpiring - string representing a starting date (MM/DD/YYYY) for product generation
 * @property {number} shelfLife - number of weeks an item can be on the shelf before it is considered old
 * @property {number} newItemsPerWeek  - number of new items added each week
 * @property {number} weeksRuntime  - how many weeks the program will run for
 * @property {string} startProgramDate - string representing the program starting date
 * @property {number} id - number indicating the items starting Id
 * @property {number} maxLenghtDate - number representing the max number of character for valid date input
 * @property {number} maxWeeks - number representing the max number of weeks runtime
 * @property {number} maxWeeklyProducts - number representing the max number of products generated each week
 * @property {number} maxDaysInaWeek - number rappresenting the max number of days that compose a week
 * @property {number} maxTreshold - number representing the max number of checks for each product
 *
 */

export let config = {
  startGeneratorExpiring: "12/10/2022",
  startProgramDate: "12/12/2022",
  weeksRuntime: 4,
  newItemsPerWeek: 5,
  daysInWeek: 6,
  shelfLife: 2,
  id: 1,
  maxLenghtDate: 10,
  maxWeeks: 99,
  maxWeeklyProducts: 20,
  maxDaysInaWeek: 9,
  maxTreshold: 9,
};
