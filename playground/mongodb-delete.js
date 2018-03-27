const { MongoClient, ObjectID } = require('mongodb');
const dotenv = require('dotenv');

dotenv.load();

const mongoURI = process.env.MONGODB_URI;

MongoClient.connect(mongoURI, (err, client) => {
    if(err)
        return console.log('Unable to connect to MongoDB server');
    console.log('Connected to MongoDB server...');
    const db = client.db();

    // db.collection('Todos').deleteMany({
    //     text: 'Eat lunch'
    // })
    // .then((result) => {
    //     console.log(result);
    // })

    // db.collection('Todos').deleteOne({
    //     text: 'Eat lunch'
    // })
    // .then((result) => {
    //     console.log(result.result);
    // })

    // db.collection('Todos').findOneAndDelete({
    //     completed: false
    // })
    // .then((doc) => {
    //     console.log(doc);
    // });

    db.collection('Users').findOneAndDelete({
        name: 'Anees'
    })
    .then(doc => console.log(JSON.stringify(doc, undefined, 2)));
    
    //client.close();
});