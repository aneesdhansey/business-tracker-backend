const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

require('./config/config');

const port = process.env.PORT;

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const { authenticate } = require('./middleware/authenticate');

const app = express();

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save()
        .then((doc) => res.send(doc))
        .catch((error) => res.status(400).send(error));
});

app.get('/todos', authenticate , (req, res) => {
    Todo.find({
        _creator: req.user._id
    })
        .then((todos) => res.send({ todos }))
        .catch((error) => res.status(400).send({ error }));
});

app.get('/todos/:id', authenticate, (req, res) => {
    const { id } = req.params;

    if (!ObjectID.isValid(id))
        res.status(404).send();

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    })
        .then((todo) => {
            if (!todo)
                return res.status(404).send();

            res.send({ todo });
        })
        .catch((error) => res.status(400).send());
});

app.delete('/todos/:id', authenticate, (req, res) => {
    const { id } = req.params;

    if (!ObjectID.isValid(id))
        return res.status(404).send();

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    })
        .then((todo) => {
            if (!todo)
                return res.status(404).send();

            res.send({ todo });
        })
        .catch((error) => res.status(400).send());
});

app.patch('/todos/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id))
        return res.status(404).send();

    body.completedAt = (_.isBoolean(body.completed) && body.completed) ? new Date().getTime() : null;

    Todo.findOneAndUpdate({ _id: id, _creator: req.user._id } , { $set: body }, { new: true })
        .then((todo) => {
            if (!todo)
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
        .then((token) => res.header('x-auth', token).send(user))
        .catch((error) => res.status(400).send({ error }));
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    const { email, password } = req.body;

    User.findByCredentials(email, password)
        .then((user) => {
            return user.generateAuthToken()
                .then((token) => {
                    res.header('x-auth', token).send({ user });
                });
        })
        .catch((error) => res.status(400).send());

});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token)
        .then(() => res.send())
        .catch(() => res.status(400).send());
});

app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = { app };

