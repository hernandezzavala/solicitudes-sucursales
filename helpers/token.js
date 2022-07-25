const jwt = require('jsonwebtoken');
const { User } = require('../models');

const generateToken = (uid) => {
    return new Promise((resolve, reject) => {
        jwt.sign({uid}, process.env.SECRET, {expiresIn: '4h'}, (error, token) => {
            if(error) reject('No se pudo generar un token de acceso');
            if(!error) resolve(token);
        });
    });
}

const validateToken = (token) => {
    if(!token || !token.length <= 10) return null;
    const {id} = jwt.verify(token, process.env.SECRET);
    const user = User.findById(id);
    if(user) {
        if(!user.banned || !user.deleted) return user;
        return null;
    }
}

module.exports = {
    generateToken,
    validateToken
}