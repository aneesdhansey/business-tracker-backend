const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

require('./config/config');

const port = process.env.PORT;

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save()
        .then((doc) => res.send(doc))
        .catch((error) => res.status(400).send(error));
});

app.get('/todos', (req, res) => {
    Todo.find()
        .then((todos) => res.send({ todos }))
        .catch((error) => res.status(400).send({ error }));
});

app.get('/todos/:id', (req, res) => {
    const { id } = req.params;

    if (!ObjectID.isValid(id))
        res.status(404).send();

    Todo.findById(id)
        .then((todo) => {
            if (!todo)
                return res.status(404).send();

            res.send({ todo });
        })
        .catch((error) => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;

    if (!ObjectID.isValid(id))
        return res.status(404).send();

    Todo.findByIdAndRemove(id)
        .then((todo) => {
            if (!todo)
                return res.status(404).send();

            res.send({ todo });
        })
        .catch((error) => res.status(400).send());
});

app.patch('/todos/:id', (req, res) => {
    const { id } = req.params;
    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id))
        return res.status(404).send();

    body.completedAt = (_.isBoolean(body.completed) && body.completed) ? new Date().getTime() : null;

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then((todo) => {
            if(!todo)
                return res.status(404).send();
            
            res.send({ todo });
        })
        .catch((error) => res.status(400).send())
});

app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    user.save()
            .then(() => user.generateAuthToken())
            .then((token) => res.header('x-auth', token).send({ user }))
            .catch((error) => res.status(400).send({ error }));
})

app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = { app };

