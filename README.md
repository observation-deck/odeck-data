# ODeck Data - Star Citizen Data for the Community

> Outr goal is to provide up-to-date accurate data for Star Citizen ships (and more)

## Using the Data

There are two primary ways to access the data in this repo.

1. Download the repo and use the json files located in `src/data/`
2. Use the hosted version as a limited API (schema not guaranteed to be stable for a while)..
    - https://api.odeck.space/ships - get all ship data
    - https://api.odeck.space/manufacturers - get all manufacturer data


## How to help?

There are plenty of ways to contribute, just raising issues and commenting on other issues to provide your point of view and insights helps a ton. Instructions below for how to contribute code.

> Requirements Node and NPM.

**Recommended**: If you are making schema changes not already based on an issue, please create one to discuss with others in the community and prevent unnecessary rework.

1. Checkout code and run `npm install`
2. Try to run `npm run validate` to make sure you can run the tests locally.
3. Make you changes to the data, update or add to schemas if necessary. You can use `npm run test:watch` to get feedback as you are working.
4. Raise a PR for your changes.


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

## Disclaimer

This is an unofficial Star Citizen fan site, not affiliated with the Cloud Imperium group of companies. All content on this site not authored by its host or users are property of their respective owners.

This repository is made and maintained by the community.