const {Schema, model} =  require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
        dropDups: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    banned: {
        type: Boolean,
        default: false
    },
    subsidiary: {
        type: Schema.Types.ObjectId,
        ref: 'Subsidiary'
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.toJSON = function() {
    const {__v, _id, password, ...user} = this.toObject();
    user.uid =  _id;
    return user;
}

module.exports = model('User', userSchema);