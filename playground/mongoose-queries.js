const { mongoose } = require('../server/db/mongoose');
const { ObjectID } = require('mongodb');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

const id = '5abbee912cad7d1df879bc1b';

User.find()
.then((users) => console.log('USERS', users))
.catch(error => console.log("ERROR", error));

User.findById('5aba974186c8400a24827d8f')
.then((user) => console.log('USER', user))
.catch(error => console.log("ERROR", error));

// if(!ObjectID.isValid('5abbee912cad7d1df879bc1b324'))
// console.log("ID NOT VALID");

// Todo.find({
//     _id: id
// })
// .then((todos) => console.log('TODOS', todos))
// .catch((err) => console.log('ERROR', err));

// Todo.findOne({
//     _id: id
// })
// .then((todo) => console.log('TODO', todo))
// .catch((err) => console.log('ERROR', err));

// Todo.findById(id)
// .then((todo) => console.log('TODO BY ID', todo))
// .catch((err) => console.log('ERROR', err));

// Todo.findById('6abbee912cad7d1df879bc1b')
// .then((todo) => {
//     if(!todo)
//         return console.log('ID NOT FOUND');
//     console.log('TODO BY ID', todo);
// })
// .catch((err) => console.log('ERROR', err));

// Todo.findById('6abbee912cad7d1df879bc1b23423')
// .then((todo) => {
//     if(!todo)
//         return console.log('ID NOT FOUND');
//     console.log('TODO BY ID', todo);
// })
// .catch((err) => console.log('ERROR', err));