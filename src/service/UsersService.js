/**
 * Local requires
 */

const userModel = require('../database/model/UserModel');
const typeorm = require('../database/typeorm');

class usersService {

    static createUser = async (code) => {

        const result = await typeorm.connection
        .createQueryBuilder()
        .insert()
        .into(userModel)
        .values(code)
        .execute();

        if (!result) {

            throw new Error('Error: The operation was not performed');
        }

        return { result: 'User has been succsessfully added' };
    };

    static getUsers = async (code) => {

        const result = await typeorm.connection
        .getRepository(userModel)
        .find();

        if (!result) {

            throw new Error('Error: The operation was not performed');
        }

        return result;
    };

    static getUserById = async (code) => {

        const result = await typeorm.connection
        .getRepository(userModel)
        .createQueryBuilder('users')
        .where('users.id = :id', { id: code })
        .getOne();

        if (!result) {

            throw new Error('Error: The operation was not performed');
        }

        return result;
    };

    static updateUser = async (code, id) => {

        const result = await typeorm.connection
        .createQueryBuilder()
        .update(userModel)
        .set(code)
        .where('id = :id', { id: id })
        .execute();

        if (!result) {

            throw new Error('Error: The operation was not performed');
        }

        return 'User is update';
    };

    static deleteUser = async (code) => {

        const result = await typeorm.connection
        .createQueryBuilder()
        .delete()
        .from(userModel)
        .where('id = :id', { id: code })
        .execute();

        if (!result) {

            throw new Error('Error: The operation was not performed');
        }

        return { result: 'User is delete' };
    }
};

module.exports = usersService;