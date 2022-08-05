const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

const {databaseConnection} = require('../database/connection');

const initServer = () => {
    connectToDatabase();
    setMiddlewares();
    setRoutes();
    setListener();
}

const connectToDatabase = async () => {
    await databaseConnection();
}

const setMiddlewares = () => {
    app.use(cors());
    app.use(express.json());
}

const setRoutes = () => {
    app.use('/auth', require('../routes/auth'));
    app.use('/devices', require('../routes/devices'));
    app.use('/subsidiaries', require('../routes/subsidiaries'));
    app.use('/tasks', require('../routes/tasks'));
    app.use('/types', require('../routes/types'));
    app.use('/users', require('../routes/users'));
}

const setListener = () => {
    app.listen(port, () => {
        console.log(`Servidor corriendo en el puerto ${port}`);
    });
}

module.exports = {
    initServer
}