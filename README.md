# Market

A project to manage the products of a supermarket inventory with a setting panel to manage preferences. The program was entirely developed in Javascript, HTML and CSS.

## Files Structure

``` MD
.
├── jsdoc
|
├── public
|       ├── img
|             └── logo-market-inventory-system.jpg
│       └── main.budle.js
│       └── index.html
│       └──main.min.css
|     
├── src
│     ├── img
|     |     └── logo-market-inventory-system.jpg
│     ├── scripts
│     │      └── config.js
│     │      └── functions.js
│     │      └── intemNames.js
│     │      └── main.js
│     │      └── validator.js
|     ├── styles
|     |       └── reset.css
|     |       └── style.css
|     |  
|     └── index.html
|
├── package.json
├── LICENSE
├── readme.md
├── webpack.config.js
.
```

---

## Usage

There are differnt ways to run the programm:

1. Open the programm from [index.html](index.html) file you find in the folder [src](./src) (by double clicking on it).
2. If u have Node.js you can open the file from your CLI by running these scripts: 

``` JS
  "scripts": {
    "watch": "npx webpack --watch",
    "start": "npx webpack-dev-server --open",
    "build": "npx webpack"
  },
```

In the project directory open terminal and digit "npm run build" to build the programm and "npm start" to run the program on a server

## Project Description

---
_short excursus_

The program was designed to start with default values. We made this decision to help the user having a better experience instead of show him an empty white page. In the following steps you will be informed about every default value setted.

---

### Requirements

- expired items should be removed
- items that have been on the shelf for more than **N** weeks should be removed
- each week **M** new products arrive
- the page should have a complete HTML structure and CSS styling
- each week view should have navigation buttons, 'next' and 'previous'
  - they change the view to the next or previous week
  - navigation buttons should be hidden or disabled when not required
- each item's status should have a unique visual style

### Settings

- the website should have a settings panel
- the panel should be animated via CSS or Javascript
- all your specific configuration options should be available in the settings panel
- the settings panel should have a 'save' button
- when the user saves the settings
- the panel should close
- the page information should be updated to reflect the changed settings
- numeric inputs in the settings panel should only accept numbers
- it should be possible to increment numbers from the input UI
- date inputs should be checked for validity
  - define acceptable date formats and check with regular expressions
  - if a date is not valid an error message should be shown below the input
  - alternatively the 'save' button can be disabled if any input is not valid

### Item Structure

- Every Item has:
  - A _unique ID_ generated starting from 1 and incremented by 1 for each product with the function uniqueId() in the functions.js file.
  - A _name_ picked randomly from an array of strings in itemsNames.js
  - An _expiration date_ generated randomly between two dates in the function generateExpiry() in functions.js
  - A _state_ starting from 0 and incrmented every week the item stays on the shelf :

    - **New** - the item has arrived this week and is not expired
    - **Valid** - the item is not expired and has been on the shelf for LESS than N weeks
    - **Old** - the item is not expired, but has been on the shelf for MORE than N weeks
    - **Expired** - the item has expired (the date is older than the current week date)

  - A number of _checks_ starting from 0 and incrmented every week the item stays on the shelf

---

## Feature delivered

In this section you can find the documentation about the feature delivered in accordance with the requirements and the project description.

---

### Feature 1: Expired Items are removed from the the list
  
- This is implemented with the help of the function checkItem() and JavaScript's built in Array method [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter). The functions are invoked in the main.js file on the line

    ```javascript
    items = items.filter(fn.checkItem);
    ```

### Feature 2: Items that have been on the shelf for more than N weeks are removed

- Implemented the same way feature 1 is, the shelflife of the products is setted at 3 weeks, after that the product will have a state of "old".

### Feature 3: Each week M new products arrive

- Done by using the function generateItems() in the main.js file. The user can set the number of items to generate every week from the setting panel in the main page. Default value is set at 5. Maximum number of product per week is set at 20.

### Feature 4: Each week view should have navigation buttons, 'next' and 'previous'

- Buttons are generated from Javascript in function printContent() in functions.js, each weeks button refers to a specific week through an id that identifies a single week, the quantity of ids is setted by the number of weeks. The ids are generated in descending order.

1. ### They change the view to the next or previous week

- Clicking on button starts a javascript event that add a class d-none that in CSS will accomplish the propriety <code>display:none</code> removing the current section view; after it will remove the next/previuos (based on the pressed button) section the same class to show elements.

``` Js

  buttonNext.onclick = function() {
  let nextSection = document.getElementById(sectionId - 1);

  sectionContent.classList.add("d-none");
  nextSection.classList.remove("d-none")
 }

```

2. ### Navigation buttons should be hidden or disabled when not required

The same event will check the section id, if the id is identic to the weeks runtime the previous button will be hidden adding a class "v-hidden" that in CSS will accomplish a <code>visibility: hidden</code> propriety. Same for the next button, the class will be add when the section id will be identical to 1.

### Feature 5: Each item's status should have a unique visual style

- Implemented with a switch instruction in functions.js in the createTable function that adds a class based on the value of the state, in CSS every class refers to a different background color property.

Quick example

