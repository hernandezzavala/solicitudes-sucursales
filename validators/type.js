const {Type} = require('../models');

const verifyType = async (request, response, next) => {
    try {
        const {id} = request.params;
        const type = await Type.findById(id);
        if(!type) {
            throw new Error(`La tarea con el ID ${id} no está registrado`);
        }
    } catch (error) {
        throw new Error('Ha ocurrido un error en la petición. Inténtalo de nuevo');
    }
    next();
}

module.exports = {
    verifyType
}