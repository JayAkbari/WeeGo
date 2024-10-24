'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DriverLocations extends Model {
        static associate(models) {

        }
    }
    DriverLocations.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        driver_id: {
            type: DataTypes.UUID,
            unique: true
        },
        coordinates: DataTypes.JSON,
    }, {
        sequelize,
        modelName: 'DriverLocations',
        tableName: 'driver_locations',
    });
    return DriverLocations;
};
