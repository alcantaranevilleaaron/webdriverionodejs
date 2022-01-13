/*
Import classes from newly created page object files.
Import the required keywords from Cucumber.
Use Page Object classes and methods to interact with the UI elements.
Use WebDriverIO commands to perform action the UI elements.
Use expect() to perform the necessary validations.
*/
const { Given, When, Then } = require('@cucumber/cucumber');
const AmazonPage = require('../pages/amazon.page');
const BottomLinePage = require('../pages/bottomline.page');
const ProfitsPage = require('../pages/profits.page');


When('I navigate to bottomline section', async function () {
    // dummy step
});


Then('the header for column {string} should be {string}', async function (strColumn, strHeader) {
    var bottomLineHeaders = await BottomLinePage.bottomlineTableHeaders;
    var columnIndex = parseInt(strColumn);
    await expect(bottomLineHeaders[columnIndex]).toHaveText(strHeader);
});


Then('the shipping method row {string} should be {string}', async function (strRow, strHeader) {
    var shipByValues = await BottomLinePage.shippingMethods;
    var columnIndex = parseInt(strRow);
    await expect(shipByValues[columnIndex]).toHaveText(strHeader);
});


Then('shipping method {string} should have a {string} badge', async function (strShipMethod, strSelect) {
    var selectedShipMethod = await $('#bottom_line_table').$('span=' + strShipMethod);
    var selectedElem = await selectedShipMethod.$(function () { return this.nextSibling }) ;
    await expect(selectedElem).toHaveText(strSelect);
});


// the following values are displayed
