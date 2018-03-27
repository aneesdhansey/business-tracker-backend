const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.load();

const mongoURI = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI);

const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

const User = mongoose.model('User', {
    email : {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

// const newTodo = new Todo({
//     text: 'Default settings',
// });

// newTodo.save()
//        .then((doc) => console.log('Todo saved', JSON.stringify(doc, undefined, 2)))
//        .catch((error) => console.log('Unable to save todo', error));

const newUser = new User({
    email: 'fluffyunicorn@springdale.com  '
});

newUser.save()
        .then((doc) => console.log('User saved', JSON.stringify(doc, undefined, 2)))
        .catch((err) => console.log('Unable to save user', err));
