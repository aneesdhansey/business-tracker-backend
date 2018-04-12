const _ = require('lodash');
const fs = require('fs');

const excluded = ['index'];

const appRoutes = (app) => {
    fs.readdirSync(__dirname).forEach(file => {

        // Remove extension from filename
        const basename = file.split('.')[0];

        // Only load files which are not directories and are not excluded
        if(!fs.lstatSync(`${__dirname}/${file}`).isDirectory() && !_.includes(excluded, file))
          app.use(`/${basename}`, require(`./${file}`));
    })
}

module.exports = appRoutes;