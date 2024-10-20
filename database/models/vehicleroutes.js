'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class VehicleRoutes extends Model {
        static associate(models) {

        }
    }
    VehicleRoutes.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        vehicle_id: DataTypes.UUID,
        route_id: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'VehicleRoutes',
        tableName: 'vehicle_routes',
    });
    return VehicleRoutes;
};
