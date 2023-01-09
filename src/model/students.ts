let sequelize = require('../database')
let Sequelized = require('sequelize')

import { Model } from "sequelize"

class student extends Model{}
student.init({
    name :{
        field:'name',
        type: Sequelized.STRING
    },
    email :{
        field:'email',
        type: Sequelized.STRING
    },
    password :{
        field:'password',
        type: Sequelized.STRING
    }
},{
    sequelize,
    timestamps:false,
})
student.sync()
 module.exports = student
