const Sequelize = require('sequelize');

const sequelize = new Sequelize ({
    dialect: 'sqlite',
    storage: './db/app.db'
});

//Used to export the configs of the Sequelize.
module.exports = sequelize