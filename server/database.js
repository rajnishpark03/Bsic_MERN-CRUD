const mongoose = require('mongoose');

const databaseConnection = () => {
    mongoose.connect("mongodb://localhost:27017/bookstore")
        .then(() => {
            console.log("Database connected successfully");
        })
        .catch((error) => {
            console.log("Database connection failed", error);
        });

}


module.exports = databaseConnection;