'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Students extends Model {
        static associate(models) {
            this.hasMany(models.StudentParents, { as: 'parents', foreignKey: 'student_id' });
            this.belongsTo(models.Schools, { as: 'school_data', foreignKey: 'school_id' });
            this.belongsTo(models.Routes, { as: 'route_data', foreignKey: 'assigned_route_id' });
            this.belongsTo(models.RouteStops, { as: 'route_stop_data', foreignKey: 'assigned_route_stop_id' });
        }
    }
    Students.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        custom_id: DataTypes.STRING,
        name: DataTypes.STRING,
        dob: DataTypes.DATEONLY,
        gender: DataTypes.ENUM('Male', 'Female', 'Other'),
        address: DataTypes.TEXT('medium'),
        area: DataTypes.TEXT('medium'),
        class: DataTypes.STRING,
        img_url: DataTypes.STRING,
        school_id: DataTypes.UUID,
        assigned_route_id: DataTypes.UUID,
        assigned_route_stop_id: DataTypes.UUID,
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        sequelize,
        modelName: 'Students',
        tableName: 'students',
    });
    return Students;
};
