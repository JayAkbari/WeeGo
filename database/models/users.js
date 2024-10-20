'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate(models) {

        }
    }
    Users.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        mobile: DataTypes.STRING,
        password: DataTypes.STRING,
        img_url: DataTypes.STRING,
        role_id: DataTypes.UUID,
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    }, {
        sequelize,
        modelName: 'Users',
        tableName: 'users',
        defaultScope: {
            attributes: { exclude: ['password'] }
        },
        scopes: {
            withSensitiveData: {
                attributes: { include: ['password'] }
            }
        },
    });
    return Users;
};
