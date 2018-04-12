const _ = require('lodash');

const { authenticate } = require('../middleware/authenticate');
const { Company } = require('../models').company;
const CompaniesController = require('express').Router();

CompaniesController
    .post('/', authenticate, async (req, res) => {
        const body = _.pick(req.body,
            [
                'title',
                'shortname',
                'licenseno',
                'street',
                'city',
                'state',
                'country',
                'phone',
                'fax',
                'email',
                'website'
            ]
        );
        body._lastmodifiedby = req.user._id;
        body._creator = req.user._id;
        const company = new Company(body);

        try {
            await company.save();
            res.send({ company });
        } catch (error) {
            res.status(400).send({ error });
        }
    });

// app.post('/todos', authenticate, (req, res) => {
//     const todo = new Todo({
//         text: req.body.text,
//         _creator: req.user._id
//     });

//     todo.save()
//         .then((doc) => res.send(doc))
//         .catch((error) => res.status(400).send(error));
// });

// app.get('/todos', authenticate, (req, res) => {
//     Todo.find({
//         _creator: req.user._id
//     })
//         .then((todos) => res.send({ todos }))
//         .catch((error) => res.status(400).send({ error }));
// });

// app.get('/todos/:id', authenticate, (req, res) => {
//     const { id } = req.params;

//     if (!ObjectID.isValid(id))
//         res.status(404).send();

//     Todo.findOne({
//         _id: id,
//         _creator: req.user._id
//     })
//         .then((todo) => {
//             if (!todo)
//                 return res.status(404).send();

//             res.send({ todo });
//         })
//         .catch((error) => res.status(400).send());
// });

// app.delete('/todos/:id', authenticate, async (req, res) => {
//     const { id } = req.params;

//     if (!ObjectID.isValid(id))
//         return res.status(404).send();

//     try {
//         const todo = await Todo.findOneAndRemove({ _id: id, _creator: req.user._id });
//         if (!todo)
//             return res.status(404).send();
//         res.send({ todo });
//     } catch (error) {
//         res.status(400).send()
//     }
// });

// app.patch('/todos/:id', authenticate, (req, res) => {
//     const { id } = req.params;
//     const body = _.pick(req.body, ['text', 'completed']);

//     if (!ObjectID.isValid(id))
//         return res.status(404).send();

//     body.completedAt = (_.isBoolean(body.completed) && body.completed) ? new Date().getTime() : null;

//     Todo.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, { new: true })
//         .then((todo) => {
//             if (!todo)
//                 return res.status(404).send();

//             res.send({ todo });
//         })
//         .catch((error) => res.status(400).send())
// });

module.exports = CompaniesController;