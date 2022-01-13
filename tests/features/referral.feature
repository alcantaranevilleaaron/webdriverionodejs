@setup
Feature: Referral Fee Feature
Description: The purpose of this feature is to test the referral fee per category

    Scenario Outline: Check commission description and calculate referral fee of an item based on <category> category
        Given I am on the profits tab
        When I set the product price to "10.00"
        And I expand Product Design section
        And I expand Order PL section
        And I select "<category>" product category
        Then the sales commission description will be "<description>"
        And the referral per product is "<fee>"

        Examples:
            | category                                                      | description                                                                       | fee       |
            | Amazon Device Accessories                                     | 45%, minimum $0.30.                                                               | $4.50/pc  |
            | Amazon Explore                                                | 30%, minimum $5.00.                                                               | $5.00/pc  |
            | Baby Products (excluding Baby Apparel)                        | 8% if price is up to $10, 15% otherwise, minimum $0.30.                           | $0.80/pc  |
            | Books (including Collectible Books)                           | 15%.                                                                              | $1.50/pc  |
            | Camera and Photo                                              | 8%, minimum $0.30.                                                                | $0.80/pc  |
            | Cell Phone Devices                                            | 8%, minimum $0.30.                                                                | $0.80/pc  |
            | Consumer Electronics                                          | 8%, minimum $0.30.                                                                | $0.80/pc  |
            | Electronics Accessories                                       | 15% for portion of price up to $100, 8% for portion above $100, minimum $0.30.    | $1.50/pc  |
            | Furniture (including outdoor furniture)                       | 15% for portion of price up to $200, 10% for portion above $200, minimum $0.30.   | $1.50/pc  |
            | Home & Garden                                                 | 15%, minimum $0.30.                                                               | $1.50/pc  |
            | Kitchen                                                       | 15%, minimum $0.30.                                                               | $1.50/pc  |
            | Full-Size Appliances                                          | 8%, minimum $0.30.                                                                | $0.80/pc  |
            | Compact Appliances (including parts and accessories)          | 15% for portion of price up to $300, 8% for portion above $300, minimum $0.30.    | $1.50/pc  |
            | Mattresses                                                    | 15%, minimum $0.30.                                                               | $1.50/pc  |
            | Music                                                         | 15%.                                                                              | $1.50/pc  |
            | Musical Instruments                                           | 15%, minimum $0.30.                                                               | $1.50/pc  |
            | Office Products                                               | 15%, minimum $0.30.                                                               | $1.50/pc  |
            | Outdoors                                                      | 15%, minimum $0.30.                                                               | $1.50/pc  |
            | Personal Computers                                            | 8%, minimum $0.30.                                                                | $0.80/pc  |
            | Pet Supplies (except veterinary diets)                        | 15%, minimum $0.30.                                                               | $1.50/pc  |
            | Pet Supplies (veterinary diets)                               | 22%, minimum $0.30.                                                               | $2.20/pc  |
            | Software & Computer/Video Games                               | 15%.                                                                              | $1.50/pc  |
            | Sports (excluding Sports Collectibles)                        | 15%, minimum $0.30.                                                               | $1.50/pc  |
            | Tools & Home Improvement (except base equipment power tools)  | 15%, minimum $0.30.                                                               | $1.50/pc  |
            | Tools & Home Improvement (base equipment power tools)         | 12%, minimum $0.30.                                                               | $1.20/pc  |
            | Toys & Games                                                  | 15%, minimum $0.30.                                                               | $1.50/pc  |
            | Video & DVD                                                   | 15%.                                                                              | $1.50/pc  |
            | Video Game Consoles                                           | 8%, minimum $0.30.                                                                | $0.80/pc  |
            | 3D Printed Products                                           | 12%, minimum $0.30.                                                               | $1.20/pc  |
            | Automotive & Powersports (except tires and wheel products)    | 12%, minimum $0.30.                                                               | $1.20/pc  |
            | Automotive & Powersports (tires and wheel products)           | 10%, minimum $0.30.                                                               | $1.00/pc  |
            | Beauty                                                        | 8% if price is up to $10, 15% otherwise, minimum $0.30.                           | $0.80/pc  |
            | Clothing & Accessories (including activewear)                 | 17%, minimum $0.30.                                                               | $1.70/pc  |
            # | Collectible Books                                             | 15%.                                                                              | $1.50/pc  | Not available in dropdown
            | Collectible Coins                                             | 15% for portion of price up to $250, 10% for portion above $250 up to $1000, 6% for portion above $1000, minimum $0.30.   | $1.50/pc  |
            | Entertainment Collectibles                                    | 20% for portion of price up to $100, 10% for portion above $100 up to $1000, 6% for portion above $1000.                  | $2.00/pc  |
            | Fine Art                                                      | 20% for portion of price up to $100, 15% for portion above $100 up to $1000, 10% for portion above $1000 up to $5000, 5% for portion above $5000.   | $2.00/pc  |
            | Gift Cards                                                    | 20%.                                                                              | $2.00/pc  |
            | Grocery & Gourmet Food                                        | 8% if price is up to $15, 15% otherwise.                                          | $0.80/pc  |
            | Health & Personal Care (including Personal Care Appliances)   | 8% if price is up to $10, 15% otherwise, minimum $0.30.                           | $0.80/pc  |
            | Industrial & Scientific (including Food Service and Janitorial & Sanitation)  | 12%, minimum $0.30.                                               | $1.20/pc  |
            | Jewelry                                                       | 20% for portion of price up to $250, 5% for portion above $250, minimum $0.30.    | $2.00/pc  |
            | Luggage & Travel Accessories                                  | 15%, minimum $0.30.                                                               | $1.50/pc  |
            | Shoes, Handbags & Sunglasses                                  | 15%, minimum $0.30.                                                               | $1.50/pc  |
            | Sports Collectibles                                           | 15% for portion of price up to $100, 10% for portion above $100 up to $1000, 6% for portion above $1000.                  | $1.50/pc  |
            | Watches                                                       | 16% for portion of price up to $1500, 3% for portion above $1500, minimum $0.30.                                          | $1.60/pc  |

    Scenario Outline: Calculate maximum referral fee of an item based on <category> category
        Given I am on the profits tab
        When I set the product price to "10000.00"
        And I expand Product Design section
        And I expand Order PL section
        And I select "<category>" product category
        Then the referral per product is "<fee>"

        Examples:
            | category                                                      | fee             |
            | Baby Products (excluding Baby Apparel)                        | $1,500.00/pc    |
            | Electronics Accessories                                       | $807.00/pc      |
            | Furniture (including outdoor furniture)                       | $1,010.00/pc    |
            | Compact Appliances (including parts and accessories)          | $821.00/pc      |
            | Beauty                                                        | $1,500.00/pc    |
            | Collectible Coins                                             | $652.50/pc      |
            | Entertainment Collectibles                                    | $650.00/pc      |
            | Fine Art                                                      | $805.00/pc      |
            | Grocery & Gourmet Food                                        | $1,500.00/pc    |
            | Health & Personal Care (including Personal Care Appliances)   | $1,500.00/pc    |
            | Jewelry                                                       | $537.50/pc      |
            | Sports Collectibles                                           | $645.00/pc      |
            | Watches                                                       | $495.00/pc      |

    Scenario Outline: Calculate minimum referral fee of an item based on <category> category
        Given I am on the profits tab
        When I set the product price to "0.50"
        And I expand Product Design section
        And I expand Order PL section
        And I select "<category>" product category
        Then the referral per product is "<fee>"

        Examples:
            | category                                                      | fee             |    
            | Amazon Device Accessories                                     | $0.30/pc        |
            | Amazon Explore                                                | $5.00/pc        |
