const { mongoose } = require('../server/db/mongoose');
const { ObjectID } = require('mongodb');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

//Todo.remove({}).then((result) => console.log(result));

Todo.findByIdAndRemove('5abcc1f2fc9133001437a759')
.then((todo) => console.log(todo));