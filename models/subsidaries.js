const {Schema, model} = require('mongoose');

const subsidiarySchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
        dropDups: true
    },
    manager: {
        type: String,
        /* required: [true, 'El encargado es obligatorio'],
        unique: true,
        dropDups: true */
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

subsidiarySchema.methods.toJSON = function() {
    const {__v, _id, ...subsidiary} = this.toObject();
    subsidiary.uid = subsidiary._id;
    return subsidiary;
}

module.exports = model('Subsidiary', subsidiarySchema);