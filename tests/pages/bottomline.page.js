/*
Create and export a module with class "AmazonPage".
This class behaves as a Child class, which contains the selectors of Login page UI elements required for the test automation scenarios.
This module can be imported and called from Step Definitions to access the UI elements.
*/
const BasePage = require('./base.page')
class BottomLinePage extends BasePage {
   
    /**
    * define elements
    */

    get bottomlineTable () { return $('#bottom_line_table') }
    get bottomlineTableHeaders () { return $('#bottom_line_table').$$('th') }
    get shippingMethods () { return $('#bottom_line_table').$$('span[id$="_shipping_method"]') };

    /**
     * define or overwrite page methods
     */ 

}
module.exports = new BottomLinePage();