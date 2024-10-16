'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Routes extends Model {
        static associate(models) {
            this.hasMany(models.RouteStops, { as: 'stops', foreignKey: 'route_id' });
        }
    }
    Routes.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        custom_id: DataTypes.STRING,
        name: DataTypes.STRING,
        from_stop: DataTypes.STRING,
        driver_id: DataTypes.UUID,
        vehicle_id: DataTypes.UUID,
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    }, {
        sequelize,
        modelName: 'Routes',
        tableName: 'routes',
    });
    return Routes;
};
