const { Router } = require("express");
const {check} = require('express-validator');
const { DeviceController } = require("../controllers");
const { validateToken, checkErrors } = require("../middlewares");
const { verifyDevice } = require("../validators");

const deviceRouter = Router();

deviceRouter.get('/', [
    validateToken,
    checkErrors
], DeviceController.getDevices);

deviceRouter.get('/:id', [
    validateToken,
    check('id', 'El ID no es válido').isMongoId(),
    verifyDevice,
    checkErrors
], DeviceController.getDevice);


deviceRouter.post('/', [
    validateToken,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    checkErrors
], DeviceController.postDevice);

deviceRouter.put('/:id', [
    validateToken,
    check('id', 'El ID no es válido').isMongoId(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    verifyDevice,
    checkErrors
], DeviceController.putDevice);

deviceRouter.delete('/:id', [
    validateToken,
    check('id', 'El ID no es válido').isMongoId(),
    verifyDevice,
    checkErrors
], DeviceController.deleteDevice);

module.exports = deviceRouter;