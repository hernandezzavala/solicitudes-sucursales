const {Router} = require('express');
const { check } = require('express-validator');
const { AuthController } = require('../controllers');
const {checkErrors, validateToken} = require('../middlewares')

const authRouter = Router();

authRouter.post('/login', [
    check('name').not().isEmpty(),
    check('password').not().isEmpty(),
    checkErrors
], AuthController.login);

authRouter.get('/renew', [
    validateToken,
    checkErrors
], AuthController.renew);

module.exports = authRouter;