const {Device} = require('../models');

const getDevice = async (request, response) => {
    try {
        const {id} = request.params;
        const device = await Device.findById(id);
        return response.status(200).json({
            ok: true,
            data: device
        });
    } catch (error) {
        return response.status(400).json({
            ok: false,
            errors: 'Ha ocurrido un error en la petición. Inténtalo nuevamente'
        });
    }
}

const getDevices = async (request, response) => {
    try {
        const devices = await Device.find({deleted: false});
        return response.status(200).json({
            ok: true,
            data: devices
        });
    } catch (error) {
        return response.status(400).json({
            ok: false,
            errors: 'Ha ocurrido un error en la petición. Inténtalo nuevamente'
        });
    }
}

const postDevice = async (request, response) => {
    try {
        const {name} = request.body;
        const created = new Device({name});
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

const putDevice = async (request, response) => {
    try {
        const {id} = request.params;
        const {name} = request.body;
        const updated = Device.findByIdAndUpdate(id, name, {new: true});
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

const deleteDevice = async (request, response) => {
    try {
        const {id} = request.params;
        const deleted = await Device.findByIdAndUpdate(id, {deleted: true});
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

const DeviceController = {
    getDevice,
    getDevices,
    postDevice,
    putDevice,
    deleteDevice
}

module.exports = DeviceController;