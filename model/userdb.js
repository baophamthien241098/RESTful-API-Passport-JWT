const Sequelize = require("sequelize");
const db = require('../database/db')
const dbuser= db.define("users",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        username:{
            type:Sequelize.STRING
        },
        userpassword:{
            type:Sequelize.STRING
        },
        
    },{
        timestamps:false,
    }
)
module.exports = dbuser;
