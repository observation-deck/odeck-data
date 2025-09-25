## The SC Data Project

Goal: To provide up to date accurate data for ships in Star Citizen

## Principles

- Consistency is important
    - Be thoughtful about nulls, optional values, and schemas
    - Its json, keys should be camelcase
    - Add strict schema rules with new data and use enums if possible
    - If in doubt, add more tests

## Todo

- Set up github actions to run tests on pr
- Set up linting and add to github actions
- Add actions to publish json to github pages - to act as API for those that need it
- More tests
- Release