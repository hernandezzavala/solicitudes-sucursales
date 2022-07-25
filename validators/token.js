const jwt = require('jsonwebtoken');
const {User} = require('../models');

const validateToken = async (token) => {
    if(!token) return null;
    try {
        const {uid} = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(uid);
        if(!user || user.deleted || user.banned)  return null;
        if(user) return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {validateToken}