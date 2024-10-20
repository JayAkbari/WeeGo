'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Drivers extends Model {
        static associate(models) {

        }
    }
    Drivers.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        mobile: DataTypes.STRING,
        password: DataTypes.STRING,
        licence_no: DataTypes.STRING,
        aadhar_no: DataTypes.STRING,
        pan_no: DataTypes.STRING,
        dob: DataTypes.DATEONLY,
        licence_validity_upto: DataTypes.DATEONLY,
        address: DataTypes.TEXT('medium'),
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        sequelize,
        modelName: 'Drivers',
        tableName: 'drivers',
        defaultScope: {
            attributes: { exclude: ['password'] }
        },
        scopes: {
            withSensitiveData: {
                attributes: { include: ['password'] }
            }
        }
    });
    return Drivers;
};
