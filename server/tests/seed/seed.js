const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('../../models/todo');
const { User } = require('../../models/user');

const user1id = new ObjectID();
const user2id = new ObjectID();

const users = [{
    _id: user1id,
    email: 'test1@gmail.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: user1id, access: 'auth' }, 'secret123').toString()
    }]
}, {
    _id: user2id,
    email: 'youshallnotpass@gmail.com',
    password: 'userTwoPass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: user2id, access: 'auth' }, 'secret123').toString()
    }]
}];

const todos = [
    { _id: new ObjectID(), text: 'First test todo', _creator: user1id },
    { _id: new ObjectID(), text: 'Second test todo', completed: true, completedAt: 333, _creator: user2id }
]

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos)
            .then(() => done());
    });
};

const populateUsers = (done) => {
    User.remove().then(() => {
        const user1 = new User(users[0]).save();
        const user2 = new User(users[1]).save();

        return Promise.all([user1, user2]).then(() => done());
    });
}

module.exports = { todos, populateTodos, users, populateUsers };