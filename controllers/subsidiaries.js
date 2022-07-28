const {Subsidiary} = require('../models');

const getSubsidiary = async (request, response) => {
    try {
        const {id} = request.params;
        const subsidiary = await Subsidiary.findById(id);
        return response.status(200).json({
            ok: true,
            data: subsidiary
        });
    } catch (error) {
        return response.status(400).json({
            ok: false,
            errors: 'Ha ocurrido un error en la petición. Inténtalo nuevamente'
        });
    }
}

const getSubsidiaries = async (request, response) => {
    try {
        const subsidiarys = await Subsidiary.find({deleted: false});
        return response.status(200).json({
            ok: true,
            data: subsidiarys
        });
    } catch (error) {
        return response.status(400).json({
            ok: false,
            errors: 'Ha ocurrido un error en la petición. Inténtalo nuevamente'
        });
    }
}

const postSubsidiary = async (request, response) => {
    try {
        const {name, manager} = request.body;
        const created = new Subsidiary({name, manager});
        await created.save();
        return response.status(201).json({
            ok: true,
            data: created
        });
    } catch (error) {
        console.log(error);
        return response.status(400).json({
            ok: false,
            errors: 'Ha ocurrido un error en la petición. Inténtalo nuevamente'
        });
    }
}

const putSubsidiary = async (request, response) => {
    try {
        const {id} = request.params;
        const {name, manager} = request.body;
        const updated = await Subsidiary.findByIdAndUpdate(id, manager ? {name, manager} : {name}, {new: true});
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

const deleteSubsidiary = async (request, response) => {
    try {
        const {id} = request.params;
        const deleted = await Subsidiary.findByIdAndUpdate(id, {deleted: true}, {new: true});
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

const SubsidiaryController = {
    getSubsidiary,
    getSubsidiaries,
    postSubsidiary,
    putSubsidiary,
    deleteSubsidiary
}

module.exports = SubsidiaryController;