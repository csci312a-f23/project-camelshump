# Project Skeleton

camelshump is text-based role-playing/adventure game that will be deployed on the web using React. The game will utilize generative AI to create storylines and descriptions of game events. Players will be able to save progress in the game and return to where they left off without loss of progress. It will hopefully be fun to play (no guarantees).

The game can be accessed at: https://camelshump.csci312.dev

## Creation

This project skeleton has been setup similar to our assignments and practicals. It is a Next.JS application, created with create-next-app `💻 npx create-next-app@latest`, which uses Jest and Testing Library for testing, ESLint for static analysis, Prettier for styling, and is configured to use GitHub actions for testing pull requests.

Development dependencies installed with:

```
💻 npm install -D jest jest-environment-jsdom husky lint-staged prettier eslint-config-prettier @testing-library/react @testing-library/jest-dom
💻 npx install-peerdeps --dev eslint-config-airbnb
💻 npm install -D eslint-import-resolver-alias
```

Other dependencies installed with:

```
💻 npm install -S prop-types
```

### Additional tools you might need

#### Mocking fetch

Tools for mocking fetch can be installed with

```
💻 npm install -D fetch-mock-jest node-fetch@2.6.7
```

Note we need to pin the `node-fetch` version due to breaking changes when used with Jest in newer versions.

![workflow status](https://github.com/csci312a-f23/project-camelshump/actions/workflows/node.js.yml/badge.svg)
