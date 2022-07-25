const {mongoose} = require('mongoose');

const databaseConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_KEY);
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

module.exports = {
    databaseConnection
}