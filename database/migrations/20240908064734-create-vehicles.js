'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('vehicles', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            description: {
                type: Sequelize.TEXT('medium'),
                allowNull: false,
            },
            registration_no: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            type_id: {
                type: Sequelize.UUID,
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
                references: {
                    model: "vehicle_types",
                    key: "id",
                },
            },
            seating_capacity: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            default_route_id: {
                type: Sequelize.UUID,
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
                references: {
                    model: "routes",
                    key: "id",
                },
            },
            is_active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
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
        await queryInterface.dropTable('vehicles');
    }
};
