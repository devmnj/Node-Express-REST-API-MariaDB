const Sequelize=require('Sequelize')
const db = require('../config/database')

module.exports= db.define('todos',{
    item:{type:Sequelize.STRING,allowNull:false},
    description:{type:Sequelize.STRING}
})
