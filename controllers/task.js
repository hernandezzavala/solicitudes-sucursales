const {Task} = require('../models');

const getTask = async (request, response) => {
    try {
        const {id} = request.params;
        const task = await Task.findById(id);
        return response.status(200).json({
            ok: true,
            data: task
        });
    } catch (error) {
        return response.status(400).json({
            ok: false,
            errors: 'Ha ocurrido un error en la petición. Inténtalo nuevamente'
        });
    }
}

const getTasks = async (request, response) => {
    try {
        let {state, cancel, subsidiary} = request.query;
        state === 'true' ? true : false;
        cancel === 'true' ? true : false;
        let tasks;
        subsidiary
        ? tasks = await Task.find({deleted: false, rejected: cancel, finished: state, petitioner: subsidiary})
        : tasks = await Task.find({deleted: false, rejected: cancel, finished: state});
        return response.status(200).json({
            ok: true,
            data: tasks
        });
    } catch (error) {
        return response.status(400).json({
            ok: false,
            errors: 'Ha ocurrido un error en la petición. Inténtalo nuevamente'
        });
    }
}

const postTask = async (request, response) => {
    try {
        const {rejected, deleted, ...task} = request.body;
        task.rejected = false;
        const created = new Task(task);
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

const putTask = async (request, response) => {
    try {
        const {id} = request.params;
        const task = request.body;
        const updated = await Task.findByIdAndUpdate(id, task, {new: true});
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

const deleteTask = async (request, response) => {
    try {
        const {id} = request.params;
        const deleted = await Task.findByIdAndUpdate(id, {deleted: true}, {new: true});
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

const TaskController = {
    getTask,
    getTasks,
    postTask,
    putTask,
    deleteTask
}

module.exports = TaskController;