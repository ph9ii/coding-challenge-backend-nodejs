# Stolen Bikes Reporting System

[![N|NodeJS](https://indglobal.in/wp-content/uploads/2018/11/nodejs-square.png)](https://nodejs.org/)

SBRS is an online web service RESTfull api for handling stolen bikes cases.

  -  Bike owners can report a stolen bike.
  - A bike can have multiple characteristics: license number, color, type, full name of the owner, date, and description of the theft.
  - The Police can increase or decrease the number of police officers.
  - Each police officer should be able to search bikes by different characteristics in a database and see which police officer is responsible for a stolen bike case.
  - New stolen bike cases should be automatically assigned to any free police officer.
  - A police officer can only handle one stolen bike case at a time.
  - When the Police find a bike, the case is marked as resolved and the responsible - police officer becomes available to take a new stolen bike case.
  - The system should be able to assign unassigned stolen bike cases automatically when a police officer becomes available.

# Cool Features!

  - Cases are assigned automatically to officer when avail.
  - Officer can add as many comments to un-closed case ticket.


You can also:
  - Search all tickets
  - Navigate between diff. end-points using HATEOAS
  - Set page size and page number

SBRS is developed using javascript in NodeJS with express framework.

[![Join the chat at https://gitter.im/coding-challenge-backend-nodejs/community](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/coding-challenge-backend-nodejs/community)

### Installation

SBRS requires [Node.js](https://nodejs.org/) v4+ to run.

Please set the environment variables Requirements.

Docker for development.

```sh
$ cd SBRS
$ docker-compose build
$ docker-compose up
```

Install the dependencies and devDependencies and start the server.

```sh
$ npm install -d
$ npm run dev
```

For production environments...

```sh
$ npm install --production
$ NODE_ENV=production node server
```

Run migrations & seeds...

```sh
$ knex migrate:latest
$ knex seed:run
```

Run unit & integration tests...

```sh
$ npm run test
$ npm run ftest
```

### API / ENDPOINTS

All end points are prefixed with /api.

```sh
GET /
/api/tickets
/api/tickets/:id
/api/tickets/search
/api/tickets/:id/officers
/api/officers
/api/officers/:id
/api/officers/:id/tickets
```

```sh
POST /
/api/tickets
/api/officers
```

```sh
PUT /
/api/officers/:id
/api/officers/:id/tickets/:id
```

#### Online Demo

Visit https://sbrs-app.herokuapp.com/

License
----

MIT

# Thank _You_!
