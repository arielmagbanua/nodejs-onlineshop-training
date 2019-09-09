const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'nodejs-training', 
    'root', 
    '',
    { dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;