const {Subsidiary} = require('../models');

const verifySubsidiary = async (request, response, next) => {
    try {
        const {id} = request.params;
        const subsidiary = await Subsidiary.findById(id);
        if(!subsidiary) {
            throw new Error(`La sucursal con el ID ${id} no está registrado`);
        }
    } catch (error) {
        throw new Error('Ha ocurrido un error en la petición. Inténtalo de nuevo');
    }
    next();
}

module.exports = {
    verifySubsidiary
}