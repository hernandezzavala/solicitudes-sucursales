const {Router} = require('express');
const {check} = require('express-validator');
const { UserController } = require('../controllers');
const { validateToken, checkErrors } = require('../middlewares');
const {verifyUser} = require('../validators');

const userRouter = Router();

userRouter.get('/', [
    validateToken,
    checkErrors
], UserController.getUsers);

userRouter.get('/:id', [
    validateToken,
    check('id', 'El ID no es válido').isMongoId(),
    verifyUser,
    checkErrors
], UserController.getUser);

userRouter.post('/', [
    validateToken,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    check('subsidiary', 'La sucursal es obligatoria').not().isEmpty(),
    check('subsidiary', 'El ID no es válido').not().isEmpty(),
    checkErrors
], UserController.postUser);

userRouter.put('/:id', [
    validateToken,
    check('id', 'El ID no es válido').isMongoId(),
    verifyUser,
    checkErrors
], UserController.putUser);

userRouter.put('/ban/:id', [
    validateToken,
    check('id', 'El ID no es válido').isMongoId(),
    verifyUser,
    checkErrors
], UserController.putUser);

userRouter.delete('/:id', [
    validateToken,
    check('id', 'El ID no es válido').isMongoId(),
    verifyUser,
    checkErrors
], UserController.deleteUser);

module.exports = userRouter;