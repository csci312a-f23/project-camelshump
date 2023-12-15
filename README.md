# Project Skeleton

camelshump is text-based role-playing/adventure game that will be deployed on the web using React. The game utilizes generative AI to create storylines and descriptions of game events. Players will be able to save progress in the game and return to where they left off without loss of progress. You will hopefully find it fun to play (no guarantees). (like actually)

ASCII Art throughout the project was sourced from www.asciiart.eu.

Classes:
Wizard: Harry Mason
Warrior: Uncredited
Rogue: Uncredited

Menu:
Mountains (menu): Uncredited

Enemies:
Spider: Shanaka Dias
Dragon: Shanaka Dias
Thief: Joris Bllenger and Veronica Karlsson
Skeleton: Uncredited
Wizard: Uncredited
Evil Ampersand: Uncredited

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

The application requires an external postgresql database. We used neon.tech but other services would function the same.

Starting the application successfully requires a .env.local file with

NEXTAUTH_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

secrets defined.

The database must be migrated before use. Run
npx knex seed:run
npx knex migrate:latest

The application also requires a HuggingFace Inference API key to support the AI text generation.

### Deployment

To deploy, the source code should be pushed to a deploy server.

The deploy server requires several secrets to function. In addition to the secrets defined in .env.local, the following must be defined on the server:

    DATABASE_URL
    NEXTAUTH_URL

The following commands need to be run to migrate and seed the production environment:

    NODE_ENV=production npx knex migrate:latest
    NODE_ENV=production npx knex seed:run

### Additional tools you might need

#### Mocking fetch

Tools for mocking fetch can be installed with

```
💻 npm install -D fetch-mock-jest node-fetch@2.6.7
```

Note we need to pin the `node-fetch` version due to breaking changes when used with Jest in newer versions.

![workflow status](https://github.com/csci312a-f23/project-camelshump/actions/workflows/node.js.yml/badge.svg)
