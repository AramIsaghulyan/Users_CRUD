/**
 * Standard requires
 */

const baseJoi = require('joi');
let passwordValidator = require('password-validator');
let emailValidator = require("email-validator");
let passwordHash = require('password-hash');

/**
 * Create a schema
 */
let schema = new passwordValidator();

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
                    let result =  emailValidator.validate(value)
                    if(!result) {
                        return helpers.error('user.email');
                    }
                    return value;
                }
            },
            Password: {
                method() {
                    return this.$_addRule('Password');
                },
                validate(value,helpers) {
                    schema
                    .is().min(8)                                    // Minimum length 8
                    .is().max(100)                                  // Maximum length 100
                    .has().uppercase()                              // Must have uppercase letters
                    .has().lowercase()                              // Must have lowercase letters
                    .has().digits(2)                                // Must have at least 2 digits
                    .has().not().spaces()                           // Should not have spaces
                    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
                    let result = schema.validate(value);
                    if(!result) {
                        return helpers.error('user.password');
                    }
                    let hashedPassword = passwordHash.generate(value);
                    return hashedPassword;
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