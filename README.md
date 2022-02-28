# Bookmarks API

## Description

Website bookmarks API with JWT user authentication and protected routes, built with Nestjs.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://typescriptlang.org" title="Go to TypeScript homepage"><img src="https://img.shields.io/badge/TypeScript-4-blue?logo=typescript&logoColor=white" alt="Made with TypeScript"></a>
<a href="https://www.postgresql.org/" title="Go to PostgresSQL homepage"><img src="https://img.shields.io/badge/PostgreSQL-latest-blue?logo=postgresql&logoColor=white" alt="Made with PostgreSQL"></a>
  
</p>

## Run Locally

### Clone the project

```bash
  git clone https://github.com/kudi-dev/
bookmarks-api-nestjs.git
```

### Installation

```bash
$ yarn install
```

### Running the database docker container

```bash
# development
$ yarn db:dev:restart

# testing mode
$ yarn db:test:restart

```

### Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