```js
  switch(item.state) {
   case "New":
    tableRowItem.classList.add("green");
     break;
    case "Valid":
     tableRowItem.classList.add("yellow");
     break;
```

### Setting Panel Features

In this project a setting panel was required.
We implemented the creation using an HTML form.

N.B: We used a form even if we don't need to send any data to a back-end, the reason of our choice is the flexibility, meaning that if in the future a back-end will be required the code doesn' t need to be written from scratch. ?????

1. ### Panel UX/UI

- The UI of the panel is minimalistic.
- For the usage the user just need to click on the setting gear icon on the bottom of the page. When the panel is open, if the user doesn' t want to use it can close it clicking on the "X".
- Each input has a placeholder inserted from placeholder HTML attribute to help user not to insert wrong inputs.
- If inputs are not correct the input field will color of red.
- The save button is disabled if inputs are empty or not correct.

We picked these decision with the aim of ensuring the best UX.
Keep reading for more detailed information...

2. ### Panel UX/UI technicalities

The setting panel will open and close when the user interacts with it.This has been implement via Javascript and CSS,
by setting a <code>display: none</code> to the panel HTML element container, so when the user click on the setting gear starts a Javascript event that modify the class of the container, substituting the <code>display:none</code> with a <code>display: flex</code> rule.
The mechanism to close the panel is the same but backwards. User also can close the panel clicking on the save button. After compiling all the inputs correctly.
You can check this feature in the onpeCloseMenu() function in functions.mjs file.


 ### Panel Validation

- To grant a correct execution of the programm, we did the input validation with Javascript using functions that checks every input by:
a.  the character inserted (es. only number)
b.  the min & max number of character accepted  

We also disabled:

a. the inputs autocomplete

b. the psste into inputs field

1. ### Panel Validation Technicalities
  
Every input is targeted in Javascript by HTML id attribute. and stored in an array. Than the programm executes 2 forEach() on every input to disable the autocomplete and the paste, and for the type date inputs will executes a forEach that will allow the user to digit in the input | number | backspace | tab | arrows | and slash. For all other inputs executes a forEach that allows the digit | number | backspace | tab | arrows | and minus for negative numbers. You can check this process in the main.mjs file.

CheckStartDate() check that the inputs respect the parameter of the setting panel, for each input is setted a class "error-input" till the input is not correct.
Will check the input via a regular expression,

``` JS
    let regexInputStartDate = new RegExp("(0[1-9]|1[0-2])/(0[1-9]|[1-3][0-9])/[1-9][0-9]{3}");
```

also check the maxlenght of the input setted at 10 character.
If input matches all these parameters, is invoked the totalCheck() function that will check if every input has the class
"valid-input" and if the input inserted is the last and all the inputs have the class of valid abilitate the button "save".

For all other inputs the function checkOtherInputs will check that the numeric value is in a range of min and max value.

Finally, the function totalCheck() check that all inputs have "valid-input" class, if so, abilitate the save button, else disable it.

## HTML & CSS Feature

The Project, as required, has a complete HTML5 page and a CSS sylesheet. 

_HTML_  of this page is really symple. Is composed by an heading with the main title <h1> and our logo. (the logo is original and we own the copyright on it).

In the main section we have a form that cointains all our setting panel elements. Every input has a placeholder to help user in input compilation.

After this we have the section:

``` HTML
    <section id="content"></section>
```

In this section will be generated from Javascript all the tables and the elements.

_CSS_ 

For our style we decided to use a reset.css file because we wanted to have the control on every element. Read more about [reset.css](https://meyerweb.com/eric/tools/css/reset/)

Our stylesheet is fully commented and separated logically for every element of the page.

We used the boorstraps media query sizes cause we analized them and we decided that were perfect for our purpose.

---

## Browser Compatibility

The project has been tested on every browser and it is compatible with these versions and also with older ones:

- Microsoft Edge v.80
- Firefox v.74
- Chrome v.80
- Safari v.13

## File Validation

All files have been validated:

- HTML files [HTML Validator](https://validator.w3.org/)
- CSS files [CSS Validator](https://jigsaw.w3.org/css-validator/)
- Javascript files [Javascript validator](https://beautifytools.com/javascript-validator.php)
- Json files [Json Validator](https://jsonmatter.curiousconcept.com/)

---

## License and contact information

[cristiano.finotto@edu.itspiemonte.it](cristiano.finotto@edu.itspiemonte.it)

[paolo.gippa@edu.itspiemonte.it](paolo.gippa@edu.itspiemonte.it)

[davide.murroni@edu.itspiemonte.it](davide.murroni@edu.itspiemonte.it)

[simone.sporeni@edu.itspiemonte.it](simone.sporeni@edu.itspiemonte.it)

[License](/LICENSE)

---

## Authors

- Cristiano Finotto
- Paolo Gippa
- Davide Murroni
- Simone Sporeni

## Changelog and version history

To clone the project repository digit on your CLI:
git clone https://github.com/CristianoFFinotto/js-project-05-market.git
token key: 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

For any issue, try:
git clone https://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@github.com/CristianoFFinotto/js-project-05-market.git

---

[Back to top.](#Market)
