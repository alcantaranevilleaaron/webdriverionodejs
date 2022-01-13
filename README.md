## Installation

### Prerequisities
- Install Node.js 

### node packages

- `cd tests`
- `npm ci`
- Due to known issue in webdriverio and cucumber dependancy, downgrade cucumber to `7.1.0`
- `cd node_modules/@wdio/cucumber-framework`
- `npm install @cucumber/cucumber@7.1.0 --save-dev`
- Refer: https://stackoverflow.com/questions/67186996/failed-launching-test-session-error-couldnt-initialise-wdio-cucumber-framew

### Chrome profile

- As extension requires google sign in, user interaction is required atleast once. Thus, best way to automate is by creating a custom profile.
- Start chrome with custom profile, the profile directory will be created if it doesn't exist. (Windows)
- `start chrome --user-data-dir=<absolute path to profile>`
- For eg. `start chrome --user-data-dir=C:\Work\Code\automated-tests\test-profile`
- Verify that chrome is loaded with custom profile by going to `chrome://version` and check whether profile path is as expected.
- Load the unpacked extension and sign in to the extension by following this [first run steps section](https://gitlab.com/white-sand/whitesand-data-services-browser-extension#first-run)
- Update the user data dir path in the `wdio.conf.js` at line 63.

## Execution

- `cd tests`
- `npm test`

## Report Generation

- Install allure

- `cd tests/reports`
- `allure generate allure-results -o allure-report --clean`
- `allure open allure-report`
- The report will be opened in browser

## Note

- The current testcase uses this amazon product url `https://www.amazon.com/dp/B07DVCGX7G`. This can be modified in `pages/amazon.page.js` at line 11.
- The current testcase provides `100` as monthly sales velocity and expects `390` as products per order.
- The above values can be modified in the `features/demo.feature` at line 6 and 7.
- Make sure that chrome profile is not in used when running the tests
- For Visual Studio Code users, install Gherkin extension and include this in the settings to create linkage to your step definition and feature files. 
    - Press Ctrl + , to open User Settings
    - Scroll down to Cucumber Auto Complete
    - Add below items:
    ```
    	"cucumberautocomplete.steps": [ 
	    "tests/features/step-definitions/*js"
	    ],
	    "cucumberautocomplete.syncfeatures": "tests/features/*feature", 
	    "cucumberautocomplete.strictGherkinCompletion": true
    ```