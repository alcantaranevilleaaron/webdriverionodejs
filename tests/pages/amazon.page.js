/*
Create and export a module with class "AmazonPage".
This class behaves as a Child class, which contains the selectors of Login page UI elements required for the test automation scenarios.
This module can be imported and called from Step Definitions to access the UI elements.
*/
const BasePage = require('./base.page')
class AmazonPage extends BasePage {
    get profitButton () { return $('button.profitability-button.primary') }
    get amzProdPriceText () { return $('#price_inside_buybox') }
    
    open() {
        super.open('https://www.amazon.com/dp/B07DVCGX7G')
    }

}
module.exports = new AmazonPage();