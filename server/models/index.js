const _ = require('lodash');
const fs = require('fs');

const excluded = ['index'];

fs.readdirSync(__dirname).forEach(file => {

    const filename = file.split('.')[0];

    if(!_.includes(excluded, filename))
        module.exports[filename] = require(`./${filename}`);
});