const { MongoClient, ObjectID } = require('mongodb');
const dotenv = require('dotenv');

dotenv.load();

const mongoURI = process.env.MONGODB_URI;

MongoClient.connect(mongoURI, (err, client) => {
    if (err)
        return console.log('Unable to connect to MongoDB server');
    console.log('Connected to MongoDB server...');
    const db = client.db();

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5aba89889a4e32129cc77440')
    // },
    //     {
    //         $set: {
    //             completed: true
    //         }
    //     }, {
    //         returnOriginal: false
    //     })
    //     .then(result => console.log(result));

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5aba8b518807c91fbc1c7829')
    },
        { $set: { name: 'Anees' },
          $inc: { age: -1 }
        }, {
            returnOriginal: false
        })
        .then(result => console.log(result));

    //client.close();
});