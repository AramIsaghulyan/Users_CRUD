
//Standard requires

const userSchema = require('typeorm').EntitySchema;

//Local requires

const userModel = require('../model/UserModel');

module.exports = new userSchema ({

    tableName:'User',
    target: userModel,
    columns: {
        id: {
            primary: true,
            name: 'id',
            type: 'int',
            generated: true,
            unique: true
        },
        name: {
            name: 'name',
            type: 'varchar',
        },
        surname: {
            name: 'surname',
            type: 'varchar',
        },
        age: {
            name: 'age',
            type: 'varchar'
        },
        email: {
            name: 'email',
            type: 'varchar',
            unique: true
        },
        password: {
            name: 'password',
            type: 'varchar',
        },
    },
});