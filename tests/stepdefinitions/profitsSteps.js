/*
Import classes from newly created page object files.
Import the required keywords from Cucumber.
Use Page Object classes and methods to interact with the UI elements.
Use WebDriverIO commands to perform action the UI elements.
Use expect() to perform the necessary validations.
*/
const { Given, When, Then } = require('@cucumber/cucumber');
const AmazonPage = require('../pages/amazon.page');
const ProfitsPage = require('../pages/profits.page');
const ReferralPrefix = "Referral fee: ";


Given ('I am on the profits tab', async function (){
    var productPrice = await ProfitsPage.prodPriceTextBox;
    var elemDisplayed = await productPrice.isDisplayed();
    if (!elemDisplayed) {
        console.log("switch Tabs");
        await browser.switchWindow('DataDive PROFITS');
    }
});


When('I set the product price to {string}', async function (strValue) {
    await ProfitsPage.setPrice(strValue);
});


When('I expand Product Design section', async function () {
    console.log("Expanding Product Design section");
    await ProfitsPage.expandProductDesign();
    console.log("Expanded Product Design section");
});


When('I expand Order PL section', async function () {
    console.log("Expanding Order P&L section");
    await ProfitsPage.expandOrderPL();
    console.log("Expanded Order P&L section");
});


When('I expand Shipping Costs section', async function () {
    console.log("Expanding Shipping Costs section");
    await ProfitsPage.expandShippingCost();
    console.log("Expanded Shipping Costs section");
});


When('I select {string} product category', async function (strValue) {
    console.log("Going to select product category");
    await ProfitsPage.categoryDropdown.selectByVisibleText(strValue);
    await ProfitsPage.salesCommDesc.waitForDisplayed({ timeout: 3000 });
    console.log("Selected product category");
});

When('I select {string} ship by method', async function (shippingMethod) {
    // console.log("Going to select a ship by method");
    // await ProfitsPage.shipBy.scrollIntoView();
    // await ProfitsPage.shipBy.selectByVisibleText(strValue);
    // console.log("Selected ship by method");
    await ProfitsPage.selectShippingMethod(shippingMethod);
});


Then('the sales commission description will be {string}', async function (strValue) {
    var commisionDesc = await ProfitsPage.salesCommDesc;
    await expect(commisionDesc).toHaveText(ReferralPrefix + strValue);
});


Then('the referral per product is {string}', async function (strValue) {
    var referral = await ProfitsPage.referralPerProduct;
    await expect(referral).toHaveText(strValue);
});

// the following values are displayed
