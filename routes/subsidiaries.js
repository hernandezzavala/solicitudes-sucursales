const {Router} = require('express');
const {check} = require('express-validator');
const { SubsidiaryController } = require('../controllers');
const { validateToken, checkErrors } = require('../middlewares');
const {verifySubsidiary} = require('../validators');

const subsidiaryRouter = Router();

subsidiaryRouter.get('/', [
    validateToken,
    checkErrors
], SubsidiaryController.getSubsidiaries);

subsidiaryRouter.get('/:id', [
    validateToken,
    check('id', 'El ID no es válido').isMongoId(),
    verifySubsidiary,
    checkErrors
], SubsidiaryController.getSubsidiary);


subsidiaryRouter.post('/', [
    validateToken,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    // check('manager', 'El encargado es obligatorio').not().isEmpty(),
    checkErrors
], SubsidiaryController.postSubsidiary);

subsidiaryRouter.put('/:id', [
    validateToken,
    check('id', 'El ID no es válido').isMongoId(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    verifySubsidiary,
    checkErrors
], SubsidiaryController.putSubsidiary);

subsidiaryRouter.delete('/:id', [
    validateToken,
    check('id', 'El ID no es válido').isMongoId(),
    verifySubsidiary,
    checkErrors
], SubsidiaryController.deleteSubsidiary);

module.exports = subsidiaryRouter;