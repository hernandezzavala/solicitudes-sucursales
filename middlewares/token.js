const TokenValidators = require('../validators/token');

const validateToken = async (request, response, next) => {
    const token = request.header('app-token');

    if(!token) {
        return response.status(401).json({
            ok: false,
            errors: 'No hay ningún token en la petición'
        });
    }

    const result = TokenValidators.validateToken(token);

    if(!result) {
        return response.status(401).json({
            ok: false,
            errors: 'Hubo un error en la autenticación. Inténtalo nuevamente'
        });
    }

    request.user = result;
    next();
}

module.exports = {
    validateToken
}