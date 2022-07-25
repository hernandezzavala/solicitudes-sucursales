const {Schema, model} = require('mongoose');

const typeSchema = Schema({
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

typeSchema.methods.toJSON = function() {
    const {__v, _id, ...type} = this.toObject();
    type.uid = _id;
    return type;
}

module.exports = model('Type', typeSchema);