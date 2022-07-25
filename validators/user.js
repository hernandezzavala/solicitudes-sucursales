const {User} = require('../models');

const verifyUser = async (request, response, next) => {
    try {
        const {id} = request.params;
        const user = await User.findById(id);
        if(!user) {
            throw new Error(`El usuario con el ID ${id} no está registrado`);
        }
        if(user.banned) {
            throw new Error(`El usuario con el ID ${id} ha sido suspendido`);
        }
    } catch (error) {
        throw new Error('Ha ocurrido un error en la petición. Inténtalo de nuevo');
    }
    next();
}

const isUserAdmin = async (request, response, next) => {
    try {
        const {id} = request.params;
        const user = await User.findById(id);
        if(!user || !user.isAdmin) {
            throw new Error(`El usuario con el ID ${id} no tiene los permisos necesarios`);
        }
    } catch (error) {
        throw new Error('Ha ocurrido un error en la petición. Inténtalo de nuevo');
    }
    next();
}

module.exports = {
    verifyUser,
    isUserAdmin
}