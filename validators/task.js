const {Task} = require('../models');

const verifyTask = async (request, response, next) => {
    try {
        const {id} = request.params;
        const task = await Task.findById(id);
        if(!task) {
            throw new Error(`La tarea con el ID ${id} no está registrado`);
        }
    } catch (error) {
        throw new Error('Ha ocurrido un error en la petición. Inténtalo de nuevo');
    }
    next();
}

module.exports = {
    verifyTask
}