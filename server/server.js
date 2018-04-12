const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

require('./config/config');

const port = process.env.PORT;

const { mongoose } = require('./db/mongoose');
// const { Todo } = require('./models/todo');
//const { User } = require('./models/user');

const { authenticate } = require('./middleware/authenticate');

const app = express();

app.use(bodyParser.json());

// Load all routes
require('./routes')(app);

app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = { app };

