const {Router} = require('express');
const {check} = require('express-validator');
const { TaskController } = require('../controllers');
const { validateToken, checkErrors } = require('../middlewares');
const {verifyTask} = require('../validators');

const taskRouter = Router();

taskRouter.get('/', [
    validateToken,
    checkErrors
], TaskController.getTasks);

taskRouter.get('/:id', [
    validateToken,
    check('id', 'El ID no es válido').isMongoId(),
    verifyTask,
    checkErrors
], TaskController.getTask);

taskRouter.post('/', [
    validateToken,
    check('detail', 'El detalle es obligatorio').not().isEmpty(),
    check('wasRejected', 'El estado es obligatorio').not().isEmpty(),
    check('petitioner', 'El solicitante es obligatorio').not().isEmpty(),
    check('device', 'El dispositivo es obligatorio').not().isEmpty(),
    check('type', 'El tipo de tarea es obligatorio').not().isEmpty(),
    checkErrors
], TaskController.postTask);

taskRouter.put('/:id', [
    validateToken,
    check('id', 'El ID no es válido').isMongoId(),
    check('detail', 'El detalle es obligatorio').not().isEmpty(),
    check('rejected', 'El estado es obligatorio').not().isEmpty(),
    verifyTask,
    checkErrors
], TaskController.putTask);

taskRouter.delete('/:id', [
    validateToken,
    check('id', 'El ID no es válido').isMongoId(),
    verifyTask,
    checkErrors
], TaskController.deleteTask);

module.exports = taskRouter;