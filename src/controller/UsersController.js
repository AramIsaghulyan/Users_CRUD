
//Standard requires

const express = require('express');
const router  = express.Router();

//Library requires

const awaitErrorHandlerFactory = require('../shared/Functions').getMiddleware();

//Local requires

const usersService = require('../service/UsersService');
const { validate } = require('../validation/Validation');
const userValidation = require('../validation/UserValidation');
const response = require('../shared/Response');


/**
 * Add User
 *
 * @module createUser
 * @path {POST} /user/create_user
 * @body {String} name - User name
 * @body {String} surname - User surname
 * @body {Steing} age - User age
 * @body {String} email - User email
 * @body {String} password - User password
 * @response {Object} data - Example
 *      {
 *          resilt: User has been succsessfully added
 *      }
 * @response {Object} error - Example
 *          {
 *              message: age must be a string 
 *          }
 * @response {Boolean} hasError - Has an error
 * @code {200} returns above described object with empty error object
 * @code {400} returns above described object with empty data object
 */


router.post('/create_user', awaitErrorHandlerFactory(async (req, res) => {
    
    try {
        const body = await validate(req.body, userValidation.user);
        const { name, surname, age, email, password } = body;
        const result = await usersService.createUser({ name, surname, age, email, password });
        return res.status(200).json(new response(result));
    }
    catch (error) {
        res.status(400).json(new response({}, error));
    };
}));


/**
 * Get Users
 *
 * @module getUsers
 * @path {GET} /user/get_users
 * @response {Object} data - Example
 *      {
 *          id: 34,
 *          name: "...",
 *          surname: "...",
 *          age: "...",
 *          email: "...",
 *          password: "..."
 *      }
 * @response {Object} error - Example
 *          {
 *              message: The operation was not performed 
 *          }
 * @response {Boolean} hasError - Has an error
 * @code {200} returns above described object with empty error object
 * @code {400} returns above described object with empty data object
 */


router.get('/get_users', awaitErrorHandlerFactory(async (req, res) => {

    try {
        const result = await usersService.getUsers(req.body);
        return res.status(200).json(new response(result));
    }
    catch (error) {
        res.status(400).json(new response({}, error));
    };
}));


/**
 * Get User By Id
 *
 * @module getUserById
 * @path {GET} /user/get_user_by_id/:id
 * @params {Number} id - Id of user
 * @response {Object} data - Example
 *      {
 *          id: 34,
 *          name: "...",
 *          surname: "...",
 *          age: "...",
 *          email: "...",
 *          password: "..."
 *      }
 * @response {Object} error - Example
 *          {
 *              message: The operation was not performed 
 *          }
 * @response {Boolean} hasError - Has an error
 * @code {200} returns above described object with empty error object
 * @code {400} returns above described object with empty data object
 */


router.get('/get_user_by_id/:id', awaitErrorHandlerFactory(async (req, res) => {

    try {
        const result = await usersService.getUserById(req.params.id);
        return res.status(200).json(new response(result));
    }
    catch (error) {
        res.status(400).json(new response({}, error));
    };
}));


/**
 * Update User
 *
 * @module updateUser
 * @path {PUT} /user/update_user/:id
 * @params {Number} id - Id of user
 * @body {String} name - User name
 * @body {String} surname - User surname
 * @body {String} age - User age
 * @body {String} email - User email
 * @body {String} password - User password
 * @response {Object} data - Example
 *      {
 *          id: 34,
 *          name: "...",
 *          surname: "...",
 *          age: "...",
 *          email: "...",
 *          password: "..."
 *      }
 * @response {Object} error - Example
 *          {
 *              message: age must be a string 
 *          }
 * @response {Boolean} hasError - Has an error
 * @code {200} returns above described object with empty error object
 * @code {400} returns above described object with empty data object
 */


router.put('/update_user/:id', awaitErrorHandlerFactory(async (req, res) => {

    try {
        const body = await validate(req.body, userValidation.user);
        const { name, surname, age, email, password } = body;
        const result = await usersService.updateUser({ name, surname, age, email, password }, req.params.id);
        return res.status(200).json(new response(result));
    }
    catch (error) {
        res.status(400).json(new response({}, error));
    };
}));


/**
 * Delete User
 *
 * @module getUserById
 * @path {GET} /user/delete_user/:id
 * @params {Number} id - Id of user
 * @response {Object} data - Example
 *      {
 *          result: User is delete
 *      }
 * @response {Object} error - Example
 *          {
 *              message: The operation was not performed 
 *          }
 * @response {Boolean} hasError - Has an error
 * @code {200} returns above described object with empty error object
 * @code {400} returns above described object with empty data object
 */


router.delete('/delete_user/:id', awaitErrorHandlerFactory(async (req, res) => {

    try {
        const result = await usersService.deleteUser(req.params.id);
        return res.status(200).json(new response(result));
    }
    catch (error) {
        res.status(400).json(new response({}, error));
    };
}));

module.exports = router;