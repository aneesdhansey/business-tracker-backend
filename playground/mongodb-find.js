const { MongoClient, ObjectID } = require('mongodb');
const dotenv = require('dotenv');

dotenv.load();

const mongoURI = process.env.MONGODB_URI;

MongoClient.connect(mongoURI, (err, client) => {
    if(err)
        return console.log('Unable to connect to MongoDB server');
    console.log('Connected to MongoDB server...');
    const db = client.db();

    // db.collection('Todos').find({
    //     _id: new ObjectID('5aba69d12350a818f86da233')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    //     client.close();
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    //     client.close();
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count:${count}`);
    //     client.close();
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    //     client.close();
    // });

    // db.collection('Users').find({
    //     name: { $in : ['Abeer', 'Amber']}
    // }).toArray().then((docs) => {
    //     console.log('Users');
    //     console.log(JSON.stringify(docs, undefined, 2));
    //     client.close();
    // }, (err) => {
    //     console.log('Unable to fetch Users', err);
    //     client.close();
    // });
    
    //client.close();
});