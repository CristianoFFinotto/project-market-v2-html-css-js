/**
 * @file config.mjs
 * @authors Nemanja Gajicic, Pietro Milanese, Jacopo Trompeo, Davide Murroni
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
 * @property {number} intervalSeconds - R - how many seconds a simulated weeks lasts for
 * @property {number} zeroPaddedDigits - the final length to reach after a number is 0 padded
 * @property {string} paddingCharacter - the character used to pad a string
 * @property {number} paddedNameChars - the final length to reach after the name of an item is padded
 * @property {number} paddedStateChars - the final lenght to reach after the state of an item is padded
 * @property {number} minIntervalSec - the lowest number of seconds an interval can assume
 * @property {number} maxIntervalSec - the highest number of seconds (excluded) an interval can assume
 * @property {string} newColor - the color used to style the output if the state of an item is "New"
 * @property {string} validColor - the color used to style the output if the state of an item is "Valid"
 * @property {string} oldColor - the color used to style the output if the state of an item is "Old"
 * @property {string} expiredColor - the color used to style the output if the state of an item is "Expired"
 * @property {string} fallbackColor - the color used to style the output if the item has no state
 * @property {string} locale - the locale used for the date: https://www.venea.net/web/culture_code
 * @property {string} dayFormat - used to format the day ("2-digit", "numeric")
 * @property {string} monthFormat - used to format the month ("long" "narrow" "numeric" "short")
 * @property {string} yearFormat - used to format the year ("2-digit", "numeric")
 */
export let config = {
	daysInWeek: 6,
	startingOffset: 3,
	shelfLife: 2,
	newItemsPerWeek: 5,
	weeksRuntime: 4,
	intervalSeconds: 1,
	zeroPaddedDigits: 3,
	paddingCharacter: "*",
	paddedNameChars: 17,
	paddedStateChars: 11,
	//BONUS 1 make R a random number between MIN and MAX
	minIntervalSec: 1,
	maxIntervalSec: 5,
	//BONUS 2 Use colours in the console log output
	newColor: "PaleGreen",
	validColor: "LightSkyBlue",
	oldColor: "Moccasin",
	expiredColor: "LightPink",
	fallbackColor: "LightSlateGrey",
	//BONUS 3 Accept a user defined date formant in the config object
	locale: "en",
	dayFormat: "2-digit",
	monthFormat: "short",
	yearFormat: "numeric",
};
