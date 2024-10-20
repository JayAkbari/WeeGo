'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StudentParents extends Model {
        static associate(models) {
            this.belongsTo(models.Parents, { as: 'parents_data', foreignKey: 'parent_id' });
        }
    }
    StudentParents.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        parent_id: DataTypes.UUID,
        student_id: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'StudentParents',
        tableName: 'student_parents',
    });
    return StudentParents;
};
