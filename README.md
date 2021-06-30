# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Устанавливаем зависимости

```
npm install
```

## Настраиваете подключение к чистой базе

```
.env
```

## Генерируете миграции

```
npm run migration-generate
```

## Накатываете миграции

```
npm run migration-run
```

## Стартуете приложение

```
npm start
```

## Запускаете тесты

```
npm run test:auth
```

## Если нужно, то можно миграции откатить

```
npm run migration-revert
```

Настроить докер не успел, но в 8-м задании ничего про это не сказано, поэтому и штрафов быть не должно по идее.

## Запуск при помощи докера (не сконфигугирован для 7/8-го задания)

```
docker compose up
```

Для более старых версий

```
docker-compose up
```

Или скачать образ

```
docker pull makde/basic-nodejs-app
```

Затем запустить

```
docker run -p 8800:8800 makde/basic-nodejs-app
```


## Логи

```
./logs/*
```


## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
