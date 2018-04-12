const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.load();

const mongoURI = process.env.MONGODB_URI;
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI);

module.exports = { mongoose };