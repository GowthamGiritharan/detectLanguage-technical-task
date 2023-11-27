# detectLanguage-technical-task

This project is created as a response to the Technical task. It utilizes and tests various endpoints exteded by https://detectlanguage.com/. Hence no local setup of the test application is required. 


## Testing 

Cypress e2e tests have been created and deployed to be run in GitHub Actions pipeline.

### End to end tests

The repository is configured to run end to end tests using [cypress](https://www.cypress.io/).

In order to slim the build time on concourse we do not install Cypress along with the application (since it takes a lot of time to do so). In order to run the tests locally you need to install cypress.

```bash
npm install -g cypress
```

To start the tests use the following command.

```bash
npm run cy:run
```

Or interactively using

```bash
npm run cy:open
```

### Github Actions run

The tests can alternatively be run from the Actions tab in the repo
