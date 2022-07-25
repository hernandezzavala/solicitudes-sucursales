const {Device} = require('../models');

const verifyDevice = async (request, response, next) => {
    try {
        const {id} = request.params;
        const device = await Device.findById(id);
        if(!device) {
            throw new Error(`El dispositivo con el ID ${id} no está registrado`);
        }
    } catch (error) {
        throw new Error('Ha ocurrido un error en la petición. Inténtalo de nuevo');
    }
    next();
}

module.exports = {
    verifyDevice
}