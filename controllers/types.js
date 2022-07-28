const {Type} = require('../models');

const getType = async (request, response) => {
    try {
        const {id} = request.params;
        const type = await Type.findById(id);
        return response.status(200).json({
            ok: true,
            data: type
        });
    } catch (error) {
        return response.status(400).json({
            ok: false,
            errors: 'Ha ocurrido un error en la petición. Inténtalo nuevamente'
        });
    }
}

const getTypes = async (request, response) => {
    try {
        const types = await Type.find({deleted: false});
        return response.status(200).json({
            ok: true,
            data: types
        });
    } catch (error) {
        return response.status(400).json({
            ok: false,
            errors: 'Ha ocurrido un error en la petición. Inténtalo nuevamente'
        });
    }
}

const postType = async (request, response) => {
    try {
        const {name} = request.body;
        const created = new Type({name});
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

const putType = async (request, response) => {
    try {
        const {id} = request.params;
        const {name} = request.body;
        const updated = await Type.findByIdAndUpdate(id, {name}, {new: true});
        console.log(updated);
        return response.status(200).json({
            ok: true,
            data: updated
        });
    } catch (error) {
        console.log(error);
        return response.status(400).json({
            ok: false,
            errors: 'Ha ocurrido un error en la petición. Inténtalo nuevamente'
        });
    }
}

const deleteType = async (request, response) => {
    try {
        const {id} = request.params;
        const deleted = await Type.findByIdAndUpdate(id, {deleted: true}, {new: true});
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

const TypeController = {
    getType,
    getTypes,
    postType,
    putType,
    deleteType
}

module.exports = TypeController;