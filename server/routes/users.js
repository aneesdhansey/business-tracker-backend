const _ = require('lodash');

const { authenticate } = require('../middleware/authenticate');
const { User } = require('../models').user;
const UsersController = require('express').Router();

UsersController
    .post('/', async (req, res) => {
        const body = _.pick(req.body, ['email', 'password']);
        const user = new User(body);

        try {
            await user.save();
            const token = await user.generateAuthToken();
            res.header('x-auth', token).send(user);
        } catch (error) {
            res.status(400).send({ error });
        }
    })
    .post('/login', async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findByCredentials(email, password)
            const token = await user.generateAuthToken();
            res.header('x-auth', token).send({ user });
        } catch (error) {
            res.status(400).send()
        }
    })
    .get('/me', authenticate, (req, res) => {
        res.send(req.user);
    })
    .delete('/me/token', authenticate, async (req, res) => {
        try {
            await req.user.removeToken(req.token);
            res.send();
        } catch (error) {
            res.status(400).send()
        }
    });

module.exports = UsersController;