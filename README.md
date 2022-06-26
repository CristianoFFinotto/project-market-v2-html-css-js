# Market

A project to manage the products of a supermarket inventory with a setting panel to manage preferences. The program was entirely developed in Javascript, HTML and CSS.

## Files Structure

``` MD
.
├── dist
|     ├── index.html
│     └── main.budle.js  
├── src
│     ├── img
│     ├── scripts
│     │      └── config.mjs
│     │      └── functions.mjs
│     │      └── intemNames.mjs
│     │      └── main.mjs
│     │      └── validator.mjs
|     ├── styles
|     |       └── reset.css
|     |       └── style.css
|     |  
|     └── index.html
|
├── package.json
├── package-lock.json
├── readme.md
├── webpack.config.js
.
```

---

## Usage

Run the programm opening the [index.html](index.html) file you find in the main folder (by double clicking on it). The programm could be also run with a local server (ex VSCode live server extension). The setting panel has the main setting we considered fontamental, but if u really need to change your setting deeper, you can run this project on a text editor (suggested: VSCode), open the file [config.mjs](config.mjs) and change your settings.

Warning: modify the source code is not suggested

## Project Description

***

## Feature delivered

In this section you can find the documentation about the feature delivered in accordance with the requirements.

## General Features

_short excursus_

The program was designed to start with default values. We made this decision to help the user having a better experience instead of show him an empty white page. In the following steps you will be informed about every default value setted.

---

### Item Structure

- Every Item has:
  - A unique ID generated starting from 1 and incremented by 1 for each product with the function uniqueId() in the functions.mjs file.
  - A name picked randomly from an array of strings in itemsNames.mjs
  - An expiration date generated randomly between two dates in the function generateExpiry() in functions.mjs

  -  

### Feature 1: Expired Items are removed from the the list
  
- This is implemented with the help of the function checkItem() and JavaScript's built in Array method [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter). The functions are invoked in the main.mjs file on the line

    ```javascript
    items = items.filter(fn.checkItem);
    ```

### Feature 2: Items that have been on the shelf for more than N weeks are removed

- Implemented the same way feature 1 is, the shelflife of the products is setted at 3 weeks, after that the product will have a state of "old".

### Feature 3: Each week M new products arrive

- Done by using the function generateItems() in the main.mjs file. The user can set the number of items to generate every week from the setting panel in the main page. Default value is set at 5. Maximum number of product per week is set at 20.

### Each week view should have navigation buttons, 'next' and 'previous'

- Buttons are generated from Javascript in function printContent() in functions.mjs, each weeks button refers to a specific week through an id that identifies a single week, the quantity of ids is setted by the number of weeks. The ids are generated in descending order.

1. #### They change the view to the next or previous week

- Clicking on button starts a javascript event that add a class d-none that in CSS will accomplish the propriety <code>display:none</code> removing the current section view; after will remove the next/previuos (based on the pressed button) section the same class to show elements.

``` Js

  buttonNext.onclick = function() {
  let nextSection = document.getElementById(sectionId - 1);

  sectionContent.classList.add("d-none");
  nextSection.classList.remove("d-none")
 }

```

1. #### Navigation buttons should be hidden or disabled when not required

The same event will check the section id, if the id is identic to the weeks runtime the previous button will be hidden adding a class "v-hidden" that in CSS will accomplish a <code>visibility: hidden</code> propriety. Same for the next button, the class will be add when the section id will be identical to 1.

### Each item's status should have a unique visual style

- Implemented with a switch instruction in functions.mjs in the createTable function scope that adds a class based on the value of the state, in CSS every class refers to a different background color property.


### Setting Panel Features

In this project a setting panel was required.
We implemented the creation using an HTML form.

N.B: We used a form even if we don't need to send any data to a back-end, the reason of our choice is the flexibility, meaning that if in the future a back-end will be required the code doesn' t need to be written from scratch.

#### Panel UX/UI

* The UI of the panel is minimalistic.
* For the usage the user just need to click on the setting gear icon on the bottom of the page. When the panel is open, if the user doesn' t want to use it can close it clicking on the "X".
* Each input has a placeholder to help user not to insert wrong inputs.
* If inputs are not correct the input field will color of red.
* The save button is disabled if inputs are empty or not correct.

We picked these decision with the aim of ensuring the best UX.

#### Panel UX/UI technicalities

The setting panel will open and close when the user interacts with it.This has been implement via Javascript and CSS,
by setting a <code>display: none</code> to the panel HTML element container, so when the user click on the setting gear starts a Javascript event that modify the class of the container, substituting the <code>display:none</code> with a <code>display: flex</code> rule.
The mechanism to close the panel is the same. User also can close the panel clicking on the save button. After compiling all the inputs correctly.
You can check this feature in the functions.mjs file.

#### Panel Validation

* To grant a correct execution of the programm, we did the input validation with Javascript using functions that checks every input by:
a.  the character inserted (es. only number)
b.  the min & max number of character accepted  

We also disabled:

a. the inputs autocomplete
b. the psste into inputs field

1. ##### Panel Validation Technicalities
  
Every input is targeted in Javascript by HTML id attribute. and stored in an array. Than the programm executes 2 forEach() on every input to disable the autocomplete and the paste, and for the type date inputs will executes a forEach that will allow the user to digit in the input | number | backspace | tab | arrows | and slash. For all other inputs executes a forEach that allows the digit | number | backspace | tab | arrows | and minus for negative numbers. You can check this process in the main.mjs file.

Now, every input is checked via 2 functions:
checkStartDate() and checkOtherInputs (validator.mjs).

These functions check that the inputs respect the parameter of the setting panel, if not throught the "input" eve

# DA FINIRE la parte del setting panel

---



## Browser Compatibility

## File Validation 

All files have been validated:

- For HTML files [HTML Validator](https://validator.w3.org/)
- For CSS files [CSS Validator](https://jigsaw.w3.org/css-validator/)
- For Json files [Json Validator](https://jsonformatter.curiousconcept.com/)


## License and contact information

[cristiano.finotto@edu.itspiemonte.it](cristiano.finotto@edu.itspiemonte.it)

[paolo.gippa@edu.itspiemonte.it](paolo.gippa@edu.itspiemonte.it)

[davide.murroni@edu.itspiemonte.it](davide.murroni@edu.itspiemonte.it)

[simone.sporeni@edu.itspiemonte.it](simone.sporeni@edu.itspiemonte.it)


[License]()

---

## Authors

Nemanja Gajicic, Pietro Milanese, Jacopo Trompeo, Davide Murroni

---

[Back to top.](#expiry-list-javascript-program)