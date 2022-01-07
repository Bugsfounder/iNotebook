const database = require('mongoose');
const databaseURI = 'mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

const connectToMongo = () => {
    database.connect(databaseURI, () => {
        console.log("Connected to database Successfully");
    });
};

module.exports = connectToMongo;