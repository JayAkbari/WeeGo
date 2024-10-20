'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schools extends Model {
        static associate(models) {

        }
    }
    Schools.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        mobile: DataTypes.STRING,
        password: DataTypes.STRING,
        address: DataTypes.TEXT('medium'),
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        sequelize,
        modelName: 'Schools',
        tableName: 'schools',
        defaultScope: {
            attributes: { exclude: ['password'] }
        },
        scopes: {
            withSensitiveData: {
                attributes: { include: ['password'] }
            }
        },
    });
    return Schools;
};
