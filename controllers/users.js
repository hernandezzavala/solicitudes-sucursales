const bcryptjs = require('bcryptjs');
const {User} = require('../models');

const getUser = async (request, response) => {
    try {
        const {id} = request.params;
        const user = await User.findById(id);
        return response.status(200).json({
            ok: true,
            data: user
        });
    } catch (error) {
        return response.status(400).json({
            ok: false,
            errors: 'Ha ocurrido un error en la petición. Inténtalo nuevamente'
        });
    }
}

const getUsers = async (request, response) => {
    try {
        const users = await User.find({deleted: false});
        return response.status(200).json({
            ok: true,
            data: users
        });
    } catch (error) {
        return response.status(400).json({
            ok: false,
            errors: 'Ha ocurrido un error en la petición. Inténtalo nuevamente'
        });
    }
}

const postUser = async (request, response) => {
    try {
        const {isAdmin, banned, deleted, ...user} = request.body;
        const created = new User(user);
        const salt = bcryptjs.genSaltSync();
        created.password = bcryptjs.hashSync(user.password, salt);
        await created.save();
        return response.status(201).json({
            ok: true,
            data: created
        });
    } catch (error) {
        return response.status(400).json({
            ok: false,
            errors: 'Ha ocurrido un error en la petición. Inténtalo nuevamente'
        });
    }
}

const putUser = async (request, response) => {
    try {
        const {id} = request.params;
        const {isAdmin, banned, deleted, ...user} = request.body;
        const updated = User.findByIdAndUpdate(id, user, {new: true});
        return response.status(200).json({
            ok: true,
            data: updated
        });
    } catch (error) {
        return response.status(400).json({
            ok: false,
            errors: 'Ha ocurrido un error en la petición. Inténtalo nuevamente'
        });
    }
}

const deleteUser = async (request, response) => {
    try {
        const {id} = request.params;
        const deleted = await User.findByIdAndUpdate(id, {deleted: true});
        return response.status(200).json({
            ok: true,
            data: deleted
        });
    } catch (error) {
        return response.status(400).json({
            ok: false,
            errors: 'Ha ocurrido un error en la petición. Inténtalo nuevamente'
        });
    }
}

const banUser = async (request, response) => {
    try {
        const {id} = request.params;
        const banned = await User.findByIdAndUpdate(id, {banned: true});
        return response.status(200).json({
            ok: true,
            data: banned
        });
    } catch (error) {
        return response.status(400).json({
            ok: false,
            errors: 'Ha ocurrido un error en la petición. Inténtalo nuevamente'
        });
    }
}

const UserController = {
    getUser,
    getUsers,
    postUser,
    putUser,
    deleteUser,
    banUser
}

module.exports = UserController;