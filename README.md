# Market

A project to manage the products of a supermarket inventory with a setting panel to manage preferences. The program was entirely developed in Javascript, HTML and CSS.

## Project Structure







---

## Usage

Run the programm opening the [index.html](index.html) file you find in the main folder (by double clicking on it). The programm could be also run with a local server (ex VSCode live server extension). The setting panel has the main setting we considered fontamental, but if u really need to change your setting deeper, you can run this project on a text editor (suggested: VSCode), open the file [config.mjs](config.mjs) and change your settings.

Warning: same changes could break the programm!

## Project Description

***

## Feature delivered

In this section you can find the documentation about the feature delivered in accordance with the requirements.

## General Features

_short excursus_

The program was designed to start with default values. We made this decision to help the user having a better experience instead of show him an empty white page. In the following steps you will be informed about every default value setted.

- ### Expired Items are removed from the the list
  
- This is implemented with the help of the function checkItem() and JavaScript's built in Array method [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter). The functions are invoked in the main.mjs file on the line

    ```javascript
    items = items.filter(fn.checkItem);
    ```

- ### Feature 2: Items that have been on the shelf for more than N weeks are removed

- Implemented the same way feature 1 is, the shelflife of the products is setted at 2 weeks.

- ### Feature 3: Each week M new products arrive

- Done by using the function generateItems() in the main.mjs file. The user can set the number of items to generate every week from the setting panel in the main page. Default value is set at 5. Maximum number of product per week is set at 20.

---

## Browser Compatibility

