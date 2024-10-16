'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class VehicleTypes extends Model {
        static associate(models) {

        }
    }
    VehicleTypes.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        sequelize,
        modelName: 'VehicleTypes',
        tableName: 'vehicle_types',
    });
    return VehicleTypes;
};
