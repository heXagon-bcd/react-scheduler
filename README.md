# Interview Scheduler

Main Portal
![image](https://github.com/heXagon-bcd/react-scheduler/assets/5097750/7bf766f5-5e1f-4252-8125-c057fbab192f)

Schedule your appointment!

![image](https://github.com/heXagon-bcd/react-scheduler/assets/5097750/afcdd284-9cae-495e-bc42-34ece86cb603)

## Overview

The project was built over four phases:

Build components in isolation: We'll start with those at the outermost nodes of the component tree (e.g. buttons, individual list items). and work our way up the tree to the components that need to use the ones built first.
Retrieve data from an API and render the data using components.
Manage the visual state of the application including create, edit and delete capabilities.
Implement advanced React patterns to manage the state and add live updates.
Instruction

## Setup

Install dependencies with `npm install`.

### Dependancies

- "axios": "^0.19.2",
- "classnames": "^2.2.6",
- "normalize.css": "^8.0.1",
- "react": "^16.14.0",
- "react-dom": "^16.9.0",
- "react-scripts": "3.4.4"

### Dev Dependancies

- "@babel/core": "^7.4.3",
- "@storybook/addon-actions": "^5.0.10",
- "@storybook/addon-backgrounds": "^5.0.10",
- "@storybook/addon-links": "^5.0.10",
- "@storybook/addons": "^5.0.10",
- "@storybook/react": "^5.0.10",
- "@testing-library/jest-dom": "^4.0.0",
- "@testing-library/react": "^8.0.7",
- "@testing-library/react-hooks": "^8.0.1",
- "babel-loader": "8.1.0",
- "prop-types": "^15.8.1",
- "react-test-renderer": "^16.14.0",
- "sass": "^1.53.0"

## Running Webpack Development Server

We need to be able to quickly and easily see the effect of our changes to the project. The webpack-dev-server provides a live environment that updates the the browser when a file is saved.

```sh
npm start
```

## Running Jest Test Framework

A test environment is an important consideration for any project. The ability to run tests using the Jest testing framework is built-in to the project. We will use Jest to implement a few features using test driven development.

```sh
npm test
```

## Running Storybook Visual Testbed

The Storybook environment is designed to speed up the development and testing of individual components. The benefits will become more evident as an application scales.

```sh
npm run storybook
```

# Interview Scheduler API

There is a back end that must also be installed. Fork and clone to your local machine
https://github.com/lighthouse-labs/scheduler-api

## Setup

Install dependencies with `npm install`.

## Creating The DB

Use the `psql -U development` command to login to the PostgreSQL server with the username `development` and the password `development`. This command **MUST** be run in a vagrant terminal, we are using the PostgreSQL installation provided in the vagrant environment.

Create a database with the command `CREATE DATABASE scheduler_development;`.

Copy the `.env.example` file to `.env.development` and fill in the necessary PostgreSQL configuration. The `node-postgres` library uses these environment variables by default.

```
PGHOST=localhost
PGUSER=development
PGDATABASE=scheduler_development
PGPASSWORD=development
PGPORT=5432
```

## Seeding

Run a the development server with `npm start` in the Host environment. We are only using vagrant for `psql` this week.

Both of these achieve the same result.

- Make a `GET` request to `/api/debug/reset` with `curl   `.
- Use the browser to navigate to `http://localhost:8001/api/debug/reset`.

The `development` data is random. Each time we seed we expect to see different appointments.

## Run The Server

Running the server normally

```sh
npm start
```

Running the server so it returns an error when saving/deleting for testing the client's error handling capabilities

```sh
npm run error
```
