const bcryptjs = require('bcryptjs');
const { User } = require("../models");
const {generateToken} =  require('../helpers/token');

const login = async (request, response) => {
    const {name, password} = request.body;
    try {
        const user = await User.findOne({name});

        if(!user || user.deleted) {
            return response.status(400).json({
                ok: false,
                errors: `El usuario ${user} no está registrado`
            });
        }

        if(user.banned) {
            return response.status(400).json({
                ok: false,
                errors: `El usuario ${user} ha sido suspendido`
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword) {
            return response.status(400).json({
                ok: false,
                errors: 'La contraseña no coincide. Inténtalo nuevamente'
            });
        }

        const token = await generateToken(user.id);
        response.status(200).json({
            ok: true,
            data: {token}
        });
    } catch (error) {
        return response.status(400).json({
            ok: false,
            errors: 'Ha ocurrido un error en la petición. Inténtalo nuevamente'
        });
    }
}

const renew = async (request, response) => {
    try {
        const {user} = request;
        const token = await generateToken(user.id);
        
        return response.status(200).json({
            ok: true,
            data: {token}
        });
    } catch (error) {
        return response.status(400).json({
            ok: false,
            errors: 'Ha ocurrido un error en la petición. Inténtalo nuevamente'
        });
    }
}

const AuthController = {
    login,
    renew
}

module.exports = AuthController;