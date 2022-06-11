# Expiry list javascript program

A command line program made in JavaScript used to output a weekly list of supermarket items filtered by their expiry date.

---

-   [0-js-proj-01-expiry-list](#0-js-proj-01-expiry-list)
-   [Project Description](#project-description)
-   [Usage](#usage)
-   [Configuration and technical characteristics](#configuration-and-technical-characteristics)
-   [Files and project structure](#files-and-project-structure)
-   [Features delivered](#features-delivered)
-   [Bonuses delivered](#bonuses-delivered)
    -   [Bonus 1](#bonus-1)
    -   [Bonus 2](#bonus-2)
    -   [Bonus 3](#bonus-3)
-   [Browser compatibility](#browser-compatibility)
-   [External resources](#external-resources)
-   [License and contact information](#license-and-contact-information)
-   [Authors](#authors)

---

## Project Description

This project is a javascript program that runs in the browser and prints a weekly list of filtered supermarket items in the console. The ways the items are filtered and printed are based on the following rules:

1. expired items should be removed
1. items that have been on the shelf for more than **N** weeks should be removed
1. each week **M** new products arrive
1. the program start from the current date plus **K** days and run for **X** weeks
1. each weekly list should be printed after a duration of **R** seconds
1. **N, M, K, X, R** are configurable by the supermarket manager

Each product can assume different states based on its expiry date, and the number of weeks it's been on the shelf:

1. **New** - the item has arrived this week and is not expired
1. **Valid** - the item is not expired and has been on the shelf for LESS than N weeks
1. **Old** - the item is not expired, but has been on the shelf for MORE than N weeks
1. **Expired** - the item has expired (the date is older than the current week date)

---

## Usage

The program can be run in a number of different ways. It is intended to be run in the browser, but it can also be run in the terminal using nodejs with the following command:

```bash
node main.mjs
```

This, of course, requires having node installed on your machine. If you don't have it installed, you can grab it [here](https://nodejs.org/it/).

To run it in the browser, since ES6 modules are subject to the _same-origin_ policy, the scripts need to be run on a server. To do this, we can simply use the [**Live Server**](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension if you use VS Code as your preferred text editor. Once you have the file open in the browser, simply open the console by right clicking anywhere on the page and selecting **Inspect**, or by using any keybinding you may have configured such as <code>F12</code> or <code>CTRL+SHIFT+I</code>.

The program should ouput something like the following example to the console:

```
Week of 01-JUN-2022 //CURRENT DATE
---------------------------------------------------------
//ID //ITEM NAME      //EXP. DATE //STATE     //CHECKS
001: -----Cheese----- 12-JUN-2022 ----New---- [0 checks]
002: -----Cheese----- 09-JUN-2022 ----New---- [0 checks]
003: -----Banana----- 16-JUN-2022 ----New---- [0 checks]
004: ---Green-Beans-- 27-MAY-2022 --Expired-- [0 checks]
005: ------Apple----- 29-MAY-2022 --Expired-- [0 checks]
006: -----Banana----- 23-JUN-2022 ----New---- [0 checks]

Filtered
--------
001: -----Cheese----- 12-JUN-2022 ----New---- [0 checks]
002: -----Cheese----- 09-JUN-2022 ----New---- [0 checks]
003: -----Banana----- 16-JUN-2022 ----New---- [0 checks]
006: -----Banana----- 23-JUN-2022 ----New---- [0 checks]
```

---

## Configuration and technical characteristics

The program is written entirely in <code>JavaScript</code>, <code>HTML5</code> and <code>CSS3</code>.

As stated in the project description, the supermarket manager (the user of the program) should be able to configure a certain set of rules (N, M, K, X, R). These rules are configurable in the <code>config.mjs</code> file. In addition to the rules that are indicated in the specs of the program, some additional rules have been added.

```javascript
export let config = {
	daysInWeek: 6, //- the number of days in a week
	startingOffset: 3, //- K - offset of days used at the beginning of the program
	shelfLife: 2, //- N - number of weeks an item can be on the shelf before it is considered old
	newItemsPerWeek: 5, //- M - number of new items added each week
	weeksRuntime: 4, // - X - how many weeks the program will run for
	intervalSeconds: 1, // - R - how many seconds a simulated weeks lasts for
	zeroPaddedDigits: 3, // - the final length to reach after a number is 0 padded
	paddingCharacter: "*", // - the character used to pad a string
	paddedNameChars: 17, //- the final length to reach after the name of an item is padded
	paddedStateChars: 11, // - the final lenght to reach after the state of an item is padded
	minIntervalSec: 1, // - the lowest number of seconds an interval can assume
	maxIntervalSec: 5, // - the highest number of seconds (excluded) an interval can assume
	newColor: "PaleGreen", // - the color used to style the output if the state of an item is "New"
	validColor: "LightSkyBlue", // - the color used to style the output if the state of an item is "Valid"
	oldColor: "Moccasin", // - the color used to style the output if the state of an item is "Old"
	expiredColor: "LightPink", // - the color used to style the output if the state of an item is "Expired"
	fallbackColor: "LightSlateGrey", // - the color used to style the output if the item has no state
	locale: "en", // - the locale used for the date: https://www.venea.net/web/culture_code
	dayFormat: "2-digit", //- used to format the day ("2-digit", "numeric")
	monthFormat: "short", //- used to format the month ("long" "narrow" "numeric" "short")
	yearFormat: "numeric", //- used to format the year ("2-digit", "numeric")
};
```

---

## Files and project structure

```
Files structure
	scripts/
        config.mjs
        functions.mjs
        itemNames.mjs
        main.mjs
	styles/
		styles.css
	index.html
```

All of the files related to the logic of the program are inside the **scripts** folder.

Instead of putting all of the logic in a single file, the program has been split into multiple files with different purposes:

-   <code>main.mjs</code> is the starting point of the program. It invokes all of the functions that the program needs to operate.
-   <code>functions.mjs</code> is where all of the functions used to generate items, manipulate and print them to the console are written
-   <code>itemNames.mjs</code> as the name implies, contains an array that lists all of the possible names a supermarket item can have
-   <code>config.mjs</code> contains the configuration object

This has been achived using **modules**. You can refer to the official modules documentation at the following link: [https://v8.dev/features/modules#mjs](#https://v8.dev/features/modules#mjs).

To include a script that functions as a module, we have to add <code>type="module"</code> to the script tag in the html, like so:

```HTML
<script type="module" src="./scripts/main.mjs"></script>
```

To import from another file we use the **import** statement:

```JavaScript
import { config as cnf } from "./config.mjs";
import * as fn from "./functions.mjs";
import { itemNames } from "./itemsNames.mjs";
```

Of course, to import something we must first **export** it.

<code>./config.mjs</code>

```JavaScript
export let config = {...}
```

<code>./functions.mjs</code>

```JavaScript
export let function = (...params) => {...}
```

<code>./itemsNames.mjs</code>

```JavaScript
export let itemNames = [...]
```

---

## Features delivered

-   ### Feature 1: Expired items are removed from the items list.
    -   This is implemented with the help of the function checkItem() and JavaScript's built in Array method [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter). The functions are invoked in the main.mjs file on the line
    ```javascript
    items = items.filter(fn.checkItem);
    ```
-   ### Feature 2: Items that have been on the shelf for more than N weeks are removed

    -   Implemented the same way feature 1 is implemented, difference being that the user has to set the shelf life of the items in the config.mjs file.

-   ### Feature 3: Each week M new products arrive

    -   Done by using the function generateItems() in the main.mjs file. In the config.mjs file the user can set how many randomly generated items per week they wish to have.

-   ### Feature 4: The program starts from the current date plus startingOffset days and runs for weeksRuntime weeks

    -   To clarify: The runtime of the program in real time seconds is determined by the second parameter of the setInterval() function in the main.mjs, multiplied by the value of weeksRuntime property of the config object in config.mjs. All of the properties of the config object that mention the word "day(s)","week(s)" are simply what helps us simulate the passage of days and weeks in the program, also with the aid of Date objects. This particular feature is implemented with the following lines of code in the main.mjs file.

    ```javascript
    let startDate = new Date();
    let currentDate = fn.addDays(startDate, cnf.startingOffset);
    ```

    and

    ```javascript
    let runtime = cnf.weeksRuntime;
    ...
    runtime--;
    if (runtime <= 0) {
    	clearInterval(id);
    }
    ```

    As you can see, the function addDays() is used as well, and it can be found in the functions.mjs file.

-   ### Feature 5: Each weekly list is printed after a certain number seconds

    -   To understand better how this is implemented check out the feature 4, and also the [Bonus 1](#bonus-1) section. The fundamental pieces of the main.mjs are:

    ```javascript
    let interval = Math.floor(Math.random() * (cnf.maxIntervalSec - cnf.minIntervalSec + 1) + cnf.minIntervalSec);
    ...
    let id = setInterval(() => {
    	...
    	fn.printItems(items, cnf);
    	...
    }, interval * 1000);
    ```

    This requires a good understanding of the JavaScript built in method [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) and our function printItems() found in the functions.mjs file.

-   ### Feature 6: N,M,K,X,R should be configurable by the supermarket manager and should have meaningful variable names

    -   As indicated in the [configuration](#configuration-and-technical-characteristics) section of this file, the configurable parameters have been suitably renamed for ease of use and have been added to a config object that gets then imported in the <code>main.mjs</code> file.

    ```javascript
    import { config as cnf } from "./config.mjs";
    ```

    These configuration parameters can then be called with the <code>cnf.</code> prefix.

---

## Bonuses delivered

### Bonus 1

-   make the duration R a random number between MIN and MAX
-   MIN and MAX should be configurable settings in the config object

This has been achieved by adding two configuration parameters in the config object (**minIntervalSec** and **maxIntervalSec**) and using the following formula:

```
floor(random_number * (max - min + 1) + min)
```

where random_number is between 0 and 1, with 1 excluded.

This allows us to generate a number between min and max, extremes both included (thanks to the added +1), as opposed to the standard behavior when generating a random number which would result in a random number between 1 and max, with max excluded.

To better understand this behavior, you can read a more thourough explaination [here](https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range).

### Bonus 2

-   use colors in the console log output

To add colors to a console log output, we simply define a string variable that contains any css rules we may want to apply, like so:

```javascript
let style = "color: white;";
```

To then apply this style, we simply concatenate <code>%c</code> before the string we want to style, and then pass the style as an argument to the console log

```javascript
console.log(%c + text, style);
```

### Bonus 3

-   accept a user defined date format in the config object
-   format the dates accordingly
-   don't use moment.js

To let the user define the way the date is formatted, we added four new configuration parameters to the config object:

1. locale
1. dayFormat
1. monthFormat
1. yearFormat

as described [here](#configuration-and-technical-characteristics). To apply these parameters, we pass them as an argument whenever the <code>formatDate()</code> function is invoked.

---

## Browser compatibility

-   Chrome v100.0.4896.60: tested and fully compatible
-   FireFox v98.0.2: tested and fully compatible
-   Edge v99.0.1150.55: tested and fully compatible
-   Safari 2.1.13: tested and fully compatible
-   Opera : not tested
-   InternetExplorer v11 and back - not functional

---

## External resources

[https://developer.mozilla.org/en-US/](https://developer.mozilla.org/en-US/)

[https://www.w3schools.com/](https://www.w3schools.com/)

[https://www.venea.net/web/culture_code](https://www.venea.net/web/culture_code)

---

## License and contact information

[nemanja.gajicic@edu.itspiemonte.it](nemanja.gajicic@edu.itspiemonte.it)

[pietro.milanese@edu.itspiemonte.it](pietro.milanese@edu.itspiemonte.it)

[jacopo.trompeo@edu.itspiemonte.it](jacopo.trompeo@edu.itspiemonte.it)

[davide.murroni@edu.itspiemonte.it](davide.murroni@edu.itspiemonte.it)

[License](/LICENSE)

---

## Authors

Nemanja Gajicic, Pietro Milanese, Jacopo Trompeo, Davide Murroni

---

[Back to top.](#expiry-list-javascript-program)
