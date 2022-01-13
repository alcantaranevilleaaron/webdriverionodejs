@setup
Feature: Bottomline Section

    # Scenario Outline: Validate bottomline section table header <header>
    #     Given I am on the profits tab
    #     When I navigate to bottomline section
    #     Then the header for column "<index>" should be "<header>"

    #     Examples:
    #         | index | header                    |
    #         | 0     | Shipping method           |
    #         | 1     | Turns per year            |
    #         | 2     | Landed cost               |
    #         | 3     | Product gross profit      |
    #         | 4     | Product gross profit %    |
    #         | 5     | Breakeven selling price   |
    #         | 6     | ROI %                     |
    #         | 7     | Annualized gross profit   |
    #         | 8     | Annualized ROI %          |

    # Scenario Outline: Shipping method <method> should have their own row
    #     Given I am on the profits tab
    #     When I navigate to bottomline section
    #     Then the shipping method row "<index>" should be "<method>"

    #     Examples:
    #         | index | method                        |        
    #         | 0     | Air to Amazon                 |
    #         | 1     | Ocean FCL direct to Amazon    |
    #         | 2     | Ocean FCL to Amazon via 3PL   |
    #         | 3     | Ocean LCL direct to Amazon    |
    #         | 4     | Ocean LCL to Amazon via 3PL   |

    Scenario Outline: Shipping method <method> in bottomline section should have a selected badge
        Given I am on the profits tab
        When I enter the "0" as monthly sales velocity
        And I expand Shipping Costs section
        And I select "<method>" ship by method
        Then shipping method "<method>" should have a "Selected" badge
        
        Examples:
            | method                        |
            | Air to Amazon                 |
            | Ocean FCL direct to Amazon    |
            | Ocean FCL to Amazon via 3PL   |
            | Ocean LCL direct to Amazon    |
            | Ocean LCL to Amazon via 3PL   |



