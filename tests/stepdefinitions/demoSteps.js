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
var amzProdPrice, intMsvValue, inStkValue, ppo;
var cartLength , cartWidth , cartHeight ;
var prodLength , prodWidth , prodHeight, prodBoxPerCarton ;
var cartPaddingLength , cartPaddingWidth , cartPaddingHeight ;
var finalCartLength , finalCartWidth , finalCartHeight ;

Given('I am on Your Strategy Section of a new product', async function () {
    AmazonPage.open();
    // await browser.pause(60000);
});

When('I click PROFITS button', async function () {
    amzProdPrice = await AmazonPage.amzProdPriceText.getText();
    console.log(amzProdPrice);
    amzProdPrice = amzProdPrice.replace('$','');
    console.log("Clicking PROFITS");
    await AmazonPage.profitButton.click();
    console.log("Clicked PROFITS");
});

Then ('I switch to profits tab', async function (){
    await browser.pause(2000);
    console.log("switch Tabs");
    await browser.switchWindow('DataDive PROFITS');
});

Then('the product price should be same as Amazon Product Page price', async function() {
    await expect(ProfitsPage.prodPriceTextBox).toHaveValue(amzProdPrice);
});

Then('the production ends in should be next month', async function() {
    console.log("Checking date");
    var Current = new Date();
    Current.setMonth(Current.getMonth()+1);
    console.log(Current);
    var options = { month: 'long', year: 'numeric' };
    var expDate = Current.toLocaleDateString("en-US", options);
    console.log(expDate);
    await expect(ProfitsPage.prodEndsInDropdown).toHaveValue(expDate);
});

Then('the target TACOS should be {string}', async function(value) {
    console.log("Checking Tacos");
    await expect(ProfitsPage.targetTACOSTextBox).toHaveValue(value);
});

When('I enter the {string} as monthly sales velocity', async function (strValue) {
    intMsvValue = parseInt(strValue);
    console.log(intMsvValue);
    console.log("going to input values");
    await ProfitsPage.msvTextBox.clearValue();
    // await browser.pause(10000);
    console.log(await ProfitsPage.msvTextBox.getValue());
    console.log("clearing");
    await ProfitsPage.msvTextBox.setValue(intMsvValue);
    await ProfitsPage.msvTextBox.click();
    console.log("entered value");
});

When('I select {string} weeks as production lead time', async function (strValue) {
    console.log(strValue);
    console.log("going to select plt values");
    console.log(await ProfitsPage.pltDropdown.getValue());
    await ProfitsPage.pltDropdown.selectByAttribute('value',strValue);
    await ProfitsPage.pltDropdown.click();
    console.log("entered plt value");
    await browser.pause(10000);
});

Then('the product per order should be as expected', async function () {
    console.log("going to get carton");
    var carton = await ProfitsPage.pbcTextBox.getHTML(false);
    console.log(carton);
    console.log("going to get stkfor");
    var stkFor = await ProfitsPage.stkForTextBox.getHTML(false);
    console.log(stkFor);
    var splitStkfor = stkFor.split(" ");
    console.log(splitStkfor);
    inStkValue = parseInt(splitStkfor[0]);
    console.log("msv: %d; stk: %d ", intMsvValue,inStkValue);
    ppo = Math.ceil((intMsvValue/30)*7*inStkValue/carton)*carton;
    console.log(ppo);
    await browser.pause(10000);
    console.log("going to check");
    await expect(ProfitsPage.ppoTextBox).toHaveTextContaining(ppo+' pcs/order');
    console.log("check successfull");
});

When('I click shipping and packaging section', async function () {
    console.log("Clicking Shipping and Packaging section");
    await ProfitsPage.shipPackSection.scrollIntoView();
    console.log("finished scrolling");
    await browser.pause(5000);
    console.log(await ProfitsPage.shipPackSection.getHTML());
    await browser.execute(()=> {
        document.getElementById("react-collapsed-toggle-3").click();
    })
    console.log("Clicked shipping and Packaging section");
    await browser.pause(5000);
    console.log(await ProfitsPage.shipPackSection.getHTML());
});

Then('the Carton Boxes Size should be as expected', async function() {
    console.log("geting cart length,width and height");
    await browser.execute(()=> {
        var ele = Array.from(document.querySelectorAll("a.btn.btn-light.bg-white")).find(x => x.innerText.includes("Carton Calculator"))
        ele.click()
    })
    cartLength = await ProfitsPage.cartonBoxLength.getValue();
    cartWidth = await ProfitsPage.cartonBoxWidth.getValue();
    cartHeight = await ProfitsPage.cartonBoxHeight.getValue();
    console.log(cartLength,cartWidth,cartHeight);
    cartPaddingLength = await ProfitsPage.cartonPaddingLength.getValue();
    cartPaddingWidth = await ProfitsPage.cartonPaddingWidth.getValue();
    cartPaddingHeight = await ProfitsPage.cartonPaddingHeight.getValue();
    cartPaddingLength = parseInt(cartPaddingLength);
    cartPaddingWidth = parseInt(cartPaddingWidth);
    cartPaddingHeight = parseInt(cartPaddingHeight);
    console.log(cartPaddingLength,cartPaddingWidth,cartPaddingHeight);
    await browser.execute(()=> {
        document.getElementsByClassName("btn-close")[0].click();
    })
    var cartonBoxSize = cartLength + " × " + cartWidth + " × " + cartHeight + " product boxes";
    console.log(cartonBoxSize);
    var actualStr = await ProfitsPage.cartonBoxesTextBox.getHTML(false);
    await expect(actualStr).toEqual(cartonBoxSize);
    console.log("check success");
});

