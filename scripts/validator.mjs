/**
 * @file main.mjs
 * @authors Davide Murroni, Simone Sporeni, Paolo Gippa, Cristiano Francesco Finotto
 * file used to validate inputs form
 *
 * rhis file check inputs
 */

/**Function validate only startDate
 * @param {object} input - input DOM
 * @param {object} e - event input
 * @param {number} maxLenght - max number of char 
 * @param {object} regex - regular expression
 * @param {array} inputs - all inputs form exept save and reset
 * @param {object} save - save input DOM
 */

export function checkStartDate(input, e, maxLenght, regex, inputs, save) {

    let inputValue = e.target.value;

	if(!input.classList.contains('error-input')){
		input.classList.add('error-input');
	}
	
	if(inputValue.length === maxLenght || inputValue.length === maxLenght - 1 || inputValue.length === maxLenght - 2){
		if(inputValue.match(regex)){
			if(!input.classList.contains('valid-input')){
				input.classList.add('valid-input');
			}
			input.classList.remove('error-input');
		}
	}

	totalCheck(inputs, save);
}

/**Function validate all inputs exept startDate, save, reset
 * @param {object} input - input from DOM
 * @param {object} e - event input
 * @param {number} maxLenght - max number of char 
 * @param {object} regex - regular expression
 * @param {array} inputs - all inputs form exept save and reset
 * @param {object} save - save input DOM
 */

export function checkOtherInputs(input, e, maxLenght, regex, inputs, save) {

    let inputValue = e.target.value;

	if(!input.classList.contains('error-input')){
		input.classList.add('error-input');
	}
	
	if(inputValue.length <= maxLenght){
		if(inputValue.match(regex)){
			if(!input.classList.contains('valid-input')){
				input.classList.add('valid-input');
			}
			input.classList.remove('error-input');
		}
	}

	totalCheck(inputs, save);
}

/**Function check if all inputs are valid and enable/disable save button 
 * @param {object} inputs - all inputs form exept save and reset
 * @param {object} save - save input DOM
 */

function totalCheck(inputs, save) {
	if(inputs.every((input) => input.classList.contains('valid-input') && !input.classList.contains('error-input')))
		save.disabled = false;
	else
		save.disabled = true;
}

