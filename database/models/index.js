"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config.js")[env];
const db = {};

// Initialize Sequelize instance
const { database, username, password, ...restConfig } = config;
const sequelize = new Sequelize(database, username, password, restConfig);

// Authenticate the connection
sequelize.authenticate()
    .then(() => {
        console.log("Database connected successfully.⚡️");
    })
    .catch((error) => {
        console.error("Unable to connect to the database. ⛓️‍💥 ", error);
    });

// Read through the current directory and import models
fs.readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js" &&
            file.indexOf(".test.js") === -1
        );
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

// Set up associations between models if they exist
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Export the Sequelize instance and models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
