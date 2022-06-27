/**
 * Local requires
 */

const Joi = require('./Validation').EVMJoi;

module.exports = {

    user: {
        name: Joi.string().required(),
        surname: Joi.string().required(),
        age: Joi.number().required(),
        email: Joi.user().Email().required(),
        password: Joi.user().Password().required(),
    }
};