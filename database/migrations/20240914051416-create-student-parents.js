'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('student_parents', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            parent_id: {
                type: Sequelize.UUID,
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
                references: {
                    model: "parents",
                    key: "id",
                },
            },
            student_id: {
                type: Sequelize.UUID,
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
                references: {
                    model: "students",
                    key: "id",
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('student_parents');
    }
};
