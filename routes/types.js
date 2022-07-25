const {Router} = require('express');
const {check} = require('express-validator');
const { TypeController } = require('../controllers');
const { validateToken, checkErrors } = require('../middlewares');
const {verifyType} = require('../validators');

const typeRouter = Router();

typeRouter.get('/', [
    validateToken,
    checkErrors
], TypeController.getTypes);

typeRouter.get('/:id', [
    validateToken,
    check('id', 'El ID no es válido').isMongoId(),
    verifyType,
    checkErrors
], TypeController.getType);

typeRouter.post('/', [
    validateToken,
    check('name', 'El nombre es obligatorio'),
    checkErrors
], TypeController.postType);

typeRouter.put('/:id', [
    validateToken,
    check('id', 'El ID no es válido').isMongoId(),
    check('name', 'El nombre es obligatorio'),
    verifyType,
    checkErrors
], TypeController.putType);

typeRouter.delete('/:id', [
    validateToken,
    check('id', 'El ID no es válido').isMongoId(),
    verifyType,
    checkErrors
], TypeController.deleteType);

module.exports = typeRouter;