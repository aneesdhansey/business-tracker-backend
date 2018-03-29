const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { ObjectID } = require('mongodb')

dotenv.load();

const port = process.env.PORT || 3000;

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

    if(!ObjectID.isValid(id))
        res.status(404).send();

    Todo.findById(id)
        .then((todo) => {
            if(!todo)
               return res.status(404).send();

            res.send({ todo });
        })
        .catch((error) => res.status(400).send());
})

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;

    if(!ObjectID.isValid(id))
        return res.status(404).send();

    Todo.findByIdAndRemove(id)
        .then((todo) => {
            if(!todo)
                return res.status(404).send();

            res.send({ todo });
        })
        .catch((error) => res.status(400).send());
})

app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = { app };

