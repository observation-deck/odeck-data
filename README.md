# The SC Data Project

**Goal:** To provide up-to-date accurate data for ships in Star Citizen

## Principles

- Quality over Quantity
    - Its more important to have simple and well structured data, than large amounts of data that become hard to maintain.
- Use Automation where possible
    - Automated tests already run on PRs and check data follows the schemas
    - If adding large quantities of data from a consistent source, lets look to automate the process, since it will need to be updated over time.
- Consistency is important
    - Be thoughtful about nulls, optional values, and schemas
    - Add strict schema rules with new data and use enums if possible
    - If in doubt, add more tests


## Contributing

There are plenty of ways to contribute, just raising issues and commenting on other issues to provide your point of view and insights helps a ton. Instructions below for how to contribute code.

> Requirements Node and NPM.

**Recommended**: If you are making schema changes raise a PR with your proposed changes to discuss with others in the community before doing the work to prevent unnecessary rework.

1. Checkout code and run `npm install`
2. Try to run `npm run validate` to make sure you can run the tests locally.
3. Make you changes to the data, update or add to schemas if necessary. You can use `npm run test:watch` to get feedback as you are working.
4. Raise a PR for your changes.

## Todo

- Set up linting and add to github actions
- Add actions to publish json to github pages - to act as API for those that need it
- More tests
- Add license
- Release