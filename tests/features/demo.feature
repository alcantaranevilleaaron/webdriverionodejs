Feature: Profits Automation Demo

    @done
    Scenario: Your Strategy Section of Profits Calculator
        Given I am on Your Strategy Section of a new product
        When I click PROFITS button
        And I switch to profits tab
        Then the product price should be same as Amazon Product Page price
        Then the production ends in should be next month
        Then the target TACOS should be "10"
        And I enter the "100" as monthly sales velocity
        And I select "2" weeks as production lead time
        Then the product per order should be as expected

    @auto
    Scenario: Shipping & Packaging Section of Profits Calculator
        Given I am on Your Strategy Section of a new product
        When I click PROFITS button
        And I switch to profits tab
        And I enter the "100" as monthly sales velocity
        And I select "4" weeks as production lead time
        Then the product per order should be as expected
        And  I click shipping and packaging section
        Then the Carton Boxes Size should be as expected
        And I select "cm" as units in carton size
        Then the Carton Size should be as expected
        Then the product boxes per carton should be as expected
        And I select "kg" as weight in carton actual weight
        Then the Carton actual weight should be as expected
        Then the cartons in order should be as expected



