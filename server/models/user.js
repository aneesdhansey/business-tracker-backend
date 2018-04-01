const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    let user = this;
    const userObj = user.toObject();

    return _.pick(userObj, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
    let user = this;
    const access = 'auth';
    const token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString();

    user.tokens = [...user.tokens, { access, token }];

    return user.save().then(() => token);
};

UserSchema.methods.removeToken = function (token) {
    const user = this;

    return user.update({
        $pull: {
            tokens: { token }
        }
    });
}

UserSchema.statics.findByToken = function (token) {
    const User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
}

UserSchema.statics.findByCredentials = function(email, password) {
    var User = this;

    return User.findOne({ email })
        .then((user) => {
            if(!user)
                return Promise.reject();
            
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err)
                        reject(error);
                    
                    if(result)
                        resolve(user);
                    
                    reject();
                });
            });
        })
        .catch((error) => res.status(400).send({ error }))
}

UserSchema.pre('save', function(next){
  const user = this;

  if(user.isModified('password')){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        });
    });
  } else {
      next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };