'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Parents extends Model {
        static associate(models) {

        }
    }
    Parents.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        relationship: DataTypes.ENUM('Mother', 'Father'),
        email: DataTypes.STRING,
        mobile: DataTypes.STRING,
        password: DataTypes.STRING,
        img_url: DataTypes.STRING,
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        sequelize,
        modelName: 'Parents',
        tableName: 'parents',
        defaultScope: {
            attributes: { exclude: ['password'] }
        },
        scopes: {
            withSensitiveData: {
                attributes: { include: ['password'] }
            }
        }
    });
    return Parents;
};
