'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class RouteStops extends Model {
        static associate(models) {
            this.belongsTo(models.Routes, { foreignKey: 'route_id' });
        }
    }
    RouteStops.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        route_id: DataTypes.UUID,
        custom_id: DataTypes.STRING,
        name: DataTypes.STRING,
        coordinates: DataTypes.JSON,
        travel_time: DataTypes.TIME,
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        sequelize,
        modelName: 'RouteStops',
        tableName: 'route_stops',
    });
    return RouteStops;
};
