# Vank

# Description

# Roadmap

- [x] `/client` resource allows create and edit.
- [x] `/invoice` resource allows retrieve data about invoices, also can filter and convert output currency.
- [] Web application.
- [x] Store and refresh invoices from csv (schedule job).
- [x] Store and refresh conversion rates from API.
- [x] Cache strategy for invoices queries through Redis.
- [x] Typescript.
- [x] Unit tests.
- [x] PaaS deployed.
- [x] Docs.
- [x] Development setup.
- [x] Clean architecture.
- [] docker-compose to run the entire system.

# API

The API has two resources `/client` and `/invoice`. You can find the documentation in the following url: [Vank Documentation](https://documenter.getpostman.com/view/20338556/UVysxbYr). Also you can download the collection from this repository in `/docs/vank-postman`.

# Infrastructure

The system is running in different cloud platforms, these are:

[Heroku](https://www.heroku.com/): here runs the API, it has a CI/CD workflow through Github Actions (CI) and Heroku Service (CD).

[Vercel](https://vercel.com/): here run the web application, it has a CI/CD setup provided by Vercel.

[Render](https://render.com/): here is the Redis Cache layer, it's free.

[CloudMongo](https://www.mongodb.com/es/cloud/atlas/register): here is the MongoDB instance, also free.

# Architecture

![C4 context](docs/images/vank-c4-context.png?raw=true)

### The system context shows the main software systems which allows the operation of Vank.

![C3 containers](docs/images/vank-c3-containers.png?raw=true)

### This diagram shows the principal containers of the system.

# Development setup

You will need a `.env` file with the following variables:

```
MONGO_DB_URL
REDIS_URL
INVOICES_URL=https://gist.githubusercontent.com/rogelio-meza-t/f70a484ec20b8ea43c67f95a58597c29/raw/41f289c605718e923fc1fad0539530e4d0413a90/invoices.csv
CONVERSION_RATES_URL=https://free.currconv.com/api/v7/convert?compact=ultra
CONVERSION_RATES_API_KEY
```

**Disclaimer:** Explicit values are public, so there isn't a risk.

Create a free mongo database [here](https://www.mongodb.com/es/cloud/atlas/register)

Create a free redis instance [here](https://render.com/)

Get a currency conversion api key [here](https://free.currencyconverterapi.com/)

Then you need to install the dependencies with:

```
yarn
```

or

```
npm install
```

Also you need the Nx CLI to run the apps in the Nx Workspace. You can install the CLI with:

```
npm install -g nx
```

With that dependencies you can run the **frontend** with:

```
nx serve web
```

and the **api** with:

```
nx serve api
```

Finally, navigate to the **frontend** url and also you can test the API with the file in `/docs/vank-postman/vank.postman_collection.json`

# Tests

Currently the **api** tests has a 100% coverage. You can run the tests in the development enviroment with the following command:

```
nx test api --silent --verbose --coverage
```

the flags gives a better dev experience.

# Dev Tools

[Nx](https://nx.dev): Monorepo buildsystem.

[NextJS](https://nextjs.org/): React framework with amazing features.

[MUI](https://mui.com/): Design system which allows to develop apps faster.
