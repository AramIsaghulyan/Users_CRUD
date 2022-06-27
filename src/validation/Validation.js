/**
 * Standard requires
 */

const baseJoi = require('joi');


let EVMJoi = baseJoi.extend((joi) => {

    return {
        type: 'user',
        base: joi.string(),
        messages: {
            'user.email': '{{#label}} Sorry, only letters (a-z), numbers(0-9), at (@), and periods (.) are allowed',
            'user.password': '{{#label}} Use 8 or more characters with a mix of letters, numbers & symbols' 
        },
        validate(value, helpers) {
            return { value };
        },
        rules: {
            Email: {
                method() {
                    return this.$_addRule('Email');
                },
                validate(value, helpers) {
                    if(!value) {
                        return helpers.error('user.email');
                    }
                    return value;
                }
            },
            Password: {
                method() {
                    return this.$_addRule('Password');
                },
                validate(value) {
                    if(!value) {
                        return helpers.error('user.password');
                    }
                    return value;
                }
            }
        }
    };
});

let validate = async (body, sheme) => {

    const shema = EVMJoi.object(sheme);
    const res = shema.validate(body);
    if(res.error) {
        throw new Error(res.error.message);
    }
    return res.value;
};

module.exports = { EVMJoi, validate };