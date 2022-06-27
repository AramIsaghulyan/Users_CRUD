/**
 * Standard requires
 */

const express = require('express');
const router  = express.Router();

/**
 * Library requires
 */

const awaitErrorHandlerFactory = require('../shared/Functions').getMiddleware();

/**
 * Local requires
 */

const usersService = require('../service/UsersService');
const { validate } = require('../validation/Validation');
const userValidation = require('../validation/UserValidation');
const response = require('../shared/Response');
const { result } = require('lodash');


router.post('/create_user', awaitErrorHandlerFactory(async (req, res) => {
    
    try {
        const body = await validate(req.body, userValidation.user);
        const result = await usersService.createUser(body);
        return res.status(200).json(new response(result));
    }
    catch (error) {
        res.status(400).json(new response({}, error));
    };
}));

router.get('/get_users', awaitErrorHandlerFactory(async (req, res) => {

    try {
        const { body } = await validate(req.body, userValidation.user);
        const result = await usersService.getUsers(body);
        return res.status(200).json(new response(result));
    }
    catch (error) {
        res.status(400).json(new response({}, error));
    };
}));

router.get('/get_user_by_id/:id', awaitErrorHandlerFactory(async (req, res) => {

    try {
        const result = await usersService.getUserById(req.params.id);
        return res.status(200).json(new response(result));
    }
    catch (error) {
        res.status(400).json(new response({}, error));
    };
}));

router.put('/update_user/:id', awaitErrorHandlerFactory(async (req, res) => {

    try {
        const body = await validate(req.body, userValidation.user);
        const result = await usersService.updateUser(body, req.params.id);
        return res.status(200).json(new response(result));
    }
    catch (error) {
        res.status(400).json(new response({}, error));
    };
}));

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