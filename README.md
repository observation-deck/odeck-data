## The SC Data Project

Goal: To provide up-to-date accurate data for ships in Star Citizen

## Principles

- Quality over Quantity
    - Its more important to have simple and well structured data, than large amounts of data that 
    become hard to maintain.
- Use Automation where possible
    - Automated tests already run on PRs and check data follows the schemas
    - If adding large quantities of data from a consistent source, lets look to automate the process, 
    since it will need to be updated over time.
- Consistency is important
    - Be thoughtful about nulls, optional values, and schemas
    - Add strict schema rules with new data and use enums if possible
    - If in doubt, add more tests

## Todo

- Set up linting and add to github actions
- Add actions to publish json to github pages - to act as API for those that need it
- More tests
- Add license
- Release