'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Vehicles extends Model {
        static associate(models) {

        }
    }
    Vehicles.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        description: DataTypes.TEXT('medium'),
        registration_no: DataTypes.STRING,
        type_id: DataTypes.UUID,
        seating_capacity: DataTypes.INTEGER,
        default_route_id: DataTypes.UUID,
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        sequelize,
        modelName: 'Vehicles',
        tableName: 'vehicles',
    });
    return Vehicles;
};
