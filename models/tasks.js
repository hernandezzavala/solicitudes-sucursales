const {Schema, model} = require('mongoose');

const taskSchema = Schema({
    detail: {
        type: String,
        required: [true, 'Se debe especificar el detalle']
    },
    observations: {
        type: String,
        default: 'Sin observaciones'
    },
    finished: {
        type: Boolean,
        default: false
    },
    rejected: {
        type: Boolean,
        required: [true, 'Se debe indicar el estado de la solicitud']
    },
    petitioner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    device: {
        type: Schema.Types.ObjectId,
        ref: 'Device'
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'Type'
    },
    deleted: {
        type: Boolean,
        default: false
    },
    added: {
        type: String,
        required: [true, 'La fecha de creación es obligatoria']
    },
    done: {
        type: String,
        required: [true, 'La fecha de terminación es obligatoria']
    }
});

taskSchema.methods.toJSON = function() {
    const {__v, _id, ...task} = this.toObject();
    task.uid = _id;
    return task;
}

module.exports = model('Task', taskSchema);