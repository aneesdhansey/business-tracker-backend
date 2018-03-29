const dotenv = require('dotenv');

dotenv.load();

const env = process.env.NODE_ENV || 'development';
console.log("env ********", env);

if(env === 'development'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = process.env.MONGODB_URI;
}else if(env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = process.env.MONGODB_URI_TEST;
}

console.log('MONGODB_URI', process.env.MONGODB_URI);