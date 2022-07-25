const {Schema, model} = require('mongoose');

const deviceSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
        dropDups: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

deviceSchema.methods.toJSON = function() {
    const {__v, _id, ...device} = this.toObject();
    device.uid = _id;
    return device;
}

module.exports = model('Device', deviceSchema);