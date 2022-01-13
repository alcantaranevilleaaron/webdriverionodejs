/*
Create and export a module with class "ProfitsPage".
This class behaves as a Child class, which contains the selectors of Login page UI elements required for the test automation scenarios.
This module can be imported and called from Step Definitions to access the UI elements.
*/
const BasePage = require('./base.page')
class ProfitsPage extends BasePage {

    /**
    * define elements
    */

    // Your Strategy Section
    get msvTextBox () { return $('#your_strategy_monthly_sales_velocity') }
    get pltDropdown () { return $('#your_strategy_production_lead_time_weeks')}
    get prodPriceTextBox() { return $('#your_strategy_product_price') }
    get ppoTextBox () { return $('#your_strategy_products_per_order') }
    get stkForTextBox () { return $('#budget_required_to_launch_stocking_for_weeks') }
    get prodEndsInDropdown () { return $('#your_strategy_production_end_month') }
    get targetTACOSTextBox () { return $('#your_strategy_target_tacos_percentage') }
    get pbcTextBox () { return $('#shipping_and_packaging_products_per_carton') }
    
    // product design section
    get productBoxLength () { return $('#product_design_product_box_size_length') }
    get productBoxWidth  () { return $('#product_design_product_box_size_width') }
    get productBoxHeight  () { return $('#product_design_product_box_size_height') }
    get productBoxWeight  () { return $('#product_design_product_box_weight') }

    // Shipping & Packaging Section
    // get shipPackSection  () { return $('#react-collapsed-toggle-3') }
    get shipPackSection  () { return $('//span[contains(text(),"Shipping & Packaging")]') }
    // get shipPackSection  () { return $('span#react-collapsed-toggle-3.d-print-none') }
    get cartonBoxesTextBox () { return $('#shipping_and_packaging_carton_size_in_boxes') }
    get cartonSizeTextBox () { return $('#shipping_and_packaging_carton_size') }
    get cartonUnitsDropdown () { return $('#shipping_and_packaging_carton_size_unit') }
    get productBoxesPerCarton () { return $('#shipping_and_packaging_products_per_carton') }
    get cartonActualWeight () { return $('#shipping_and_packaging_carton_weight') }
    get cartonActualWeightUnitsDropdown () { return $('#shipping_and_packaging_carton_weight_unit') }
    get cartonsInOrder () { return $('#shipping_and_packaging_cartons_in_order') }

    // get cartonCalculatorLink() { return $('*=Carton Calculator') }
    // get cartonCalculatorLink() { return $('//a[contains(text(),"Carton Calculator")]') }
    get cartonCalculatorLink() { return $('a.btn.btn-light.bg-white.d-print-none') }

    // carton calculator Section
    // get cartonBoxLength () { return $('//*[contains(@id,"react-collapsed-panel-")][1]/div/div/div/div[1]/div[1]/div/input[1]')}
    get cartonBoxLength () { return $('#carton_dimensions_carton_size_in_boxes_length')}
    get cartonBoxWidth () { return $('#carton_dimensions_carton_size_in_boxes_width')}
    get cartonBoxHeight () { return $('#carton_dimensions_carton_size_in_boxes_height')}


    // Additional Carton Information

    // Advanced Carton Settings
    get cartonPaddingLength () { return $('#advanced_carton_settings_carton_padding_length')}
    get cartonPaddingWidth () { return $('#advanced_carton_settings_carton_padding_width')}
    get cartonPaddingHeight () { return $('#advanced_carton_settings_carton_padding_height')}
    // common elements
    // get closeBtn () { return $('button.btn-close') }

    //Shipping Costs Section
    get shipOrderVolume () { return $('#shipping_costs_order_volume') } 
    get shipBy () { return $('#shipping_costs_selected_shipping_method') }
    get shipByValues () { return $$('#shipping_costs_selected_shipping_method option') }

    // Section Headers
    get productDesignHeader () { return $('#react-collapsed-toggle-2') }
    get shippingCostsHeader () { return $('#react-collapsed-toggle-4') }
    get orderPLHeader () { return $('#react-collapsed-toggle-5') }

    get sizeTier () { return $('#product_design_product_size_tier') }
    get categoryDropdown () { return $('#product_design_product_category')}
    get salesCommDesc () { return $('#product_design_product_category_sales_commission_rule_description')}

    get referralPerProduct () { return $('#cost_structure_referral_fee_per_product')}

    /**
     * define or overwrite page methods
     */    

    setPrice (price) {
        this.prodPriceTextBox.clearValue();
        this.prodPriceTextBox.setValue(price);
        browser.pause(1000);
    }

    async expandProductDesign () {
        let elem = await this.categoryDropdown;
        let elemDisplayed = await elem.isDisplayed();
        if (!elemDisplayed) {
            await this.productDesignHeader.click();
            await elem.waitForDisplayed({ timeout: 3000 });
        }
    }

    async expandShippingCost () {
        let elem = await this.shipOrderVolume;
        let elemDisplayed = await elem.isDisplayed();
        if (!elemDisplayed) {
            await this.shippingCostsHeader.click();
            await elem.waitForDisplayed({ timeout: 3000 });
            await elem.scrollIntoView();
        }
    }

    async expandOrderPL () {
        let elem = await this.referralPerProduct;
        let elemDisplayed = await elem.isDisplayed();
        if (!elemDisplayed) {
            await this.orderPLHeader.click();
            await elem.waitForDisplayed({ timeout: 3000 });
        }
    }

    getCommissionDesc () {
        console.log(this.salesCommDesc.getHTML(false));
        return this.salesCommDesc.getText();
    }

    async selectShippingMethod (method) {
        await this.shipBy.scrollIntoView();
        await this.shipBy.selectByVisibleText(method);
        console.log("Selected ship by method: " );
    }

}
module.exports = new ProfitsPage();
