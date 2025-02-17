const mongoose = require('mongoose');
const serverConfig = require('./serverConfig');
const InternalServerError = require('../utils/internalServerError');


async function connectDB(){
    try {
        await mongoose.connect(serverConfig.DB_URL);
        console.log("Connected to MongoDb successfully");
        // console.log(serverConfig.DB_URl)
    } catch (error) {
        console.log("Unable to connect to Mongo DB");
        console.log(error.message);
        // throw new InternalServerError();
    }
}


module.exports = connectDB;

