# je-t

## Installation
Requires [Node.js](https://nodejs.org/) v14+ to run

Clone the project and install dependencies:
```
git clone git@github.com:andrei-z/je-t.git
cd je-t
npm i
```

To check Cypress is installed correctly you may execute:
```
je-t% npx cypress open
```

## Running tests
To run the tests headlessly:
```
je-t% npx cypress run
```
(explicit `--headless` flag can also be used)

To run the tests headed:
```
je-t% npx cypress run --headed
```

To run the tests WITHOUT creating videos (faster):
```
je-t% npx cypress run -c video=false
```

## Reports
Once the test run is completed, html report can be found at:
```
je-t/cypress/reports/html/index.html
```

Videos of each test spec execution can be found at:
```
je-t/cypress/videos
```