Then('the Carton Size should be as expected', async function() {
    await browser.pause(5000);
    console.log("geting product length, width and height");
    prodLength = await ProfitsPage.productBoxLength.getValue();
    prodWidth = await ProfitsPage.productBoxWidth.getValue();
    prodHeight = await ProfitsPage.productBoxHeight.getValue();
    console.log(prodLength,prodWidth,prodHeight);
    console.log("getting final cart")
    finalCartLength = (Math.ceil(prodLength*2.54*cartLength + cartPaddingLength)).toFixed(1);
    finalCartWidth = (Math.ceil(prodWidth*2.54*cartWidth + cartPaddingWidth)).toFixed(1);
    finalCartHeight = (Math.ceil(prodHeight*2.54*cartHeight + cartPaddingHeight)).toFixed(1);
    console.log(finalCartLength,finalCartWidth,finalCartHeight);
    var unit = await ProfitsPage.cartonUnitsDropdown.getValue();
    if (unit === "in") {
        console.log("inch is selected");
        finalCartLength = (Math.ceil(finalCartLength/2.54*10)/10).toFixed(1);
        finalCartWidth = (Math.ceil(finalCartWidth/2.54*10)/10).toFixed(1);
        finalCartHeight = (Math.ceil(finalCartHeight/2.54*10)/10).toFixed(1);
    }
    var finalCartSize = finalCartLength + " × " + finalCartWidth + " × " + finalCartHeight ;
    console.log(finalCartSize);
    var actualFinalCartonSizestr = await ProfitsPage.cartonSizeTextBox.getHTML(false);
    console.log("actual str ", actualFinalCartonSizestr);
    await expect(actualFinalCartonSizestr).toEqual(finalCartSize);
    console.log("check success");
});

When('I select {string} as units in carton size', async function (strValue) {
    await browser.pause(5000);
    console.log(strValue);
    console.log("going to select units");
    console.log(await ProfitsPage.cartonUnitsDropdown.getValue());
    await ProfitsPage.cartonUnitsDropdown.selectByAttribute('value',strValue);
    console.log("selected the value");
    await ProfitsPage.cartonUnitsDropdown.click();
    console.log("entered unit value");
    await browser.pause(10000);
});

Then('the product boxes per carton should be as expected', async function() {
    await browser.pause(5000);
    console.log("geting cart length,width and height");
    console.log(cartLength,cartWidth,cartHeight);
    prodBoxPerCarton = cartLength*cartWidth*cartHeight;
    console.log(prodBoxPerCarton);
    var prodBpc = await ProfitsPage.productBoxesPerCarton.getHTML(false);
    await expect(prodBpc).toEqual(""+prodBoxPerCarton);
    console.log("check product boxes per carton success");
});

Then('the Carton actual weight should be as expected', async function() {
    await browser.pause(5000);
    console.log("getting prod box weight");
    var productBoxWeight = await ProfitsPage.productBoxWeight.getValue();
    console.log(productBoxWeight);
    console.log("prod box per carton", prodBoxPerCarton);
    console.log("geting cartActWg");
    var cartActWg = productBoxWeight*prodBoxPerCarton+1;
    var unit = await ProfitsPage.cartonActualWeightUnitsDropdown.getValue();
    if (unit === "kg") {
        console.log("kg is selected");
        cartActWg = cartActWg * 0.45359237;
    }
    console.log(cartActWg);
    cartActWg = (Math.ceil(cartActWg*10)/10).toFixed(1);
    console.log(cartActWg);
    console.log("getting cartAW");
    var cartAW = await ProfitsPage.cartonActualWeight.getHTML(false);
    console.log(cartAW);
    await expect(cartAW).toEqual(""+cartActWg);
    console.log("check carton actual weight success");
});

When('I select {string} as weight in carton actual weight', async function (strValue) {
    await browser.pause(5000);
    console.log(strValue);
    console.log("going to select cartion actual units");
    console.log(await ProfitsPage.cartonActualWeightUnitsDropdown.getValue());
    await ProfitsPage.cartonActualWeightUnitsDropdown.selectByAttribute('value',strValue);
    console.log("selected the value");
    await ProfitsPage.cartonActualWeightUnitsDropdown.click();
    console.log("entered unit value");
    await browser.pause(10000);
});

When('the cartons in order should be as expected', async function () {
    await browser.pause(5000);
    console.log(ppo,prodBoxPerCarton);
    var expected = ppo / prodBoxPerCarton;
    console.log("getting cartons in order");
    var actual = await ProfitsPage.cartonsInOrder.getHTML(false);
    console.log(actual);
    await expect(actual).toEqual(""+expected);
    console.log("check success");
});

When('I click the close button in calculator', async function () {
    await ProfitsPage.closeBtn.click();
    console.log("Calculator closed");
});

