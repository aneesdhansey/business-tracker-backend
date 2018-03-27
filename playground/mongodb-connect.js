const { MongoClient, ObjectID } = require('mongodb');
const dotenv = require('dotenv');

dotenv.load();

const mongoURI = process.env.MONGODB_URI;

MongoClient.connect(mongoURI, (err, client) => {
    if(err)
        return console.log('Unable to connect to MongoDB server');
    console.log('Connected to MongoDB server...');
    const db = client.db();

    db.collection('Todos').insertOne({
        text: 'Eat lunch',
        completed: false
    }, (err, result) => {
        if(err)
            return console.log('Unable to insert todo', err);
        console.log(JSON.stringify(result.ops, undefined, 2));
    }); 

    // db.collection('Users').insertOne({
    //     name: 'Anees',
    //     age: 27,
    //     location: 'Mhasla'
    // }, (err, result) => {
    //     if(err)
    //         return console.log('Unable to insert user', err);
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    // })
    
    client.close();
});