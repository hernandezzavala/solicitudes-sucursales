const {verifyDevice} = require('./device');
const {verifySubsidiary} = require('./subsidiary');
const {verifyTask} = require('./task');
const {validateToken} = require('./token');
const {verifyType} = require('./type');
const {verifyUser, isUserAdmin} = require('./user');

module.exports = {
    verifyDevice,
    verifySubsidiary,
    verifyTask,
    validateToken,
    verifyType,
    verifyUser,
    isUserAdmin
}